import React, { useState } from 'react';
import { ChevronDown, AlertCircle, HelpCircle } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import { ScrollReveal } from './ScrollReveal';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { content } = useSiteContent();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="sss" className="py-8 md:py-12 bg-[#F8FAF8] border-b border-neutral-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-emerald-700 uppercase mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Merak Ettikleriniz</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight font-display uppercase">
              Aklına Takılanlar 🤔
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm mt-0.5">
              Program hakkında en çok merak edilen sorular ve net yanıtlar:
            </p>
          </div>
        </ScrollReveal>

        {/* Short Accordion with Scroll Stagger */}
        <div className="space-y-2.5">
          {content.faq.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={item.id} direction="up" delay={70 + idx * 50}>
                <div className="rounded-xl bg-white border border-neutral-200/90 overflow-hidden shadow-2xs transition-all duration-200">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-neutral-50/80 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight font-display">
                      {item.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-3.5 pb-4 sm:px-4 sm:pb-4 text-neutral-700 text-xs sm:text-sm leading-relaxed border-t border-neutral-100 pt-2.5">
                      {item.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Mandatory Disclaimer */}
        <ScrollReveal direction="up" delay={300}>
          <div className="mt-6 p-3 sm:p-4 rounded-xl bg-white border border-amber-200/80 flex items-start gap-2.5 text-neutral-700 shadow-2xs">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-neutral-600">
              <strong className="text-neutral-900 font-semibold">Önemli Bilgilendirme: </strong>
              Bu program genel bilgilendirme ve yaşam tarzı desteği amacı taşır; tıbbi tedavi veya kişiye özel sağlık danışmanlığının yerine geçmez.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
