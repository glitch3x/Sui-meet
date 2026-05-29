import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  VideoOff, 
  Monitor, 
  PhoneOff, 
  MessageSquare, 
  Users, 
  Settings, 
  MoreVertical,
  Shield,
  Smile,
  Send,
  X,
  Database,
  Zap,
  Lock,
  ChevronRight,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSui } from '../context/SuiContext';

import { useWebRTC } from '../hooks/useWebRTC';

const VideoParticipant = ({ name, stream, isSelf = false, isVideoEnabled = true }) => {
  const videoRef = React.useRef();

  React.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative group glass-card rounded-3xl overflow-hidden aspect-video flex items-center justify-center border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 bg-slate-900">
      {stream && isVideoEnabled ? (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted={isSelf} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
           <Users className="w-10 h-10 text-slate-500" />
        </div>
      )}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-200 shadow-sm">
        <p className="text-slate-900 text-[10px] font-bold uppercase">{name} {isSelf && '(You)'}</p>
        {isSelf && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
      </div>
    </div>
  );
};

const ChatMessage = ({ sender, text, time, isSelf = false }) => (
  <div className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'} mb-6 group`}>
    <div className="flex items-center gap-2 mb-1 px-1">
      <p className={`text-[10px] font-bold uppercase ${isSelf ? 'text-primary' : 'text-slate-500'}`}>{sender}</p>
      <p className="text-[8px] text-slate-300 font-bold uppercase">{time}</p>
    </div>
    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed transition-all ${isSelf ? 'bg-primary text-white rounded-tr-none' : 'bg-slate-50 border border-slate-100 text-slate-600 rounded-tl-none'}`}>
      {text}
    </div>
  </div>
);

const MeetingRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const roomId = query.get('id');
  const isHost = query.get('host') === 'true';
  const pwd = query.get('pwd');

  const { suiClient, keypair, userAddress } = useSui();

  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  const [messages, setMessages] = useState([
    { sender: "System", text: "Connection established. P2P stream is active.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isSelf: false }
  ]);
  const [chatInput, setChatInput] = useState('');
  
  const chatChannelRef = useRef(null);
  const originalVideoTrackRef = useRef(null);
  
  const { localStream, remoteStream, peerConnectionRef } = useWebRTC(suiClient, keypair, roomId, isHost);

  // Mute/Unmute microphone
  useEffect(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = micOn;
      });
    }
  }, [micOn, localStream]);

  // Turn Camera On/Off
  useEffect(() => {
    if (localStream && !isScreenSharing) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = videoOn;
      });
    }
  }, [videoOn, localStream, isScreenSharing]);

  // Live Chat Logic
  useEffect(() => {
    if (!roomId) return;
    chatChannelRef.current = new BroadcastChannel(`chat_room_${roomId}`);
    
    chatChannelRef.current.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };
    
    return () => {
      if (chatChannelRef.current) chatChannelRef.current.close();
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMsg = {
      sender: userAddress ? `${userAddress.slice(0,6)}...${userAddress.slice(-4)}` : "Local Node",
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: false
    };
    
    if (chatChannelRef.current) {
      chatChannelRef.current.postMessage(newMsg);
    }
    
    setMessages(prev => [...prev, { ...newMsg, isSelf: true }]);
    setChatInput('');
  };

  const revertToCamera = () => {
    const origTrack = originalVideoTrackRef.current;
    if (origTrack) {
      const sender = peerConnectionRef.current?.getSenders().find(s => s.track?.kind === 'video');
      if (sender) sender.replaceTrack(origTrack);
      
      if (localStream) {
        const currentTrack = localStream.getVideoTracks()[0];
        if (currentTrack && currentTrack !== origTrack) {
            currentTrack.stop();
            localStream.removeTrack(currentTrack);
        }
        localStream.addTrack(origTrack);
      }
    }
    setIsScreenSharing(false);
  };

  const handleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        
        if (!originalVideoTrackRef.current && localStream) {
          originalVideoTrackRef.current = localStream.getVideoTracks()[0];
        }

        const sender = peerConnectionRef.current?.getSenders().find(s => s.track?.kind === 'video');
        if (sender) sender.replaceTrack(screenTrack);
        
        if (localStream) {
          localStream.removeTrack(localStream.getVideoTracks()[0]);
          localStream.addTrack(screenTrack);
        }
        
        screenTrack.onended = () => {
          revertToCamera();
        };
        
        setIsScreenSharing(true);
      } catch (err) {
        console.error("Failed to share screen", err);
      }
    } else {
      revertToCamera();
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col font-sans overflow-hidden relative">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-20" />
      
      {/* Top Header */}
      <header className="px-8 py-6 flex items-center justify-between z-10 glass-nav border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-xl border border-primary/20">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-slate-900 text-lg font-bold tracking-tight">Technical Design Review</h2>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                 <p className="text-red-500 text-[9px] font-bold uppercase">Live Session</p>
              </div>
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                ID: <span className="text-slate-700">{roomId}</span> • PWD: <span className="text-slate-700">{pwd || 'N/A'}</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-2 group transition-all">
            <Database className="w-4 h-4 text-primary" />
            <p className="text-slate-500 text-[10px] font-bold uppercase">Archiving to Walrus</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-red-50 text-red-600 border border-red-100 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all flex items-center gap-2 uppercase tracking-wider shadow-sm"
          >
            <PhoneOff className="w-4 h-4" />
            End
          </button>
        </div>
      </header>
      
      {/* Main Grid Area */}
      <main className="flex-1 flex px-8 pb-32 gap-8 min-h-0 pt-8">
        <div className="flex-1 transition-all duration-500 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <VideoParticipant 
            name={userAddress ? `${userAddress.slice(0,6)}...${userAddress.slice(-4)}` : "Local Node"} 
            stream={localStream} 
            isSelf 
            isVideoEnabled={videoOn} 
          />
          <VideoParticipant 
            name="Remote Peer" 
            stream={remoteStream} 
            isVideoEnabled={true} 
          />
        </div>
        
        {/* Chat Panel */}
        <AnimatePresence>
          {chatOpen && (
            <motion.aside 
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-96 glass-card flex flex-col shadow-xl border-l border-slate-100 overflow-hidden relative z-10"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">Session Chat</h3>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-slate-600 transition-all p-2 hover:bg-slate-50 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-2">
                {messages.map((msg, idx) => (
                  <ChatMessage key={idx} sender={msg.sender} text={msg.text} time={msg.time} isSelf={msg.isSelf} />
                ))}
              </div>
              
              <div className="p-6 border-t border-slate-100">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2 flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Send a message..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm font-semibold text-slate-900 px-3"
                  />
                  <button onClick={handleSendMessage} className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary-light transition-all shadow-sm">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </main>
      
      {/* Control Bar Overlay */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          className="bg-white border border-slate-100 p-4 rounded-3xl flex items-center gap-8 shadow-2xl shadow-slate-200"
        >
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMicOn(!micOn)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${micOn ? 'bg-slate-50 text-slate-600 hover:bg-slate-100' : 'bg-red-500 text-white'}`}
            >
              {micOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => setVideoOn(!videoOn)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${videoOn ? 'bg-slate-50 text-slate-600 hover:bg-slate-100' : 'bg-red-500 text-white'}`}
            >
              {videoOn ? <VideoIcon className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>
          </div>
          
          <div className="w-px h-10 bg-slate-100" />
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleScreenShare}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isScreenSharing ? 'bg-primary text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <Monitor className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setChatOpen(!chatOpen)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${chatOpen ? 'bg-primary text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <MessageSquare className="w-6 h-6" />
            </button>
            <button className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-all relative group">
              <Users className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">2</div>
            </button>
          </div>
          
          <div className="w-px h-10 bg-slate-100" />
          
          <button className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-all">
            <Settings className="w-6 h-6" />
          </button>
        </motion.div>
      </footer>
    </div>
  );
};

export default MeetingRoom;


