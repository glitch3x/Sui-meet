import React from 'react';
import { Layout, Settings, HelpCircle, Shield, Plus, Video } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSui } from '../context/SuiContext';

const NavLink = ({ icon: Icon, label, path, active }) => (
  <Link
    to={path}
    className={`flex items-center gap-3 px-5 py-3 transition-all mx-4 rounded-xl font-bold ${
      active
        ? 'bg-[#008248] text-white border-[3px] border-black shadow-[4px_4px_0px_0px_#000]'
        : 'text-slate-600 hover:text-black hover:bg-white hover:border-[3px] hover:border-black hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5 border-[3px] border-transparent'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-500'}`} />
    <span>{label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const { userAddress } = useSui();

  return (
    <aside className="w-72 border-r-[3px] border-black flex flex-col bg-[#f0fdf4] sticky top-0 h-screen z-30">
      {/* Brand Logo */}
      <div className="px-8 pt-10 pb-10 flex items-center gap-3">
        <div className="w-10 h-10 border-[3px] border-black rounded-xl flex items-center justify-center bg-white shadow-[3px_3px_0px_0px_#000]">
          <Video className="text-black w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold text-black tracking-tight font-heading">SuiMeet</h1>
      </div>

      {/* User Profile */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 p-3 bg-white border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_#000]">
          <div className="w-12 h-12 rounded-xl border-[3px] border-black relative bg-slate-100">
            <img src="/avatar.png" alt="User" className="w-full h-full object-cover rounded-lg" />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-[3px] border-black rounded-full ${userAddress ? 'bg-[#00b363]' : 'bg-slate-300'}`} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-black truncate font-heading">Sovereign Node</p>
            <p className={`text-[10px] font-bold mt-0.5 uppercase tracking-wider ${userAddress ? 'text-[#008248]' : 'text-slate-500'}`}>
              {userAddress ? 'Network Active' : 'Connecting...'}
            </p>
          </div>
        </div>
      </div>

      {/* New Meeting Button */}
      <div className="px-6 mb-6">
        <Link to="/meeting" className="neobrutal-btn primary w-full justify-center py-3">
          <Plus className="w-5 h-5" />
          New Meeting
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto pt-4">
        <NavLink icon={Layout} label="Dashboard" path="/dashboard" active={location.pathname === '/dashboard'} />
        <NavLink icon={Settings} label="Settings" path="/settings" active={location.pathname === '/settings'} />
      </nav>

      {/* Bottom Actions */}
      <div className="p-6">
        <div className="space-y-2">
          <Link to="/support" className={`flex items-center gap-3 transition-all px-4 py-3 rounded-xl font-bold text-sm border-[3px] ${location.pathname === '/support' ? 'bg-[#008248] text-white border-black shadow-[4px_4px_0px_0px_#000]' : 'text-slate-600 border-transparent hover:text-black hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5'}`}>
            <HelpCircle className="w-4 h-4" />
            <span>Support</span>
          </Link>
          <Link to="/privacy" className={`flex items-center gap-3 transition-all px-4 py-3 rounded-xl font-bold text-sm border-[3px] ${location.pathname === '/privacy' ? 'bg-[#008248] text-white border-black shadow-[4px_4px_0px_0px_#000]' : 'text-slate-600 border-transparent hover:text-black hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5'}`}>
            <Shield className="w-4 h-4" />
            <span>Privacy</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
