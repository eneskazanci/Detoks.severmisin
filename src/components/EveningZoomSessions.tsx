import React from 'react';
import { Gift, Video, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useSiteContent, DEFAULT_EVENING_SESSIONS } from '../context/ContentContext';

interface EveningZoomSessionsProps {
  onJoinClick: () => void;
}

export const EveningZoomSessions: React.FC<EveningZoomSessionsProps> = ({ onJoinClick }) => {
  const { content } = useSiteContent();
  const sessions = content.eveningSessions && content.eveningSessions.length > 0 ? content.eveningSessions : DEFAULT_EVENING_SESSIONS;

  return (
    <section className="py-12 md:py-20 bg-[#F8FAF8] border-b border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-xs font-bold text-rose-900 mb-2.5">
              <Gift className="w-3.5 h-3.5 text-rose-600" />
              <span>Her Akşam Hediye</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight font-display uppercase">
              Canlı Zoom Seansları 🎁
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-medium mt-2 max-w-2xl mx-auto">
              1. Seviye Detoks boyunca beslenmeyle birlikte ruhunu, zihnini ve bedenini hediye atölyelerimizle destekliyoruz:
            </p>
          </div>
        </ScrollReveal>

        {/* Dynamic 8 Sessions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
          {sessions.map((item: any, idx: number) => (
            <ScrollReveal key={item.id || idx} direction="up" delay={60 + idx * 45}>
              <div className="h-full p-4 sm:p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-soft hover:border-emerald-400 hover:shadow-md transition-all text-left flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Hediye Seans
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 font-display mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs font-bold text-emerald-700">
                    {item.instructor}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-semibold">
                  <span>Zoom Canlı</span>
                  <span className="text-emerald-700 font-bold">Ücretsiz Katılım</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Banner with CTA */}
        <ScrollReveal direction="up" delay={250}>
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                <Video className="w-4 h-4" />
                <span>Akşam Canlı Yayınları Seni Bekliyor</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black font-display tracking-tight text-white">
                Çayını Al, Ekrana Bak, Sadece Dinle ☕
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl mt-1">
                Tüm atölyeler ve uzman danışmanlıkları program boyunca ücretsizdir. Biriken zihinsel yükü atıp derin bir uykuya hazırlanın.
              </p>
            </div>

            <button
              onClick={onJoinClick}
              className="px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-black transition-all shadow-cta active:scale-95 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <span>WHATSAPP GRUBUNA KATIL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
