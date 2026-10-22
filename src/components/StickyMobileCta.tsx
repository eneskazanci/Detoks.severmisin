import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface StickyMobileCtaProps {
  onJoinClick: () => void;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({ onJoinClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once scrolled past 140px
      if (window.scrollY > 140) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-white/95 border-t border-neutral-200/90 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex-1 min-w-0 text-left">
          <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-tight truncate">
            7 Günlük Detoks Başlıyor
          </div>
          <div className="text-xs text-neutral-800 font-bold truncate">
            Ücretsiz WhatsApp Grubu
          </div>
        </div>

        <button
          onClick={onJoinClick}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-full shadow-cta active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white text-white" />
          <span className="font-display tracking-tight uppercase">Gruba Katıl</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
