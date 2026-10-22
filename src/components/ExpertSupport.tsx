import React from 'react';
import { 
  ShieldCheck, Sparkles, Quote, MessageCircle, ArrowRight,
  HeartHandshake, Salad, Move, Microscope, Brain, Flower2
} from 'lucide-react';
import { DoctorPortrait } from './DoctorPortrait';
import { useSiteContent } from '../context/ContentContext';
import { ScrollReveal } from './ScrollReveal';

interface ExpertSupportProps {
  onJoinClick: () => void;
}

const SUPPORT_STAFF = [
  { role: '👩‍⚕️ Hemşireler', desc: 'Süreç takibi & anlık destek' },
  { role: '🥗 Diyetisyenler', desc: 'Beslenme & menü dengesi' },
  { role: '🤸 Fizyoterapistler', desc: 'Evde 15 dk hafif hareket' },
  { role: '🔬 Gıda Mühendisleri', desc: 'Doğal & güvenli gıda bilinci' },
  { role: '🧘 Zihinsel Destek Koçları', desc: 'Farkındalık & motivasyon' },
  { role: '🌸 Deneyimli Mezun Mentörler', desc: 'Topluluk dayanışması' },
];

export const ExpertSupport: React.FC<ExpertSupportProps> = ({ onJoinClick }) => {
  const { content } = useSiteContent();
  const doctors = content.doctors;

  return (
    <section id="doktorlar" className="py-12 md:py-20 bg-white border-b border-neutral-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-900 mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Gönüllü Hekim & Danışma Heyeti</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight font-display uppercase">
              Güçlü Bir Sağlık Kadrosu Yanında 🌿
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-medium mt-2 max-w-2xl mx-auto">
              4 yıldır binlerce kadının hayatına dokunan gönüllü hekim ve danışma heyetimiz:
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Leaders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {doctors.map((doctor, index) => (
            <ScrollReveal key={doctor.id} direction="up" delay={70 + index * 60}>
              <div className="group flex flex-col rounded-3xl bg-[#FAFBF9] border border-neutral-200/90 overflow-hidden shadow-soft hover:shadow-md hover:border-emerald-300 transition-all text-left h-full">
                
                {/* Photo container */}
                <div className="p-3 pb-0">
                  <DoctorPortrait
                    doctor={doctor}
                    className="w-full aspect-[1/1] rounded-2xl shadow-xs"
                    showUploadTrigger={false}
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block">
                        {doctor.title}
                      </span>
                      <span className="text-emerald-600 font-bold text-xs">✓</span>
                    </div>

                    <h3 className="text-lg font-black text-neutral-900 font-display tracking-tight leading-snug">
                      {doctor.name}
                    </h3>

                    <p className="text-xs font-semibold text-neutral-600 mt-0.5">
                      {doctor.specialty}
                    </p>

                    <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-100/70 text-[10px] font-bold text-emerald-950">
                      <Sparkles className="w-3 h-3 text-emerald-700" />
                      <span>{doctor.experience}</span>
                    </div>

                    {/* Quote */}
                    <div className="mt-3 p-2.5 rounded-xl bg-white border border-neutral-200/80 text-neutral-700 text-xs italic leading-relaxed flex items-start gap-2 shadow-2xs">
                      <Quote className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>“{doctor.quote}”</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="mt-4 pt-3 border-t border-neutral-200/70 flex flex-wrap gap-1">
                    {doctor.badges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-700"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 45 Kişilik Uzman Destek Kadrosu Rozetleri */}
        <ScrollReveal direction="up" delay={250}>
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F7F5] border border-emerald-200/80 shadow-soft">
            <div className="text-center mb-6">
              <span className="text-xs font-black text-emerald-800 uppercase tracking-widest block mb-1">
                45 KİŞİLİK YÖNETİM & DANIŞMA HEYETİ
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-neutral-900 font-display">
                Program Boyunca Her Alanda Destek Seninle
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {SUPPORT_STAFF.map((staff, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex flex-col items-center text-center"
                >
                  <span className="text-sm font-black text-neutral-900 font-display leading-tight mb-1">
                    {staff.role}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium">
                    {staff.desc}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-emerald-200/60 text-center sm:text-left">
              <p className="text-xs text-neutral-600 font-medium">
                Dr. Abdullah Kesgin, Uzm. Dr. Eyyüb Yılmaz ve tüm danışma heyetimiz WhatsApp grubunda sizi bekliyor.
              </p>
              <button
                onClick={onJoinClick}
                className="px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-cta flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Gruba Katıl — Yerini Ayırt</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
