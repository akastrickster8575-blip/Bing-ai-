
import React, { useState, useEffect } from 'react';
import { UserStats, HistoryItem } from '../types';
import { 
  TrendingUp, 
  HardDrive, 
  Image as ImageIcon,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Zap,
  Wallet,
  ArrowRight,
  ShieldCheck,
  X,
  CreditCard,
  CheckCircle2,
  Loader2,
  Smartphone,
  Heart,
  Sparkles,
  Info,
  Target
} from 'lucide-react';

interface DashboardProps {
  stats: UserStats;
  history: HistoryItem[];
  onStartUpload: () => void;
  onWithdraw: (amount: number, method: string) => boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, history, onStartUpload, onWithdraw }) => {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [isCounterAnimating, setIsCounterAnimating] = useState(false);

  // Trigger a brief animation effect when balance increases
  useEffect(() => {
    setIsCounterAnimating(true);
    const timeout = setTimeout(() => setIsCounterAnimating(false), 500);
    return () => clearTimeout(timeout);
  }, [stats.balance]);

  // Daily target logic: 5-10 likes per photo = ₹10 - ₹20 per photo.
  // With 5 photos, potential is ₹50 - ₹100 daily.
  const minDailyYield = stats.photosUploaded * 10;
  const maxDailyYield = stats.photosUploaded * 20;
  const isTargetMet = stats.photosUploaded >= 5;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Hero Monetization Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sky-600 to-indigo-900 p-8 text-white shadow-2xl border border-white/20">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ImageIcon size={180} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] mb-4 border border-white/10 uppercase">
            <Sparkles className="w-3 h-3 text-yellow-400" /> Bing AI Revenue Stream
          </div>
          <h2 className="text-4xl font-orbitron font-black mb-2 leading-tight">
            High-Engagement<br/>Yield Terminal
          </h2>
          
          <div className="grid grid-cols-2 gap-3 mb-8 max-w-sm">
            <div className="bg-black/20 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 flex flex-col gap-1">
              <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest">Base Payout</span>
              <span className="text-sm font-black font-orbitron text-white">₹2.00 / Upload</span>
            </div>
            <div className="bg-black/20 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 flex flex-col gap-1">
              <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Like Payout</span>
              <span className="text-sm font-black font-orbitron text-white">₹2.00 / Like</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <div className={`p-6 rounded-3xl border transition-all ${isTargetMet ? 'bg-emerald-500/20 border-emerald-500/40 shadow-lg shadow-emerald-500/10' : 'bg-white/5 border-white/10'}`}>
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                        <Target className={`w-5 h-5 ${isTargetMet ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <p className="text-xs font-black uppercase tracking-widest">Daily Like Goal: <span className="text-white">5-10 Likes/Photo</span></p>
                    </div>
                    {isTargetMet && <span className="text-[10px] font-black bg-emerald-500 px-2 py-0.5 rounded text-white animate-bounce">OPTIMIZED</span>}
                </div>
                <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-1000 ${isTargetMet ? 'bg-emerald-400' : 'bg-sky-500'}`} 
                        style={{ width: `${Math.min(100, (stats.photosUploaded / 5) * 100)}%` }}
                    />
                </div>
                <p className="text-[10px] mt-3 font-bold text-slate-400 uppercase tracking-tighter">
                    {stats.photosUploaded} Photos • Daily Yield Potential: <span className={isTargetMet ? 'text-emerald-400' : 'text-sky-400'}>₹{minDailyYield} - ₹{maxDailyYield}</span>
                </p>
            </div>
          </div>

          <button 
            onClick={onStartUpload}
            className="group flex items-center gap-3 bg-white text-sky-600 px-8 py-4 rounded-2xl font-black font-orbitron hover:bg-sky-50 transition-all shadow-xl shadow-sky-900/40 transform active:scale-95"
          >
            {stats.photosUploaded < 5 ? 'REACH 5 PHOTOS FOR MAX YIELD' : 'UPLOAD MORE ASSETS'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Wallet Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-[2rem] border border-sky-500/20 flex flex-col justify-between h-64 relative overflow-hidden group shadow-2xl">
          <div className="absolute -right-8 -bottom-8 bg-sky-500/10 w-40 h-40 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-all duration-700" />
          <div>
            <div className="flex justify-between items-start">
              <div className="bg-sky-500/20 p-3 rounded-2xl">
                <Wallet className="w-6 h-6 text-sky-400" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 uppercase animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live Revenue
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-4 font-medium uppercase tracking-widest">Total Wallet Balance</p>
            <h3 className={`text-5xl font-orbitron font-black text-white mt-1 transition-all duration-300 ${isCounterAnimating ? 'scale-105 text-emerald-400' : 'scale-100'}`}>
              ₹{stats.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <button 
            onClick={() => setShowWithdraw(true)}
            className="w-full py-4 bg-sky-500 hover:bg-sky-400 rounded-2xl font-bold text-sm shadow-lg shadow-sky-500/30 transition-all relative z-10 uppercase tracking-widest"
          >
            Withdraw Now
          </button>
        </div>

        <div className="space-y-4">
            <div className="glass p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-sky-500/30 transition-all">
                <div className="flex items-center gap-4">
                    <div className="bg-sky-500/10 p-3 rounded-2xl group-hover:bg-sky-500/20 transition-colors">
                        <ImageIcon className="text-sky-400 w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Base Income</p>
                        <p className="text-xl font-bold text-white">₹{(stats.photosUploaded * 2).toFixed(2)}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-600 uppercase font-bold">Assets</p>
                    <p className="text-sm font-bold text-slate-400">{stats.photosUploaded}</p>
                </div>
            </div>

            <div className="glass p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-red-500/30 transition-all">
                <div className="flex items-center gap-4">
                    <div className="bg-red-500/10 p-3 rounded-2xl group-hover:bg-red-500/20 transition-colors">
                        <Heart className="text-red-400 w-6 h-6 fill-red-400/20" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Like Earnings (₹2/Like)</p>
                        <p className="text-xl font-bold text-white">₹{stats.totalLikeEarnings.toFixed(2)}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-600 uppercase font-bold">Total Likes</p>
                    <p className="text-sm font-bold text-slate-400">{stats.totalLikes}</p>
                </div>
            </div>
        </div>
      </div>

      {/* Payment Partners */}
      <div className="glass p-6 rounded-[2rem] border border-white/5 bg-white/5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Smartphone className="w-5 h-5 text-slate-400" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Partner Settlement Channels</p>
        </div>
        <div className="flex gap-4 items-center opacity-60 grayscale hover:grayscale-0 transition-all">
          <span className="text-[10px] font-black font-orbitron text-sky-400 border border-sky-400/30 px-2 py-1 rounded">PAYTM</span>
          <span className="text-[10px] font-black font-orbitron text-purple-400 border border-purple-400/30 px-2 py-1 rounded">PHONEPE</span>
          <span className="text-[10px] font-black font-orbitron text-blue-400 border border-blue-400/30 px-2 py-1 rounded">GPAY</span>
        </div>
      </div>

      {/* Ledger */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-slate-400" />
          <h3 className="text-xl font-bold font-orbitron text-white">Account Ledger</h3>
        </div>
        <div className="space-y-4">
          {history.length === 0 ? (
            <p className="text-center text-slate-500 py-10 italic">Ledger empty. Start uploading to generate records.</p>
          ) : (
            history.map((item) => (
              <div key={item.id} className="glass p-5 rounded-3xl flex justify-between items-center border border-white/5 hover:border-sky-500/10 transition-all">
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-2xl ${
                    item.type === 'upload' ? 'bg-emerald-500/10' : 
                    item.type === 'withdraw' ? 'bg-red-500/10' : 'bg-sky-500/10'
                  }`}>
                    {item.type === 'upload' ? <ArrowUpRight className="text-emerald-400 w-6 h-6" /> : 
                     item.type === 'withdraw' ? <ArrowDownLeft className="text-red-400 w-6 h-6" /> : 
                     <ArrowDownLeft className="text-sky-400 w-6 h-6" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-100 uppercase text-[10px] tracking-wider">
                      {item.type === 'upload' ? 'Asset Credit' : 
                       item.type === 'withdraw' ? `Settlement: ${item.method}` : 'Bandwidth Redemption'}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {new Date(item.timestamp).toLocaleDateString()} • {item.status.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg font-orbitron ${
                    item.type === 'upload' ? 'text-emerald-400' : 
                    item.type === 'withdraw' ? 'text-red-400' : 'text-sky-400'
                  }`}>
                    {item.type === 'upload' ? '+' : '-'}{item.amount.toFixed(2)}{item.unit}
                  </p>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Withdrawal Portal */}
      {showWithdraw && (
        <WithdrawModal 
          balance={stats.balance} 
          onClose={() => setShowWithdraw(false)} 
          onConfirm={(amount, method) => {
            const success = onWithdraw(amount, method);
            if (success) setShowWithdraw(false);
            return success;
          }}
        />
      )}
    </div>
  );
};

const WithdrawModal = ({ balance, onClose, onConfirm }: { balance: number, onClose: () => void, onConfirm: (a: number, m: string) => boolean }) => {
  const [method, setMethod] = useState('Paytm');
  const [amount, setAmount] = useState(balance);
  const [upi, setUpi] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const paymentOptions = [
    { id: 'Paytm', label: 'PAYTM', color: 'bg-[#00BAF2]', text: 'text-white' },
    { id: 'PhonePe', label: 'PHONEPE', color: 'bg-[#5f259f]', text: 'text-white' },
    { id: 'Google Pay', label: 'GPAY', color: 'bg-[#4285F4]', text: 'text-white' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 10) {
      alert("Minimum withdrawal limit: ₹10.00");
      return;
    }
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    const success = onConfirm(amount, method);
    if (success) {
      setDone(true);
      setTimeout(onClose, 2000);
    }
    setIsProcessing(false);
  };

  if (done) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in zoom-in duration-300">
        <div className="glass p-12 rounded-[3rem] text-center max-w-sm w-full border-2 border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          <div className="bg-emerald-500 p-6 rounded-full w-fit mx-auto mb-6 shadow-2xl shadow-emerald-500/40">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl font-orbitron font-black text-white mb-2 uppercase tracking-tighter">Verified!</h3>
          <p className="text-slate-400 leading-relaxed text-sm">Settlement initiated. Expected credit to {method} in 2-4 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="glass w-full max-w-md rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">Settlement Request</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {paymentOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setMethod(opt.id)}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${
                  method === opt.id 
                    ? `${opt.color} border-transparent ${opt.text} shadow-lg scale-105` 
                    : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${method === opt.id ? 'bg-white/20' : 'bg-slate-800'}`}>
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-black tracking-widest">{opt.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">UPI ID or Phone Number</label>
            <div className="relative">
              <input 
                required
                type="text" 
                placeholder="Verified payment handle"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-white focus:border-sky-500 outline-none transition-all font-mono text-sm"
              />
              <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex justify-between">
              Liquidation Amount
              <span className="text-sky-400">Balance: ₹{balance.toFixed(2)}</span>
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-orbitron text-slate-500">₹</span>
              <input 
                required
                type="number" 
                max={balance}
                min={10}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 pl-12 text-2xl font-orbitron text-white focus:border-sky-500 outline-none transition-all"
              />
            </div>
          </div>

          <button 
            disabled={isProcessing || balance < 10}
            className="w-full py-5 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-[1.5rem] font-black font-orbitron text-lg shadow-xl shadow-sky-500/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : <ShieldCheck className="w-6 h-6" />}
            {isProcessing ? 'PROCESSING...' : `CONFIRM PAYOUT`}
          </button>
          
          <p className="text-[9px] text-center text-slate-600 leading-relaxed uppercase tracking-[0.2em]">
            Bing Secure Protocol v3.0 • Verified Encrypted Session
          </p>
        </form>
      </div>
    </div>
  );
};
