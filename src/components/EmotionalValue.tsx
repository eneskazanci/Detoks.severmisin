import React from 'react';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface EmotionalValueProps {
  onJoinClick: () => void;
}

export const EmotionalValue: React.FC<EmotionalValueProps> = ({ onJoinClick }) => {
  return (
    <section className="py-14 md:py-20 relative overflow-hidden bg-live-gradient-dark text-white">
      {/* Living Gradient Orbs */}
      <div className="absolute top-0 right-10 w-[500px] h-[350px] bg-gradient-to-r from-lime-400/15 via-emerald-400/20 to-teal-400/15 rounded-full blur-3xl pointer-events-none orb-float-1" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[350px] bg-gradient-to-r from-emerald-500/15 via-teal-400/15 to-lime-300/10 rounded-full blur-3xl pointer-events-none orb-float-2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <ScrollReveal direction="up" delay={50}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-emerald-200 mb-4 backdrop-blur-sm whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>Yeni Dönem Başvuruları Açıldı</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12] font-display uppercase mb-4 text-balance">
            Önümüzdeki 7 Günü Kendine Ayır 🌿
          </h2>

          {/* Copy */}
          <p className="text-base sm:text-lg md:text-xl text-emerald-50 font-medium leading-relaxed max-w-2xl mx-auto mb-3 text-balance">
            Aç kalmadan, yalnız kalmadan ve evinden çıkmadan bedeninin "yeniden başlat" tuşuna bas.
          </p>

          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl mx-auto mb-8 leading-relaxed">
            Yeni dönem kontenjanları dolmadan WhatsApp grubundaki yerini al.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center">
            <button
              onClick={onJoinClick}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-black text-neutral-950 bg-gradient-to-r from-lime-300 via-emerald-300 to-lime-200 rounded-full hover:from-lime-200 hover:to-white transition-all duration-200 shadow-xl active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-neutral-950 text-neutral-950 group-hover:scale-110 transition-transform" />
              <span className="font-display tracking-wider uppercase">WHATSAPP İLE ARAMIZA KATIL →</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-xs text-emerald-200/90 mt-3 font-bold">
              Yeni dönem grubu açılmıştır • Kontenjanla sınırlıdır
            </p>
          </div>

        </ScrollReveal>
      </div>
    </section>
  );
};
