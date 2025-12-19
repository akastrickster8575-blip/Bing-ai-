
import React, { useState, useRef } from 'react';
import { Camera, CheckCircle2, Loader2, Sparkles, PlusCircle } from 'lucide-react';
import { analyzePhoto } from '../services/geminiService';

interface UploadSectionProps {
  onUploadComplete: (reward: number, feedback: string, imageUrl: string) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<{ reward: number, feedback: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!preview) return;
    setIsUploading(true);
    
    const base64Data = preview.split(',')[1];
    const response = await analyzePhoto(base64Data);
    
    setResult(response);
    onUploadComplete(response.reward, response.feedback, preview);
    setIsUploading(false);
  };

  const reset = () => {
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="text-center">
        <h2 className="text-4xl font-orbitron font-bold mb-2 text-white">Asset Submission</h2>
        <div className="flex justify-center gap-2 items-center">
          <span className="bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full text-sm font-bold border border-sky-500/30">
            Fixed Reward: ₹2.00 / Asset
          </span>
          <span className="text-slate-400 text-sm">Unlimited Submissions</span>
        </div>
      </div>

      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-4 border-dashed border-white/5 rounded-[2.5rem] h-96 flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-sky-500/40 hover:bg-sky-500/5 transition-all group bg-slate-900/50"
        >
          <div className="p-8 bg-sky-500/10 rounded-full group-hover:scale-110 transition-transform duration-500 relative">
            <div className="absolute inset-0 bg-sky-500/20 blur-xl rounded-full animate-pulse" />
            <Camera className="w-16 h-16 text-sky-400 relative z-10" />
          </div>
          <div className="text-center">
            <p className="font-bold text-2xl text-slate-200">Select Asset to Upload</p>
            <p className="text-slate-500 mt-2 italic">Support for high-resolution images</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="space-y-6 max-w-md mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl aspect-[3/4]">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white z-20">
                <Loader2 className="w-12 h-12 animate-spin text-sky-400 mb-4" />
                <p className="font-orbitron font-bold text-lg animate-pulse uppercase tracking-widest">Analyzing via Bing AI...</p>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-6">
              {!result && !isUploading && (
                <div className="w-full grid grid-cols-2 gap-3">
                  <button 
                    onClick={reset}
                    className="px-4 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold backdrop-blur-md border border-white/10 transition-all text-white"
                  >
                    Discard
                  </button>
                  <button 
                    onClick={startAnalysis}
                    className="flex items-center justify-center gap-2 px-4 py-4 bg-sky-500 hover:bg-sky-400 rounded-2xl font-bold shadow-lg shadow-sky-500/40 text-white transition-all transform active:scale-95"
                  >
                    <Sparkles className="w-5 h-5" />
                    Verify & Earn
                  </button>
                </div>
              )}
            </div>
          </div>

          {result && (
            <div className="glass p-8 rounded-[2rem] border-2 border-emerald-500/30 bg-emerald-500/5 animate-in zoom-in-95 duration-500 shadow-2xl">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-emerald-500 p-4 rounded-full shadow-lg shadow-emerald-500/40">
                  <CheckCircle2 className="text-white w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-emerald-400 mb-2">VERIFIED: +₹2.00</h4>
                  <p className="text-slate-200 text-lg leading-relaxed italic">"{result.feedback}"</p>
                </div>
                
                <button 
                  onClick={reset}
                  className="w-full mt-4 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-sky-400 uppercase text-xs tracking-[0.2em]"
                >
                  <PlusCircle className="w-5 h-5" />
                  Next Asset
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
