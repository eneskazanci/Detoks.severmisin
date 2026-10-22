import React from 'react';
import { MessageCircle, Bell, Video, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface SimpleSystemProps {
  onJoinClick: () => void;
}

const STEPS = [
  {
    num: '01',
    title: 'WhatsApp Grubuna Katıl',
    desc: 'Aşağıdaki butona tıkla, gruba dahil ol. 30 saniye içinde içeridesin.',
    icon: MessageCircle,
    color: 'emerald',
  },
  {
    num: '02',
    title: 'Sabah Mesajını Bekle',
    desc: 'Her sabah telefonuna kısa ve net bir yönlendirme gelir. Okursun, uygularsın, biter.',
    icon: Bell,
    color: 'amber',
  },
  {
    num: '03',
    title: 'Akşam Yayınına Bağlan',
    desc: 'Hekimlerimizle her akşam kısa bir Zoom buluşması. Çayını al, rahat otur — sadece dinle.',
    icon: Video,
    color: 'indigo',
  },
  {
    num: '04',
    title: '7. Günü Farklı Hissederek Bitir',
    desc: 'Bedenin daha hafif, uykunun daha derin, enerjin daha yüksek. Bunu yaşayan binlerce kadın var.',
    icon: Sparkles,
    color: 'teal',
  },
];

export const SimpleSystem: React.FC<SimpleSystemProps> = ({ onJoinClick }) => {
  return (
    <section id="sistem" className="py-12 md:py-20 bg-[#F4F7F5] border-b border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-900 mb-2.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Sadece 1 Tıklama Yeterli</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight font-display uppercase">
              Başlamak İçin Tek Bir Adım Var 👇
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-medium mt-2 max-w-xl mx-auto">
              Karmaşık işlemler yok, uzun formlar yok. 4 adımda 7 günlük arınma yolculuğuna hemen katıl:
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Steps Horizontal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={70 + idx * 60}>
                <div className="h-full p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-soft hover:border-emerald-400 hover:shadow-md transition-all text-left flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display text-2xl font-black text-emerald-700">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center text-emerald-700">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-neutral-900 font-display mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-bold">
                    <span>Adım {step.num}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA Card */}
        <ScrollReveal direction="up" delay={250}>
          <div className="text-center">
            <button
              onClick={onJoinClick}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-black text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-full transition-all duration-200 shadow-cta active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
              <span className="tracking-wide uppercase font-display">GRUBA KATIL — YERİNİ AYIRT →</span>
            </button>
            <p className="text-xs text-neutral-500 font-bold mt-2.5">
              Kontenjan sınırlı. Yerine bugün sahip çık.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
