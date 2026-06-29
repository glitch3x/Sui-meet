import React from 'react';
import { 
  Video, Shield, Database, Fingerprint, 
  ArrowRight, MessageSquare, Send, ExternalLink, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = () => {
  const currentAccount = useCurrentAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentAccount) {
      navigate('/dashboard');
    }
  }, [currentAccount, navigate]);

  return (
    <nav className="neobrutal-nav">
      <div className="flex items-center gap-2 md:gap-3">
        <img src="/logo.png" alt="SuiMeet" className="h-12 md:h-16 w-auto object-contain" />
      </div>
      
      <div className="hidden md:flex items-center gap-10 nav-links">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <a href="#" className="nav-link">Features</a>
        <a href="#" className="nav-link">Pricing</a>
      </div>

      <div className="flex justify-end">
        <ConnectButton className="!bg-black !text-white !font-bold !border md:!border !border-gray-200 !rounded-lg md:!rounded-xl !shadow-sm md:!shadow-sm hover:!translate-y-1 transition-transform !px-3 md:!px-6 !py-1.5 md:!py-3 !text-xs md:!text-base flex items-center" />
      </div>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="neobrutal-card flex flex-col gap-6"
  >
    <div className="w-14 h-14 border border-gray-200 rounded-2xl flex items-center justify-center bg-white transition-transform duration-500 hover:-translate-y-1" >
      <Icon className="text-black w-7 h-7" />
    </div>
    <h3 className="text-2xl font-bold text-black font-heading">{title}</h3>
    <p className="text-slate-600 leading-relaxed font-medium">{description}</p>
  </motion.div>
);

const Landing = () => {
  return (
    <div className="app-container font-sans bg-white text-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative px-6 pt-40 pb-32 max-w-7xl mx-auto z-10 text-left md:text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2 rounded-full border md:border border-gray-200 bg-white font-bold text-[9px] md:text-sm text-black mb-6 md:mb-10 uppercase tracking-widest shadow-sm md:shadow-sm">
            <Zap className="w-3 h-3 md:w-4 md:h-4" />
            Empowering Sovereign Communication
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6 md:mb-8 text-black max-w-4xl font-heading">
            The World's <br className="hidden md:block" />
            <span className="text-white bg-[#008248] px-3 md:px-4 py-1 inline-block border md:border border-gray-200 shadow-sm md:shadow-sm transform -rotate-2 my-2">Decentralized</span> <br className="hidden md:block" />
            Meeting Protocol
          </h1>
          <p className="text-slate-600 font-medium text-base md:text-xl mb-10 md:mb-12 max-w-2xl leading-relaxed">
            SuiMeet provides enterprise-grade, sharded communication infrastructure 
            so you can focus on building sovereign connections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-24">
            <Link to="/dashboard" className="neobrutal-btn primary text-lg px-10 py-4">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="neobrutal-btn secondary text-lg px-10 py-4">
              Documentation
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
             <div className="border border-gray-200 px-6 py-3 rounded-xl font-bold text-lg uppercase shadow-sm bg-white">Sui Network</div>
             <div className="border border-gray-200 px-6 py-3 rounded-xl font-bold text-lg uppercase shadow-sm bg-white">Walrus</div>
             <div className="border border-gray-200 px-6 py-3 rounded-xl font-bold text-lg uppercase shadow-sm bg-white">zkLogin</div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6 border-t-[3px] border-gray-200 bg-[#f0fdf4]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black font-heading">Infrastructure-First Design</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">High-performance decentralized modules engineered for security.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Shield}
              title="Secure P2P"
              description="Video and audio data is transmitted directly between peers using sharded signaling, ensuring absolute privacy."
            />
            <FeatureCard 
              icon={Database}
              title="Walrus Storage"
              description="Meeting recordings are encrypted and distributed across the Walrus decentralized network for permanent redundancy."
            />
            <FeatureCard 
              icon={Fingerprint}
              title="zkLogin Ready"
              description="Access the platform using your existing social accounts while maintaining full ownership of your cryptographic identity."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 border-t-[3px] border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto border border-gray-200 bg-[#008248] p-12 md:p-24 relative overflow-hidden rounded-[40px] shadow-sm">
          <div className="relative z-10 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-white font-heading">
              Ready to experience <br />
              true sovereignty?
            </h2>
            <p className="text-white/90 font-medium text-xl mb-12 max-w-2xl">
              Start your first decentralized meeting today. <br className="hidden md:block" />
              The sovereign bridge for professional communication.
            </p>
            <Link to="/dashboard" className="neobrutal-btn secondary text-xl px-12 py-5 transform hover:scale-105">
              Initialize Node
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-[3px] border-gray-200 py-20 px-8 bg-[#f0fdf4]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="SuiMeet" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs font-medium">
              Professional decentralized communication built on the next generation of blockchain infrastructure.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-black mb-6 text-sm uppercase tracking-widest font-heading">Product</h4>
            <ul className="space-y-4 text-sm text-slate-600 font-bold">
              <li className="hover:text-[#008248] cursor-pointer transition-colors">Meetings</li>
              <li className="hover:text-[#008248] cursor-pointer transition-colors">Recordings</li>
              <li className="hover:text-[#008248] cursor-pointer transition-colors">Contacts</li>
              <li className="hover:text-[#008248] cursor-pointer transition-colors">API</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-black mb-6 text-sm uppercase tracking-widest font-heading">Technology</h4>
            <ul className="space-y-4 text-sm text-slate-600 font-bold">
              <li className="hover:text-[#008248] cursor-pointer transition-colors">Sui Network</li>
              <li className="hover:text-[#008248] cursor-pointer transition-colors">Walrus Storage</li>
              <li className="hover:text-[#008248] cursor-pointer transition-colors">zkLogin</li>
              <li className="hover:text-[#008248] cursor-pointer transition-colors">Open Source</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-black mb-6 text-sm uppercase tracking-widest font-heading">Community</h4>
            <div className="flex gap-4">
              {[Send, MessageSquare, ExternalLink].map((Icon, i) => (
                <div key={i} className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer text-black shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t-[3px] border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-black font-bold uppercase tracking-widest">
          <span>© 2026 SuiMeet. Built on Sui.</span>
          <div className="flex gap-8">
            <span className="hover:text-[#008248] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[#008248] cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
