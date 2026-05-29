import React from 'react';
import Sidebar from '../components/Sidebar';
import PageTransition from '../components/PageTransition';
import { HelpCircle, Send } from 'lucide-react';

const Support = () => {
  return (
    <div className="flex h-screen bg-white font-sans text-black overflow-hidden">
      <Sidebar />
      <PageTransition className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="px-10 py-6 border-b-[3px] border-black bg-white z-20 shrink-0 flex items-center gap-4">
          <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-heading">Support Center</h2>
        </header>
        <main className="flex-1 overflow-y-auto p-10 bg-[#f0fdf4]">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="neobrutal-card bg-white !p-10 text-center">
              <h3 className="text-3xl font-bold font-heading mb-4">How can we help?</h3>
              <p className="text-lg font-medium text-slate-700 mb-8 max-w-lg mx-auto">
                Need help setting up your sovereign node, or having trouble connecting to a meeting? 
                Submit a ticket directly to the DAO.
              </p>
              
              <div className="flex flex-col gap-4 max-w-md mx-auto">
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="w-full bg-white border-[3px] border-black rounded-xl py-3 px-4 text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold"
                />
                <textarea 
                  rows={5}
                  placeholder="Describe your issue..." 
                  className="w-full bg-white border-[3px] border-black rounded-xl py-3 px-4 text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold resize-none"
                />
                <button className="neobrutal-btn primary w-full justify-center !py-4 text-lg mt-2">
                  <Send className="w-5 h-5" />
                  Submit Request
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="neobrutal-card bg-white !p-6 hover:-translate-y-1 transition-transform">
                <h4 className="font-bold font-heading text-lg mb-2">Documentation</h4>
                <p className="text-sm font-medium text-slate-600 mb-4">Read the full protocol specification.</p>
                <button className="neobrutal-btn secondary text-sm px-4 py-2">Read Docs</button>
              </div>
              <div className="neobrutal-card bg-white !p-6 hover:-translate-y-1 transition-transform">
                <h4 className="font-bold font-heading text-lg mb-2">Community Discord</h4>
                <p className="text-sm font-medium text-slate-600 mb-4">Join 10k+ sovereign operators.</p>
                <button className="neobrutal-btn secondary text-sm px-4 py-2">Join Server</button>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

export default Support;
