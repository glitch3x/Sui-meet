import React from 'react';
import { Layout, Settings, HelpCircle, Shield, Plus, Video } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSui } from '../context/SuiContext';

const NavLink = ({ icon: Icon, label, path, active }) => (
  <Link
    to={path}
    className={`flex items-center gap-3 px-5 py-3 transition-all mx-4 rounded-xl font-bold ${
      active
        ? 'bg-[#008248] text-white border border-gray-200 shadow-sm'
        : 'text-slate-600 hover:text-black hover:bg-white hover:border hover:border-gray-200 hover:shadow-sm hover:-translate-y-1 border border-transparent'
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
    <aside className="w-64 lg:w-72 border-r border-gray-200 hidden md:flex flex-col bg-[#f0fdf4] sticky top-0 h-screen z-30 shrink-0">
      {/* Brand Logo */}
      <div className="px-8 pt-10 pb-10 flex items-center gap-3">
        <img src="/logo.png" alt="SuiMeet" className="h-14 w-auto object-contain" />
      </div>

      {/* User Profile */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="w-12 h-12 rounded-xl border border-gray-200 relative bg-slate-100">
            <img src="/avatar.png" alt="User" className="w-full h-full object-cover rounded-lg" />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 border border-gray-200 rounded-full ${userAddress ? 'bg-[#00b363]' : 'bg-slate-300'}`} />
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
          <Link to="/support" className={`flex items-center gap-3 transition-all px-4 py-3 rounded-xl font-bold text-sm border ${location.pathname === '/support' ? 'bg-[#008248] text-white border-gray-200 shadow-sm' : 'text-slate-600 border-transparent hover:text-black hover:border-gray-200 hover:bg-white hover:shadow-sm hover:-translate-y-1'}`}>
            <HelpCircle className="w-4 h-4" />
            <span>Support</span>
          </Link>
          <Link to="/privacy" className={`flex items-center gap-3 transition-all px-4 py-3 rounded-xl font-bold text-sm border ${location.pathname === '/privacy' ? 'bg-[#008248] text-white border-gray-200 shadow-sm' : 'text-slate-600 border-transparent hover:text-black hover:border-gray-200 hover:bg-white hover:shadow-sm hover:-translate-y-1'}`}>
            <Shield className="w-4 h-4" />
            <span>Privacy</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
