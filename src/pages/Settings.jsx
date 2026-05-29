import React from 'react';
import {
  Search,
  Bell,
  User,
  Copy,
  Shield,
  Key,
  Database,
  Layout,
  Globe,
  ChevronDown,
  ExternalLink,
  Plus,
  Zap,
  Activity,
  Cpu,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import PageTransition from '../components/PageTransition';

const SectionHeader = ({ icon: Icon, title, badge }) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
    </div>
    {badge && (
      <div className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20 flex items-center gap-2">
        <Zap className="w-3 h-3" />
        {badge}
      </div>
    )}
  </div>
);

const Toggle = ({ active }) => (
  <div
    className={`w-12 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${
      active ? 'bg-primary' : 'bg-slate-200'
    }`}
  >
    <div
      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
        active ? 'translate-x-6' : ''
      }`}
    />
  </div>
);

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar />
      <PageTransition>
        <main className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="px-10 py-5 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-20 shadow-sm">
            <div className="relative w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search settings..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-slate-500 cursor-pointer hover:text-primary transition-colors" />
              <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 cursor-pointer shadow-sm">
                <img src="/avatar.png" className="w-full h-full object-cover" alt="User" />
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-10 max-w-5xl mx-auto w-full overflow-y-auto custom-scrollbar">
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Protocol <span className="gradient-text">Configuration</span>
              </h1>
              <p className="text-slate-500 text-base max-w-2xl">
                Manage your decentralized identity, cryptographic session keys, and communication protocol preferences.
              </p>
            </div>

            <div className="space-y-8">
              {/* Identity & Node */}
              <section className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8">
                <SectionHeader icon={User} title="Identity & Node" badge="ZK-LOGGED IN" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Display Alias</label>
                    <input
                      type="text"
                      defaultValue="Alex Rivera"
                      className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">zkLogin Verified Node</label>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-600">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold">@</div>
                      ALEX.R@PROTOCOL.SUI
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Node Public Signature (SUI)</label>
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                      <code className="text-xs font-mono text-slate-500 truncate">8x7d91e...f39a8422112b0128</code>
                      <Copy className="w-4 h-4 text-slate-400 cursor-pointer hover:text-primary transition-colors flex-shrink-0 ml-3" />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      This cryptographic shard is derived from your zkLogin and represents your sovereign presence on the Sui mainnet.
                    </p>
                  </div>
                </div>
              </section>

              {/* Privacy & Cryptography */}
              <section className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8">
                <SectionHeader icon={Shield} title="Privacy & Cryptography" />
                <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                      <Key className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-slate-900">E2E SEAL Protocol Encryption</h4>
                      <p className="text-xs text-slate-500">Sovereign end-to-end encryption for absolute communication secrecy.</p>
                    </div>
                  </div>
                  <Toggle active={true} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-primary/40 transition-colors">
                    <div className="w-9 h-9 bg-white rounded-lg border border-slate-200 flex items-center justify-center mb-4 text-slate-500">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-semibold text-slate-900 mb-1">Node Key Rotation</h4>
                    <p className="text-xs text-slate-500 mb-4">Rotate your cryptographic node keys every 90 days for maximum security.</p>
                    <button className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                      Initiate Rotation <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-primary/40 transition-colors">
                    <div className="w-9 h-9 bg-white rounded-lg border border-slate-200 flex items-center justify-center mb-4 text-slate-500">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-semibold text-slate-900 mb-1">Identity Obfuscation</h4>
                    <p className="text-xs text-slate-500 mb-4">Hide your node presence from unverified peers using zero-knowledge proofs.</p>
                    <button className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                      Privacy Setup <Globe className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Decentralized Storage */}
              <section className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8">
                <SectionHeader icon={Database} title="Decentralized Storage" badge="NODES SYNCHRONIZED" />
                <div className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Protocol Shard Occupancy</p>
                      <h4 className="text-3xl font-bold text-slate-900">
                        42.5 <span className="text-sm text-slate-400 font-normal">GB</span>{' '}
                        <span className="text-slate-300">/ </span>
                        100 <span className="text-sm text-slate-400 font-normal">GB</span>
                      </h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Network Integrity</p>
                      <div className="flex items-center gap-2 justify-end">
                        <Activity className="w-4 h-4 text-primary animate-pulse" />
                        <p className="text-base font-bold text-primary">OPTIMAL</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full w-[42.5%] transition-all duration-1000" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Recording Shards', value: '18.2 GB', icon: Activity },
                    { label: 'Protocol Media', value: '24.1 GB', icon: Layout },
                    { label: 'Active Sync Nodes', value: '12 Active', icon: Cpu },
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-primary/40 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                        <stat.icon className="w-4 h-4 text-slate-400" />
                      </div>
                      <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-primary/10 border border-primary/20 text-primary py-3 rounded-xl font-medium text-sm uppercase tracking-wider hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Expand Decentralized Quota
                </button>
              </section>

              {/* Protocol Preferences */}
              <section className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8">
                <SectionHeader icon={Layout} title="Protocol Preferences" />
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Protocol Interface</label>
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 cursor-pointer hover:border-primary/40 transition-colors">
                      <span className="text-sm text-slate-800">Light (Green & White)</span>
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Node Sync Region</label>
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 cursor-pointer hover:border-primary/40 transition-colors">
                      <span className="text-sm text-slate-800">Global Protocol (US-East)</span>
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-8 bg-slate-50 border border-slate-200 rounded-xl p-2">
                  <div className="flex items-center justify-between px-4 py-4 hover:bg-white rounded-lg transition-colors">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Auto-Archive Protocol Streams</h4>
                      <p className="text-xs text-slate-500">Automatically migrate shards to Walrus after 30 days of inactivity.</p>
                    </div>
                    <Toggle active={true} />
                  </div>
                  <div className="flex items-center justify-between px-4 py-4 hover:bg-white rounded-lg transition-colors">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Neural Ambient Noise Reduction</h4>
                      <p className="text-xs text-slate-500">Use edge-AI nodes for ultra-high fidelity ambient voice filtering.</p>
                    </div>
                    <Toggle active={false} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-light transition-colors shadow-sm">
                    Save Configuration
                  </button>
                </div>
              </section>
            </div>

            <div className="mt-10 text-center text-xs text-slate-400 pb-8">
              SuiMeet Protocol v2.5.0-ALPHA &bull; Sovereign Node Infrastructure &bull; Walrus Verified
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

export default Settings;
