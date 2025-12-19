
import React, { useState } from 'react';
import { Ticket, Loader2, Gift, Info } from 'lucide-react';

interface RedeemSectionProps {
  onRedeemSuccess: (amount: string) => void;
}

export const RedeemSection: React.FC<RedeemSectionProps> = ({ onRedeemSuccess }) => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    setIsVerifying(true);
    setError(null);
    setSuccess(null);

    await new Promise(r => setTimeout(r, 1500));

    if (code.length >= 8) {
      const mockAmount = "2GB";
      setSuccess(`Authentication successful! ${mockAmount} data allocation has been provisioned.`);
      onRedeemSuccess(mockAmount);
      setCode('');
    } else {
      setError("Authentication failed. Ensure the code follows the Bing AI generation standard.");
    }
    
    setIsVerifying(false);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold mb-2 uppercase tracking-wider">Voucher Redemption</h2>
        <p className="text-slate-400">Authenticate AI-generated network vouchers for instant data provisioning.</p>
      </div>

      <div className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-sky-500/10 blur-3xl rounded-full" />
        
        <form onSubmit={handleRedeem} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              Redemption Voucher Code
            </label>
            <input 
              type="text" 
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="FORMAT: BING-XXXX-XXXX"
              className="w-full bg-slate-900 border border-white/10 rounded-2xl p-5 text-xl font-orbitron tracking-widest focus:border-sky-500 outline-none transition-all placeholder:text-slate-800"
            />
          </div>

          <button 
            type="submit"
            disabled={isVerifying || !code}
            className="w-full py-5 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-2xl font-bold text-lg shadow-xl shadow-sky-500/20 disabled:opacity-50 flex justify-center items-center gap-3 transition-transform active:scale-95 uppercase tracking-widest font-orbitron"
          >
            {isVerifying ? <Loader2 className="animate-spin" /> : <Gift className="w-6 h-6" />}
            {isVerifying ? 'Verifying Credentials...' : 'Redeem Assets'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 animate-in fade-in duration-300">
            <Info className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-6 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-4 animate-in zoom-in-95 duration-300">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-emerald-400">Transaction Confirmed</p>
              <p className="text-sm text-slate-300">{success}</p>
            </div>
          </div>
        )}
      </div>

      <div className="glass p-6 rounded-2xl border border-white/5 bg-white/5">
        <h4 className="font-bold text-slate-300 mb-2 flex items-center gap-2 uppercase text-xs tracking-widest">
          <Info className="w-4 h-4 text-sky-400" />
          Acquisition Protocol
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          1. Navigate to the AI Generator terminal.<br/>
          2. Interface with the Bing LLM to generate unique network assets.<br/>
          3. Input the resultant alphanumeric string here for wallet settlement.
        </p>
      </div>
    </div>
  );
};
