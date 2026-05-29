import React from 'react';
import { 
  Search, 
  Edit3, 
  MoreVertical, 
  Video, 
  Phone, 
  Plus, 
  Smile, 
  Send, 
  Lock, 
  CheckCircle, 
  Shield, 
  FileText, 
  Download, 
  Link as LinkIcon, 
  Key,
  Bell,
  User,
  Zap,
  Activity,
  ChevronRight
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import PageTransition from '../components/PageTransition';

const ConversationItem = ({ name, message, time, active, online, avatar }) => (
  <div className={`flex items-center gap-4 px-8 py-5 cursor-pointer transition-all border-l-4 relative group ${active ? 'bg-primary/5 border-primary' : 'hover:bg-slate-50 border-transparent'}`}>
    <div className="relative">
      <div className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${active ? 'border-primary/20 shadow-sm' : 'border-slate-100'}`}>
        <img src={avatar} className="w-full h-full object-cover" alt={name} />
      </div>
      {online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm" />}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center mb-1">
        <h3 className={`text-sm font-bold truncate transition-colors ${active ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{name}</h3>
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{time}</span>
      </div>
      <div className="flex items-center gap-2">
        <p className={`text-xs truncate font-medium ${active ? 'text-slate-500' : 'text-slate-400'}`}>{message}</p>
      </div>
    </div>
  </div>
);

const Chat = () => {
  return (
    <div className="flex h-screen bg-white font-sans text-slate-900 overflow-hidden relative">
      <Sidebar />
      
      <PageTransition className="flex-1 flex overflow-hidden relative z-10">
        {/* Messages List Column */}
        <div className="w-96 border-r border-slate-100 flex flex-col glass-card z-20">
          <div className="p-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Messages</h2>
            <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 transition-all shadow-sm">
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
          
          <div className="px-8 mb-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search chats..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <ConversationItem 
              name="Alex Rivera" 
              message="The recording is ready on Walrus..." 
              time="12:45 PM" 
              active={true} 
              online={true} 
              avatar="/avatar.png"
            />
            <ConversationItem 
              name="Design Team" 
              message="Shared a protocol specification link" 
              time="Yesterday" 
              avatar="/avatar.png"
            />
            <ConversationItem 
              name="Marcus Vault" 
              message="Decentralized signaling established." 
              time="Tue" 
              avatar="/avatar.png"
            />
          </div>
        </div>
        
        {/* Chat Window Column */}
        <div className="flex-1 flex flex-col bg-white relative">
          {/* Chat Header */}
          <header className="px-10 py-6 border-b border-slate-100 bg-white flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-slate-50 shadow-sm transition-all group-hover:border-primary/20">
                 <img src="/avatar.png" className="w-full h-full object-cover" alt="Alex" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-1">Alex Rivera</h2>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Active Channel</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 transition-all shadow-sm flex items-center justify-center">
                <Video className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 transition-all shadow-sm flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 transition-all shadow-sm flex items-center justify-center">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </header>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
                 <Activity className="w-3 h-3 text-slate-400" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Encrypted Session: Active Node</span>
              </div>
            </div>
            
            {/* Incoming Message */}
            <div className="flex flex-col gap-2 max-w-[70%]">
              <div className="flex items-center gap-3 mb-1 px-1">
                <span className="text-[11px] font-bold text-slate-900">Alex Rivera</span>
                <span className="text-[9px] text-slate-300 font-bold">12:40 PM</span>
              </div>
              <div className="bg-white border border-slate-100 p-6 rounded-2xl rounded-tl-none shadow-sm transition-all hover:shadow-md">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Hey, I've just uploaded the encrypted recording from our session to the Walrus network. Let me know if you can access the shards via your signature.
                </p>
              </div>
            </div>
            
            {/* Outgoing Message */}
            <div className="flex flex-col items-end gap-2 ml-auto max-w-[70%]">
              <div className="flex items-center gap-3 mb-1 px-1 text-right">
                <span className="text-[9px] text-slate-300 font-bold">12:42 PM</span>
                <span className="text-[11px] font-bold text-primary">You</span>
              </div>
              <div className="bg-primary text-white p-8 rounded-[32px] rounded-tr-none shadow-lg shadow-primary/10">
                <p className="text-sm font-medium leading-relaxed mb-6">
                  Got it. Checking the shard availability across nodes now. The decentralized signaling sync looks perfect on my protocol end.
                </p>
                <div className="pt-6 border-t border-white/20 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Shield className="w-4.5 h-4.5 text-white" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Verified Identity</span>
                   </div>
                   <Zap className="w-3.5 h-3.5 text-white/60 fill-white/20 animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Incoming Message with Attachment */}
            <div className="flex flex-col gap-2 max-w-[70%]">
              <div className="flex items-center gap-3 mb-1 px-1">
                <span className="text-[11px] font-bold text-slate-900">Alex Rivera</span>
                <span className="text-[9px] text-slate-300 font-bold">12:45 PM</span>
              </div>
              <div className="bg-white border border-slate-100 p-2 rounded-3xl shadow-sm transition-all hover:shadow-md">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex items-center justify-between gap-6 transition-all hover:bg-slate-100/50">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">Session_Protocol.mp4</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">14.2 MB</span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Walrus Sync</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 transition-all shadow-sm flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-500 leading-relaxed">
                    The protocol recording is ready on Walrus. It's cryptographically sharded across 200 distributed nodes for absolute redundancy.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat Input Area */}
          <div className="px-10 pb-10 bg-transparent relative z-20">
            <div className="bg-white border border-slate-100 rounded-[32px] p-2 shadow-xl shadow-slate-200 focus-within:border-primary/30 transition-all">
              <div className="flex items-center gap-4 px-2 py-1">
                <button className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 transition-all shadow-sm">
                  <Plus className="w-6 h-6" />
                </button>
                <input 
                  type="text" 
                  placeholder="Send a message..." 
                  className="flex-1 bg-transparent text-sm font-semibold py-4 px-2 focus:outline-none placeholder:text-slate-300 text-slate-900"
                />
                <button className="text-slate-300 hover:text-primary px-2 transition-colors">
                  <Smile className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-md hover:bg-primary-light transition-all">
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="mt-6 flex items-center justify-center gap-8 text-[10px] font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2 text-slate-400">
                <Key className="w-4 h-4" />
                Session Encrypted
              </div>
              <div className="flex items-center gap-2 text-primary animate-pulse">
                <Activity className="w-4 h-4" />
                Network Optimal
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default Chat;



