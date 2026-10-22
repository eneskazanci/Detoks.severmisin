import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onJoinClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onJoinClick }) => {

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/10 bg-white/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark in Montserrat */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-neutral-900 hover:text-emerald-700 transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="font-display uppercase tracking-tight text-neutral-900">
            ONLINE DETOKS
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-neutral-600">
          <a href="#sistem" className="hover:text-emerald-600 transition-colors">Nasıl Çalışır?</a>
          <a href="#doktorlar" className="hover:text-emerald-600 transition-colors">Doktorlarımız</a>
          <a href="#sss" className="hover:text-emerald-600 transition-colors">Sıkça Sorulanlar</a>
        </nav>

        {/* Zone 3: Actions (WhatsApp Join) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Primary CTA */}
          <button
            onClick={onJoinClick}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-full transition-all duration-200 shadow-md shadow-emerald-600/20 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-white" />
            <span>Gruba Katıl</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline-block" />
          </button>
        </div>
      </div>
    </header>
  );
};
