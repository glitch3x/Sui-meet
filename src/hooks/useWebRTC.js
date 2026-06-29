import { useState, useEffect, useRef } from 'react';
import { PACKAGE_ID } from '../context/SuiContext';
import { Transaction } from '@mysten/sui/transactions';

export const useWebRTC = (suiClient, keypair, roomId, isHost, onChatMessage) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnection = useRef(null);
  const dataChannelRef = useRef(null);
  const unsubscribeRef = useRef(null);
  const userAddress = keypair ? keypair.getPublicKey().toSuiAddress() : null;

  const servers = {
    iceServers: [
      { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
    ],
    iceCandidatePoolSize: 10,
  };

  const sendSignal = async (signalType, payloadObj) => {
    if (!keypair || !roomId) return;
    
    // signalType: 0=Offer, 1=Answer, 2=ICE
    const payloadStr = JSON.stringify({ ...payloadObj, isHost });
    const payloadBytes = Array.from(new TextEncoder().encode(payloadStr));

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::room::send_signal`,
      arguments: [
        tx.object(roomId),
        tx.pure.address('0x0000000000000000000000000000000000000000000000000000000000000000'), // 0x0 equivalent in Sui
        tx.pure.u8(signalType),
        tx.pure.vector('u8', payloadBytes)
      ],
    });

    try {
      await suiClient.signAndExecuteTransaction({
        transaction: tx,
        signer: keypair,
      });
      console.log(`Sent signal ${signalType} to chain`);
    } catch (e) {
      console.error("Failed to send signal to chain:", e);
    }
  };

  const setupDataChannel = (channel) => {
    channel.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (onChatMessage) onChatMessage(msg);
    };
    channel.onopen = () => console.log("Data channel open");
    channel.onclose = () => console.log("Data channel closed");
  };

  const sendChatMessage = (msgObj) => {
    if (dataChannelRef.current && dataChannelRef.current.readyState === 'open') {
      dataChannelRef.current.send(JSON.stringify(msgObj));
    } else {
      console.warn("Data channel not open");
    }
  };

  useEffect(() => {
    if (!roomId || !keypair) return;

    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);

        peerConnection.current = new RTCPeerConnection(servers);
        
        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });

        peerConnection.current.ontrack = (event) => {
          setRemoteStream(event.streams[0]);
        };

        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            sendSignal(2, event.candidate);
          }
        };

        peerConnection.current.onconnectionstatechange = () => {
          const state = peerConnection.current.connectionState;
          if (state === 'disconnected' || state === 'failed' || state === 'closed') {
            setRemoteStream(null);
          }
        };

        if (isHost) {
          dataChannelRef.current = peerConnection.current.createDataChannel('chat');
          setupDataChannel(dataChannelRef.current);
        } else {
          peerConnection.current.ondatachannel = (event) => {
            dataChannelRef.current = event.channel;
            setupDataChannel(dataChannelRef.current);
          };
        }

        // Subscribe to Sui events for signaling
        const unsubscribe = await suiClient.subscribeEvent({
          filter: { MoveEventType: `${PACKAGE_ID}::room::SignalEvent` },
          onMessage: async (event) => {
            const { room_id, sender, signal_type, payload } = event.parsedJson;
            if (room_id !== roomId) return;
            if (sender === userAddress) return; // ignore our own signals

            const payloadStr = new TextDecoder().decode(new Uint8Array(payload));
            const parsedPayload = JSON.parse(payloadStr);
            
            // Ignore messages from same role
            if (parsedPayload.isHost === isHost) return;

            if (signal_type === 0 && !isHost) { // Offer
              await peerConnection.current.setRemoteDescription(new RTCSessionDescription(parsedPayload));
              const answer = await peerConnection.current.createAnswer();
              await peerConnection.current.setLocalDescription(answer);
              sendSignal(1, answer);
            } else if (signal_type === 1 && isHost) { // Answer
              await peerConnection.current.setRemoteDescription(new RTCSessionDescription(parsedPayload));
            } else if (signal_type === 2) { // ICE
              try {
                await peerConnection.current.addIceCandidate(new RTCIceCandidate(parsedPayload));
              } catch (e) {
                console.error('Error adding ICE', e);
              }
            }
          }
        });
        
        unsubscribeRef.current = unsubscribe;

        if (isHost) {
          setTimeout(async () => {
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);
            sendSignal(0, offer);
          }, 4000); // Wait for subscription to propagate
        }
      } catch (err) {
        console.error('Failed to init WebRTC:', err);
      }
    };

    init();

    return () => {
      localStream?.getTracks().forEach(track => track.stop());
      peerConnection.current?.close();
      if (unsubscribeRef.current) {
        unsubscribeRef.current().catch(console.error);
      }
    };
  }, [roomId, keypair]); // Note: suiClient and isHost usually static, omitted from deps

  return { localStream, remoteStream, peerConnectionRef: peerConnection, sendChatMessage };
};
