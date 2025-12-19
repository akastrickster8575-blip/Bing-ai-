
import React from 'react';
import { Tab } from '../types';
import { 
  LayoutDashboard, 
  Camera, 
  Ticket, 
  Cpu, 
  Wallet,
  Zap,
  Bell,
  LayoutGrid
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-sky-500 selection:text-white pb-32">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <header className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-sky-500 blur-lg opacity-40 animate-pulse" />
            <div className="bg-gradient-to-br from-sky-400 to-sky-600 p-2.5 rounded-2xl relative shadow-lg">
              <Zap className="text-white w-6 h-6 fill-white/20" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-orbitron font-black tracking-tighter bg-gradient-to-r from-white via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              BING AI
            </h1>
            <span className="text-[10px] text-sky-500/80 font-bold uppercase tracking-[0.2em] block -mt-1">Premium Platform</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white/5 rounded-2xl border border-white/10 text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-sky-500 rounded-full border-2 border-slate-900" />
          </button>
          <div className="hidden sm:flex items-center gap-3 bg-sky-500/10 px-5 py-2.5 rounded-2xl border border-sky-500/20">
            <Wallet className="w-5 h-5 text-sky-400" />
            <span className="text-sm font-bold font-orbitron text-sky-200">VAULT</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 py-8 max-w-5xl mx-auto">
        {children}
      </main>

      <div className="fixed bottom-8 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
        <nav className="glass px-2 py-2 rounded-3xl flex gap-1 items-center border border-white/10 shadow-2xl pointer-events-auto backdrop-blur-2xl bg-slate-900/80">
          <NavItem 
            icon={<LayoutDashboard />} 
            label="Home" 
            active={activeTab === Tab.Dashboard} 
            onClick={() => setActiveTab(Tab.Dashboard)} 
          />
          <NavItem 
            icon={<Camera />} 
            label="Upload" 
            active={activeTab === Tab.Upload} 
            onClick={() => setActiveTab(Tab.Upload)} 
          />
          <NavItem 
            icon={<LayoutGrid />} 
            label="Feed" 
            active={activeTab === Tab.Feed} 
            onClick={() => setActiveTab(Tab.Feed)} 
          />
          <NavItem 
            icon={<Ticket />} 
            label="Redeem" 
            active={activeTab === Tab.Redeem} 
            onClick={() => setActiveTab(Tab.Redeem)} 
          />
          <NavItem 
            icon={<Cpu />} 
            label="Codes" 
            active={activeTab === Tab.AIGen} 
            onClick={() => setActiveTab(Tab.AIGen)} 
          />
        </nav>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl transition-all duration-500 ${
      active 
        ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 scale-105' 
        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
    <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'block mt-1' : 'hidden'}`}>{label}</span>
  </button>
);
