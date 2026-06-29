import React from 'react';
import { 
  Video, Shield, Calendar, Users, Activity, Search, Bell, Cpu, Lock, ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useSui, PACKAGE_ID } from '../context/SuiContext';
import PageTransition from '../components/PageTransition';
import { Transaction } from '@mysten/sui/transactions';
import { useState } from 'react';
import { useCurrentAccount, ConnectButton } from '@mysten/dapp-kit';

const Dashboard = () => {
  const { userAddress, initializeInvisibleWallet, logout, isLoading, suiClient, keypair } = useSui();
  const currentAccount = useCurrentAccount();
  const [isCreating, setIsCreating] = useState(false);
  const [joinId, setJoinId] = useState('');
  const [joinPassword, setJoinPassword] = useState('');
  const [createdMeeting, setCreatedMeeting] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleNewMeeting = () => {
    setIsCreating(true);
    // Generate an 8-character alphanumeric code
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let createdObj = '';
    for (let i = 0; i < 8; i++) {
      createdObj += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Generate a simple password
    let pwd = '';
    for (let i = 0; i < 6; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Save to local storage for mock verification
    localStorage.setItem(`meeting_${createdObj}`, pwd);
    
    setCreatedMeeting({ id: createdObj, pwd });
    setIsCreating(false);
  };

  const handleJoin = () => {
    if (!joinId || !joinPassword) {
      return alert('Please enter both Meeting ID and Password.');
    }
    
    const savedPwd = localStorage.getItem(`meeting_${joinId}`);
    if (savedPwd && savedPwd !== joinPassword) {
      return alert('Incorrect password!');
    }
    
    navigate(`/meeting?id=${joinId}`);
  };

  return (
    <div className="flex h-screen bg-white font-sans text-black overflow-hidden relative">
      {/* Meeting Created Modal */}
      {createdMeeting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold font-heading mb-3 text-black">Meeting Ready!</h2>
            <p className="text-slate-600 mb-6 font-medium text-sm">Configure your meeting duration and invite participants.</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Meeting ID</label>
                  <div className="bg-[#f0fdf4] border border-gray-200 rounded-xl p-3 font-bold text-lg text-black text-center tracking-widest shadow-sm">
                    {createdMeeting.id}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Password</label>
                  <div className="bg-[#f0fdf4] border border-gray-200 rounded-xl p-3 font-bold text-lg text-black text-center tracking-widest shadow-sm">
                    {createdMeeting.pwd}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Estimated Duration</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl p-3 font-bold text-sm text-black shadow-sm focus:outline-none cursor-pointer">
                  <option value="1">1 Hour</option>
                  <option value="2">2 Hours</option>
                  <option value="5">5 Hours</option>
                  <option value="10">10 Hours</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Invite via Email</label>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    id="inviteEmail"
                    placeholder="peer@example.com"
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold text-black focus:outline-none shadow-sm"
                  />
                  <button 
                    onClick={() => {
                      const email = document.getElementById('inviteEmail').value;
                      if(email) {
                        alert(`Meeting details securely sent to ${email}!`);
                        document.getElementById('inviteEmail').value = '';
                      } else {
                        alert('Please enter an email address.');
                      }
                    }}
                    className="bg-black text-white border border-gray-200 font-bold rounded-xl px-4 py-2 hover:bg-slate-800 transition-colors shadow-sm text-sm"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4 border-t-[3px] border-gray-200 border-dashed">
              <button 
                onClick={() => setCreatedMeeting(null)}
                className="flex-1 py-3 bg-white border border-gray-200 text-black font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => navigate(`/meeting?id=${createdMeeting.id}&host=true&pwd=${createdMeeting.pwd}`)}
                className="flex-1 py-3 bg-[#008248] border border-gray-200 text-white font-bold rounded-xl hover:bg-[#006e3d] transition-colors shadow-sm text-sm"
              >
                Start Session
              </button>
            </div>
          </div>
        </div>
      )}

      <Sidebar />
      <PageTransition className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="px-10 py-6 border-b-[3px] border-gray-200 flex items-center justify-between bg-white z-20 shrink-0">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black font-bold w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search meetings..." 
              className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-12 pr-4 text-sm focus:outline-none focus:shadow-sm transition-all text-black placeholder:text-slate-500 font-bold"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-black rounded-xl shadow-sm">
               <Activity className="w-4 h-4 text-[#00b363]" />
               <span className="text-[11px] font-bold uppercase tracking-widest">Network Active</span>
            </div>
            <div className="relative">
              <div 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-11 h-11 flex items-center justify-center border border-gray-200 rounded-xl cursor-pointer hover:-translate-y-1 hover:shadow-sm transition-all bg-white relative"
              >
                <Bell className="w-5 h-5 text-black" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              
              {showNotifications && (
                <div className="absolute right-0 mt-4 w-80 bg-white border border-gray-200 rounded-2xl shadow-sm z-[100] overflow-hidden">
                  <div className="p-4 border-b-[3px] border-gray-200 bg-[#f0fdf4] flex justify-between items-center">
                    <h4 className="font-bold font-heading text-black">Notifications</h4>
                    <span className="text-[10px] font-bold bg-black text-white px-2 py-1 rounded-full">2 New</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-4 border-b-[3px] border-gray-200 hover:bg-slate-50 cursor-pointer transition-colors bg-red-50">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 border border-gray-200">
                          <Calendar className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-black mb-1">Upcoming Session Alert</p>
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">
                            <strong className="text-black">Internal Team Sync</strong> is starting in <strong>20 minutes</strong>. 
                          </p>
                          <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-widest">Just now</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-slate-50 cursor-pointer transition-colors">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#008248]/10 flex items-center justify-center shrink-0 border border-gray-200">
                          <Shield className="w-4 h-4 text-[#008248]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-black mb-1">Security Verification</p>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            Your ZK-Proof was successfully verified on the Sui network.
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-gray-200 cursor-pointer shadow-sm bg-slate-100">
              <img src="/avatar.png" className="w-full h-full object-cover" alt="User" />
            </div>
            {currentAccount ? (
              <ConnectButton className="!bg-white !text-black !font-bold !border !border-gray-200 !rounded-xl !shadow-sm hover:!bg-slate-50 transition-colors !px-4 !py-2 !text-sm" />
            ) : (
              <button 
                onClick={userAddress ? logout : initializeInvisibleWallet}
                disabled={isLoading}
                className={`neobrutal-btn !px-6 !py-2 text-sm ${userAddress ? 'bg-slate-100 text-black border border-gray-200' : 'bg-black text-white'}`}
              >
                {isLoading ? 'Syncing...' : userAddress ? 'Disconnect Session' : 'Initialize Session'}
              </button>
            )}
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-[#f0fdf4]">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="flex-[2] space-y-10">
              {/* Hero Card */}
              <div className="neobrutal-card relative bg-white">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-[10px] font-bold tracking-widest text-black mb-6 uppercase bg-white shadow-sm">
                    <Cpu className="w-3.5 h-3.5 text-[#008248]" />
                    Sui Protocol v1.0
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black font-heading leading-tight">
                    Welcome back, <br />
                    <span className="text-[#008248]">Sovereign Explorer.</span>
                  </h1>
                  <p className="text-slate-600 max-w-md mb-8 text-base font-medium">
                    Start a new meeting or join an existing one using decentralized signaling and sharded storage.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <button onClick={handleNewMeeting} disabled={isCreating} className="neobrutal-btn primary text-sm px-6 py-3">
                      <Video className="w-4 h-4" />
                      {isCreating ? 'Deploying...' : 'New Meeting'}
                    </button>
                      <div className="flex bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden items-center">
                        <input 
                          type="text" 
                          placeholder="Meeting ID" 
                          value={joinId}
                          onChange={(e) => setJoinId(e.target.value)}
                          className="bg-transparent px-4 py-2 text-sm focus:outline-none w-32 font-bold text-black border-r-[3px] border-gray-200"
                        />
                        <input 
                          type="password" 
                          placeholder="Password" 
                          value={joinPassword}
                          onChange={(e) => setJoinPassword(e.target.value)}
                          className="bg-transparent px-4 py-2 text-sm focus:outline-none w-32 font-bold text-black"
                        />
                        <button onClick={handleJoin} className="h-full px-5 py-2 bg-black text-white font-bold text-sm hover:bg-slate-800 transition-colors border-l-[3px] border-gray-200">
                          Join
                        </button>
                      </div>
                  </div>
                </div>
              </div>
              

            </div>
            
            {/* Right Column */}
            <div className="flex-1 space-y-10">
              {/* Identity Status */}
              <div className="neobrutal-card !p-8 !bg-[#008248] text-white">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
                    <Lock className="w-5 h-5 text-black" />
                  </div>
                  <span className="px-3 py-1 bg-white text-black border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">ZK-Verified</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 font-heading text-white">Ephemeral Session Key</h3>
                <p className="text-white/90 text-sm mb-8 leading-relaxed font-medium">
                  To prevent wallet popups during video calls, we generate an invisible 
                  temporary identity specifically for this session.
                </p>
                
                <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
                  <code className="text-xs font-bold text-black">{userAddress ? `${userAddress.slice(0, 8)}...${userAddress.slice(-6)}` : 'Not Connected'}</code>
                  <ExternalLink className="w-4 h-4 text-black cursor-pointer hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

export default Dashboard;
