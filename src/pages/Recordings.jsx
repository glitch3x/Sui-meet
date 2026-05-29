import { Search, Bell, Database, Download, Share2, Trash2, MoreHorizontal, Clock, CheckCircle, RotateCw, Plus, Upload, Shield, Video, Users, Settings as SettingsIcon, Zap, Play, ChevronRight, Activity } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { uploadToWalrus } from '../utils/walrus';
import PageTransition from '../components/PageTransition';

const RecordingCard = ({ title, date, duration, description, thumbnail, participants }) => (
  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col h-full relative">
    <div className="aspect-video relative overflow-hidden">
      <img src={thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt={title} />
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] flex items-center justify-center">
         <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Play className="w-6 h-6 text-primary fill-primary ml-1" />
         </div>
      </div>
      
      <div className="absolute bottom-4 left-4 flex gap-2">
        <div className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          {duration}
        </div>
        <div className="bg-green-50/90 backdrop-blur-md text-green-600 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 border border-green-100 shadow-sm">
          <Shield className="w-3.5 h-3.5" />
          Verified
        </div>
      </div>
    </div>
    
    <div className="p-8 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors leading-tight">{title}</h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{date}</p>
      </div>
      
      <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
        {description}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
        <div className="flex -space-x-3">
          {participants.map((p, i) => (
            <div key={i} className={`w-10 h-10 rounded-xl border-2 border-white bg-slate-50 flex items-center justify-center text-[9px] font-bold uppercase overflow-hidden shadow-sm transition-transform hover:scale-110 hover:z-10 cursor-pointer ${p.isMore ? 'bg-primary/10 text-primary border-primary/20' : ''}`}>
              {p.avatar ? <img src={p.avatar} className="w-full h-full object-cover" /> : <span className={p.isMore ? 'text-primary' : 'text-slate-400'}>{p.label}</span>}
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 transition-all">
            <Download className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 transition-all">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 transition-all">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Recordings = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
      <Sidebar />
      <PageTransition>
        <main className="flex-1 flex flex-col relative z-10">
        {/* Top Header */}
        <header className="px-10 py-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-xl group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search protocol archives..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6 ml-10">
            <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600 transition-all" />
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 cursor-pointer shadow-sm">
              <img src="/avatar.png" className="w-full h-full object-cover" alt="User" />
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <div className="p-12 max-w-7xl mx-auto overflow-y-auto max-h-[calc(100vh-88px)] custom-scrollbar">
          <div className="flex items-end justify-between mb-16">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold tracking-wider text-primary uppercase">
                  <Database className="w-3.5 h-3.5" />
                  Walrus Storage Active
               </div>
              <h1 className="text-5xl font-bold mb-4 tracking-tight text-slate-900">Session <span className="gradient-text">Archives</span></h1>
              <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                Your meetings are encrypted, sharded, and stored across the decentralized Walrus network. 
                Full immutability and verified on the Sui ledger.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl flex items-center gap-6 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center text-green-600">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Network Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">Connected</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RecordingCard 
              title="Architecture Review" 
              date="Oct 24, 2023" 
              duration="45:20" 
              description="Reviewing the decentralized signaling architecture and Move module integration milestones."
              thumbnail="/thumb_strategy.png"
              participants={[{ label: 'JD' }, { avatar: '/avatar.png' }, { label: '+3', isMore: true }]}
            />
            <RecordingCard 
              title="Security Audit v1" 
              date="Oct 22, 2023" 
              duration="1:12:05" 
              description="Deep dive into the cryptographic primitives and zero-knowledge proof implementations."
              thumbnail="/thumb_audit.png"
              participants={[{ label: 'MK' }, { label: 'RL' }]}
            />
            <RecordingCard 
              title="Design Sprint #4" 
              date="Oct 19, 2023" 
              duration="28:14" 
              description="Iterating on the user interface and peer-to-peer signaling feedback loops."
              thumbnail="/thumb_design.png"
              participants={[{ label: 'EV' }, { label: 'TH' }, { avatar: '/avatar.png' }]}
            />
            
            {/* Syncing Card */}
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group overflow-hidden relative min-h-[450px]">
              <div className="relative z-10">
                <div className="aspect-video bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center mb-10 relative overflow-hidden">
                  <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                      <RotateCw className="w-6 h-6 text-primary animate-spin" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Syncing Shards...</p>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-bold px-3 py-1.5 rounded-lg border border-slate-200">
                    15:00
                  </div>
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-slate-400 leading-tight">Weekly Sync: Node Devs</h3>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                     <div className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse" />
                     <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Processing</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Distributing protocol fragments to Walrus nodes...
                </p>
              </div>
              
              <div className="mt-10 relative z-10">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-primary rounded-full w-[65%] transition-all duration-1000" />
                </div>
                <div className="flex justify-between items-center px-1">
                   <p className="text-[10px] font-bold text-primary uppercase tracking-wider animate-pulse">Active Upload</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">65% Sync</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-20" />
        </div>
      </main>
      </PageTransition>
    </div>
  );
};

export default Recordings;



