import { useState, useEffect, useRef } from 'react';

export const useWebRTC = (suiClient, keypair, roomId, isHost) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnection = useRef(null);
  const channelRef = useRef(null);

  const servers = {
    iceServers: [
      { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
    ],
    iceCandidatePoolSize: 10,
  };

  const sendSignal = (signalType, payloadObj) => {
    if (!channelRef.current) return;
    
    channelRef.current.postMessage({
      signal_type: signalType,
      payload: payloadObj,
      isHost: isHost
    });
  };

  useEffect(() => {
    if (!roomId) return;

    // Create a BroadcastChannel specific to this roomId
    channelRef.current = new BroadcastChannel(`webrtc_room_${roomId}`);

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

        // Listen for messages from the other peer
        channelRef.current.onmessage = async (event) => {
          const { signal_type, payload, isHost: senderIsHost } = event.data;
          
          // Ignore messages from same role
          if (senderIsHost === isHost) return;

          if (signal_type === 0 && !isHost) { // Offer
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(payload));
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);
            sendSignal(1, answer);
          } else if (signal_type === 1 && isHost) { // Answer
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(payload));
          } else if (signal_type === 2) { // ICE
            try {
              await peerConnection.current.addIceCandidate(new RTCIceCandidate(payload));
            } catch (e) {
              console.error('Error adding ICE', e);
            }
          } else if (signal_type === 3) { // Leave
            setRemoteStream(null);
          }
        };

        if (isHost) {
          setTimeout(async () => {
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);
            sendSignal(0, offer);
          }, 2000); // Give peer time to join
        }
      } catch (err) {
        console.error('Failed to init WebRTC:', err);
      }
    };

    init();

    return () => {
      sendSignal(3, { message: 'leave' });
      localStream?.getTracks().forEach(track => track.stop());
      peerConnection.current?.close();
      if (channelRef.current) {
        setTimeout(() => channelRef.current.close(), 100);
      }
    };
  }, [roomId, isHost]);

  return { localStream, remoteStream, peerConnectionRef: peerConnection };
};
