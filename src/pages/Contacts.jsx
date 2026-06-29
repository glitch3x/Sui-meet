import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  MessageSquare, 
  Video, 
  CheckCircle, 
  Shield, 
  Bell,
  Grid,
  List,
  MoreHorizontal,
  Zap,
  ChevronRight,
  Activity
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import PageTransition from '../components/PageTransition';

const ContactCard = ({ name, status, address, avatar, isOffline = false }) => (
  <div className={`bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm flex flex-col transition-all duration-300 hover:shadow-md group ${isOffline ? 'opacity-50 grayscale' : ''}`}>
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden relative border border-slate-100">
          <img src={avatar} className="w-full h-full object-cover" alt={name} />
          {!isOffline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full shadow-sm" />
          )}
        </div>
        <div>
          <h4 className="font-bold text-lg text-slate-900 leading-tight mb-1">{name}</h4>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'Online' ? 'bg-green-500' : status === 'Away' ? 'bg-amber-400' : 'bg-slate-300'}`} />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{status}</p>
          </div>
        </div>
      </div>
      <button className="text-slate-300 hover:text-slate-600 transition-all p-2 hover:bg-slate-50 rounded-lg">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
    
    <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Network ID</p>
      <code className="text-[11px] font-mono text-slate-500 px-1 truncate block">{address}</code>
    </div>
    
    <button 
      disabled={isOffline}
      className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${isOffline ? 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed' : 'btn-primary'}`}
    >
      {isOffline ? 'Inactive' : 'Start Meeting'}
    </button>
  </div>
);

const Contacts = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
      <Sidebar />
      <PageTransition>
        <main className="flex-1 flex flex-col relative z-10">
        {/* Top Header */}
        <header className="px-10 py-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search contacts..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-slate-900 placeholder:text-slate-400"
            />
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
              <h1 className="text-5xl font-bold mb-4 tracking-tight text-slate-900">Verified <span className="gradient-text">Contacts</span></h1>
              <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">Manage your peer connections and initiate secure sessions via decentralized signaling nodes.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-white px-5 py-2 rounded-full border border-slate-100 text-[10px] font-bold text-slate-400 shadow-sm">
                48 Peers Connected
              </div>
              <button className="btn-primary px-8 py-3.5 text-sm">
                <Plus className="w-5 h-5" />
                Add Node
              </button>
            </div>
          </div>
          
          {/* Featured Contact */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Active Peer</h3>
            </div>
            
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-8 bg-white border border-slate-100 p-12 rounded-[40px] shadow-sm flex items-center gap-12 group hover:border-primary/20 transition-all duration-500">
                <div className="w-40 h-40 rounded-[32px] overflow-hidden border-2 border-slate-50 shadow-md relative group-hover:scale-105 transition-all duration-500">
                  <img src="/avatar.png" className="w-full h-full object-cover" alt="Sarah Jenkins" />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 border border-white rounded-full animate-pulse" />
                </div>
                
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Sarah Jenkins</h2>
                    <div className="bg-primary/5 text-primary text-[9px] font-bold px-3 py-1 rounded-full border border-primary/10 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 fill-primary/10" />
                      zkVerified
                    </div>
                  </div>
                  <code className="text-xs text-slate-400 block font-mono bg-slate-50 w-fit px-4 py-2 rounded-lg border border-slate-100">Node ID: 0x7a2...f9e1</code>
                  
                  <div className="flex gap-4 pt-2">
                    <button className="btn-primary px-8 py-3.5 text-sm">
                      <Video className="w-5 h-5" />
                      Start Meeting
                    </button>
                    <button className="bg-slate-50 text-slate-600 px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-3 hover:bg-slate-100 border border-slate-100 transition-all">
                      <MessageSquare className="w-5 h-5 text-slate-400" />
                      Secure Chat
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-4 bg-primary p-10 rounded-[40px] text-white flex flex-col justify-between relative overflow-hidden shadow-lg group">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Sovereign Vault</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    Metadata is sharded and distributed across Walrus nodes for absolute privacy.
                  </p>
                </div>
                
                <div className="relative z-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider bg-black/20 w-fit px-4 py-2 rounded-full border border-white/10">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Syncing Shards
                </div>
                
                <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500" />
              </div>
            </div>
          </section>
          
          {/* Directory */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Node Directory</h3>
              </div>
              
              <div className="flex p-1.5 bg-white rounded-xl border border-slate-100 shadow-sm">
                <button className="p-2.5 bg-primary rounded-lg shadow-sm text-white">
                  <Grid className="w-4.5 h-4.5" />
                </button>
                <button className="p-2.5 text-slate-400 hover:text-slate-600 transition-all">
                  <List className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ContactCard name="Michael Chen" status="Online" address="0x91e8...d2c4b82" avatar="/avatar.png" />
              <ContactCard name="Aisha Al-Farsi" status="Away" address="0x22f1...a772b10" avatar="/avatar.png" />
              <ContactCard name="David Schmidt" status="Offline" address="0xbc5a...9e33f21" avatar="/avatar.png" isOffline />
              <ContactCard name="Elena Petrova" status="Online" address="0xf882...c11d2e4" avatar="/avatar.png" />
              <ContactCard name="Kenji Tanaka" status="Online" address="0x1102...3344e1a" avatar="/avatar.png" />
              
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-12 group hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer min-h-[380px]">
                <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all text-slate-300 group-hover:text-primary group-hover:border-primary/20">
                  <Plus className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-xl text-slate-900">Sync New Node</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2">Sui Address / ID</p>
              </div>
            </div>
          </section>
          <div className="h-20" />
        </div>
      </main>
      </PageTransition>
    </div>
  );
};

export default Contacts;



