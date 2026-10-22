import React from 'react';
import { Zap, Waves, Cookie, Moon, Sparkles, HeartPulse, Lightbulb } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useSiteContent, DEFAULT_SYMPTOMS } from '../context/ContentContext';

interface ParticipantFeedbackProps {
  onJoinClick: () => void;
}

const SYMPTOM_ICONS = [Zap, Waves, Cookie, Moon, HeartPulse, Sparkles];
const SYMPTOM_COLORS = [
  { text: 'text-amber-500', bg: 'bg-amber-50 border-amber-200/80' },
  { text: 'text-teal-600', bg: 'bg-teal-50 border-teal-200/80' },
  { text: 'text-rose-500', bg: 'bg-rose-50 border-rose-200/80' },
  { text: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200/80' },
  { text: 'text-red-500', bg: 'bg-red-50 border-red-200/80' },
  { text: 'text-purple-600', bg: 'bg-purple-50 border-purple-200/80' },
];

export const ParticipantFeedback: React.FC<ParticipantFeedbackProps> = ({ onJoinClick }) => {
  const { content } = useSiteContent();
  const symptoms = content.symptoms && content.symptoms.length > 0 ? content.symptoms : DEFAULT_SYMPTOMS;

  return (
    <section className="py-12 md:py-20 bg-white border-b border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-900 mb-2.5">
              <span>Kendini Dinle</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight font-display uppercase">
              Bedeninin Arınmaya İhtiyacı Olduğunu Nasıl Anlarsın?
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-medium mt-2 max-w-2xl mx-auto">
              Günlük telaş, stres ve yanlış beslenmeyle karaciğer ve bağırsaklar yorulur. Bu belirtilerden biri bile sende varsa, bedenin dinlenmek istiyordur:
            </p>
          </div>
        </ScrollReveal>

        {/* Dynamic Symptoms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {symptoms.map((text: string, idx: number) => {
            const Icon = SYMPTOM_ICONS[idx % SYMPTOM_ICONS.length];
            const styling = SYMPTOM_COLORS[idx % SYMPTOM_COLORS.length];
            return (
              <ScrollReveal key={idx} direction="up" delay={70 + idx * 50}>
                <div className={`p-4 sm:p-5 rounded-2xl border ${styling.bg} shadow-2xs hover:shadow-md transition-all flex items-center gap-3.5 text-left`}>
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-xs">
                    <Icon className={`w-5 h-5 ${styling.text}`} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-snug">
                    {text}
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Big Explanation Card with Lightbulb */}
        <ScrollReveal direction="up" delay={250}>
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-lime-50 border border-emerald-200/90 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-5 text-left">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-neutral-900 font-display mb-1">
                  💡 Detoks; bedenin "yeniden başlat" tuşuna basmaktır.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                  Karaciğer ve bağırsakların yükünü hafifleterek enerjini ve hafifliğini geri kazanmanı sağlar.
                </p>
              </div>
            </div>

            <button
              onClick={onJoinClick}
              className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black transition-all shadow-cta active:scale-95 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>DETOKS TANITIMINA KATIL →</span>
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
