import React from 'react';
import Sidebar from '../components/Sidebar';
import PageTransition from '../components/PageTransition';
import { Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="flex h-screen bg-white font-sans text-black overflow-hidden">
      <Sidebar />
      <PageTransition className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="px-10 py-6 border-b-[3px] border-gray-200 bg-white z-20 shrink-0 flex items-center gap-4">
          <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-heading">Privacy Policy</h2>
        </header>
        <main className="flex-1 overflow-y-auto p-10 bg-[#f0fdf4]">
          <div className="max-w-4xl mx-auto neobrutal-card bg-white !p-10 space-y-8">
            <div>
              <h3 className="text-3xl font-bold font-heading mb-4">Sovereign Privacy</h3>
              <p className="text-lg font-medium text-slate-700 leading-relaxed">
                At SuiMeet, privacy is not a feature—it is the foundational layer. All meetings are 
                end-to-end encrypted and routed through decentralized signaling servers. We do not 
                track, store, or sell your personal data.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-6 bg-[#008248] text-white shadow-sm">
              <h4 className="text-xl font-bold font-heading mb-2">Decentralized Storage</h4>
              <p className="font-medium text-white/90">
                Any data you choose to save is cryptographically sharded and stored on the Walrus network. 
                Only you hold the keys to reassemble it.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold font-heading mb-3">Identity Management</h4>
              <p className="text-base font-medium text-slate-700 leading-relaxed">
                Using zkLogin, we enable you to authenticate without exposing your underlying cryptographic identity.
                Your social logins are converted to zero-knowledge proofs on the Sui ledger.
              </p>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

export default Privacy;
