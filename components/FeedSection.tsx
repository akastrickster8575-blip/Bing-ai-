
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PhotoEntry } from '../types';
import { Heart, MessageCircle, Share2, Eye, Calendar, Sparkles, Loader2, Trash2 } from 'lucide-react';

interface FeedSectionProps {
  photos: PhotoEntry[];
  onDeletePhoto: (id: string) => void;
}

export const FeedSection: React.FC<FeedSectionProps> = ({ photos, onDeletePhoto }) => {
  const [displayCount, setDisplayCount] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const visiblePhotos = photos.slice(0, displayCount);
  const hasMore = displayCount < photos.length;

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setDisplayCount(prev => prev + 4);
        setIsLoadingMore(false);
      }, 1500);
    }
  }, [hasMore, isLoadingMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { root: null, threshold: 0 });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => { if (loaderRef.current) observer.unobserve(loaderRef.current); };
  }, [handleObserver]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-32">
      <div className="text-center">
        <h2 className="text-4xl font-orbitron font-black mb-2 text-white uppercase tracking-tighter">Global Asset Feed</h2>
        <p className="text-slate-400">Your uploaded assets are live. Each like earns you ₹2.00 instantly.</p>
      </div>

      {photos.length === 0 ? (
        <div className="glass p-20 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center gap-4 opacity-50 text-center">
          <Sparkles className="w-12 h-12 text-sky-400" />
          <p className="text-xl font-bold text-slate-300 uppercase tracking-widest">No active assets</p>
          <p className="text-sm text-slate-500">Upload a photo to start earning from community engagement.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visiblePhotos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="glass rounded-[2.5rem] overflow-hidden border border-white/10 group hover:border-sky-500/30 transition-all duration-500 shadow-xl animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${(index % 4) * 100}ms` }}
            >
              <div className="relative aspect-square overflow-hidden bg-slate-900">
                <img 
                  src={photo.url} 
                  alt="Asset Preview" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  loading="lazy"
                />
                
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                    <div className="bg-sky-500 text-white px-3 py-1 rounded-full text-[10px] font-bold font-orbitron shadow-lg border border-white/20 pointer-events-auto">
                      LIVE EARNINGS: ₹{(photo.likes * 2).toFixed(2)}
                    </div>
                    <button 
                      onClick={() => onDeletePhoto(photo.id)}
                      className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-xl border border-white/20 shadow-lg pointer-events-auto transition-all transform active:scale-90"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                   <div className="space-y-1">
                     <p className="text-sky-400 text-[10px] font-bold uppercase tracking-widest">Verification Status:</p>
                     <p className="text-white text-sm font-medium leading-relaxed italic">"{photo.feedback}"</p>
                   </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <InteractionItem icon={<Heart className="w-5 h-5 fill-current" />} count={photo.likes} color="text-red-400" />
                    <InteractionItem icon={<MessageCircle className="w-5 h-5" />} count={photo.comments} color="text-sky-400" />
                    <InteractionItem icon={<Share2 className="w-5 h-5" />} count={photo.shares} color="text-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-tight">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {photo.views.toLocaleString()} Active
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                     <Calendar className="w-3 h-3" />
                     {new Date(photo.timestamp).toLocaleDateString()}
                   </div>
                   <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-xl text-[10px] font-black font-orbitron border border-emerald-500/20 flex items-center gap-2">
                     +₹{(photo.likes * 2 + 2).toFixed(2)} TOTAL
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div ref={loaderRef} className="py-12 flex flex-col items-center justify-center gap-4">
        {isLoadingMore ? (
          <>
            <Loader2 className="w-10 h-10 text-sky-500 animate-spin" />
            <p className="text-sm font-orbitron font-bold text-sky-400 animate-pulse uppercase tracking-[0.2em]">Updating social metrics...</p>
          </>
        ) : photos.length > 0 && !hasMore && (
          <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-30">All active assets loaded</p>
        )}
      </div>
    </div>
  );
};

const InteractionItem = ({ icon, count, color }: { icon: React.ReactNode, count: number, color: string }) => (
  <div className={`flex items-center gap-1.5 font-bold text-sm transition-transform hover:scale-110 cursor-pointer ${color}`}>
    {icon}
    <span className="font-orbitron">{count > 999 ? (count/1000).toFixed(1) + 'K' : count}</span>
  </div>
);
