import React from 'react';
import { Smartphone, Sunrise, Footprints, MessageSquare, Moon, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface DailyRoutineFlowProps {
  onJoinClick: () => void;
}

const ROUTINE_STEPS = [
  {
    icon: Smartphone,
    title: 'Sabah mesajı gelir',
    sub: 'Telefonuna kısa ve net bir bildirim düşer.',
    time: '08:00',
    color: 'emerald',
  },
  {
    icon: Sunrise,
    title: 'Kısa yönlendirmeyi uygularsın',
    sub: 'Arınma suyunu ve günün tavsiyesini uygularsın.',
    time: '08:30',
    color: 'amber',
  },
  {
    icon: Footprints,
    title: '15 dk hareketi yaparsın',
    sub: 'Oturma odanda, pijamanla bile hafif esneme.',
    time: 'Gün İçi',
    color: 'teal',
  },
  {
    icon: MessageSquare,
    title: 'Gruba "Yaptım!" yazarsın',
    sub: 'Binlerce katılımcıyla motivasyonunu paylaşırsın.',
    time: 'Anında',
    color: 'emerald',
  },
  {
    icon: Moon,
    title: 'Akşam yayınını dinlersin',
    sub: 'Hekimler ve uzmanlarla canlı Zoom seansı.',
    time: '21:00',
    color: 'indigo',
  },
  {
    icon: Sparkles,
    title: 'Hafifçe uyursun',
    sub: 'Kafan sakin, bedenin dinlenmiş şekilde derin uyku.',
    time: 'Gece',
    color: 'violet',
  },
];

export const DailyRoutineFlow: React.FC<DailyRoutineFlowProps> = ({ onJoinClick }) => {
  return (
    <section className="py-12 md:py-16 bg-[#F4F7F5] border-b border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-900 mb-2.5">
              <Heart className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700" />
              <span>Hayatını Durdurma — Hayatının İçine Al</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight font-display uppercase">
              ✨ Karmaşık Değil, Seninle Birlikte
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-medium mt-2.5 max-w-xl mx-auto">
              Çocukların var, işin var, evin var. Biliyoruz. O yüzden her adım o kadar basit ki telefona bakman yeterli:
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {ROUTINE_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={80 + idx * 50}>
                <div className="h-full p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs hover:border-emerald-400 hover:shadow-xs transition-all flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black flex items-center justify-center border border-emerald-200">
                        {idx + 1}
                      </span>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        {step.time}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-emerald-700 mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 font-display leading-snug mb-1">
                      {step.title}
                    </h3>

                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      {step.sub}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Conclusion summary box */}
        <ScrollReveal direction="up" delay={250}>
          <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-white border border-emerald-300 shadow-soft text-center">
            <p className="text-sm sm:text-base font-bold text-emerald-950 mb-3">
              Hepsi bu kadar. 7 günlük detoks tanıtım programı. Evinden çıkmadan, adım adım.
            </p>
            <button
              onClick={onJoinClick}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3 text-xs sm:text-sm font-black text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-full transition-all duration-200 shadow-cta active:scale-95 cursor-pointer"
            >
              <span className="tracking-wide uppercase font-display">DETOKS TANITIMINA KATIL</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
