
import React, { useState } from 'react';
import { Cpu, Send, Copy, Check, Sparkles, Loader2 } from 'lucide-react';
import { generateDataCode } from '../services/geminiService';

export const AIGenSection: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<{ code: string, dataAmount: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || isGenerating) return;

    setIsGenerating(true);
    const result = await generateDataCode(prompt);
    setGeneratedCode(result);
    setIsGenerating(false);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-orbitron font-bold mb-2 uppercase tracking-tighter">AI Generator Terminal</h2>
        <p className="text-slate-400">Command the LLM to synthesize high-bandwidth network vouchers.</p>
      </div>

      <div className="glass p-6 rounded-3xl border border-white/5">
        <div className="flex items-center gap-3 mb-6 p-4 bg-sky-500/5 rounded-2xl border border-sky-500/10">
          <Sparkles className="w-5 h-5 text-sky-400" />
          <p className="text-sm text-sky-200 italic">
            "Request Example: Generate a 5GB high-priority data asset for specialized tasks."
          </p>
        </div>

        <form onSubmit={handleGenerate} className="flex gap-2">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Input command sequence..."
            className="flex-1 bg-slate-900 border border-white/10 rounded-2xl p-4 focus:border-sky-500 outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={isGenerating || !prompt}
            className="bg-sky-500 p-4 rounded-2xl hover:bg-sky-600 transition-colors disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <Send className="w-6 h-6" />}
          </button>
        </form>
      </div>

      {generatedCode && (
        <div className="glass p-8 rounded-3xl border-2 border-sky-500/20 bg-sky-500/5 animate-in zoom-in-95 duration-300">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-sky-500 rounded-full shadow-lg shadow-sky-500/30">
              <Cpu className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1 uppercase tracking-widest font-orbitron">Asset Synthesized</h3>
              <p className="text-slate-400 text-sm">Allocation: {generatedCode.dataAmount} Unified Data</p>
            </div>
            
            <div className="w-full bg-slate-900 p-6 rounded-2xl border border-white/10 flex items-center justify-between group">
              <code className="text-2xl md:text-3xl font-orbitron text-sky-400 tracking-wider">
                {generatedCode.code}
              </code>
              <button 
                onClick={copyToClipboard}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                title="Copy Credential"
              >
                {copied ? <Check className="text-emerald-400" /> : <Copy className="text-slate-400" />}
              </button>
            </div>
            
            <p className="text-xs text-slate-500 italic uppercase tracking-widest">
              Navigate to 'Redemption' to finalize asset credit.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PromptCard 
          text="Synthesize 1GB high-speed node access" 
          onClick={() => setPrompt("Synthesize 1GB high-speed node access")} 
        />
        <PromptCard 
          text="Provision dedicated social media bandwidth" 
          onClick={() => setPrompt("Provision dedicated social media bandwidth")} 
        />
      </div>
    </div>
  );
};

const PromptCard = ({ text, onClick }: { text: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="glass p-4 rounded-2xl border border-white/5 text-left hover:border-sky-500/30 hover:bg-white/5 transition-all group"
  >
    <p className="text-xs font-bold text-slate-400 group-hover:text-slate-200 uppercase tracking-widest">{text}</p>
  </button>
);
