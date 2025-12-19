
import React from 'react';
import { UserAccount } from '../types';
import { Users, ChevronRight } from 'lucide-react';

interface UserSwitcherProps {
  accounts: UserAccount[];
  activeAccountId: string;
  onSwitch: (id: string) => void;
}

export const UserSwitcher: React.FC<UserSwitcherProps> = ({ accounts, activeAccountId, onSwitch }) => {
  return (
    <div className="glass p-4 rounded-3xl border border-white/10 flex flex-col gap-3">
      <div className="flex items-center gap-2 px-2">
        <Users className="w-4 h-4 text-sky-400" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Member Accounts</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {accounts.map(acc => {
          const isActive = acc.id === activeAccountId;
          return (
            <button
              key={acc.id}
              onClick={() => onSwitch(acc.id)}
              className={`flex-1 min-w-[140px] flex items-center gap-3 p-3 rounded-2xl transition-all border ${
                isActive 
                  ? 'bg-sky-500/20 border-sky-500 shadow-lg shadow-sky-500/10' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${acc.avatarColor} flex items-center justify-center text-[10px] font-black text-white`}>
                {acc.username.substring(0, 2).toUpperCase()}
              </div>
              <div className="text-left overflow-hidden">
                <p className={`text-[11px] font-bold truncate ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {acc.username}
                </p>
                <div className="flex items-center gap-1">
                   <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                   <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Active Agent</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
