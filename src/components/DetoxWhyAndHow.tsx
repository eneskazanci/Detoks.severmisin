import React from 'react';
import { RefreshCw, Activity, ShieldCheck, Flame, Scale, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface DetoxWhyAndHowProps {
  onJoinClick: () => void;
}

const SYMPTOMS = [
  'Sürekli yorgunluk ve enerji düşüklüğü',
  'Sık sık acıkma ve tatlı/atıştırma krizleri',
  'Mide ekşimesi, gaz, hazımsızlık ve şişkinlik hissi',
  'Vücutta inatçı ödem ve ağırlık şikayetleri',
  'Düzensiz beslenme ve porsiyon kontrolü zorluğu',
  'Sabahları zor uyanma ve baş ağrısı hissi',
  'Dinlendirmeyen, yetersiz uyku kalitesi',
  'Gün içinde ani stres ve halsizlik dalgalanmaları',
  'Zihinsel sis, odaklanma güçlüğü ve unutkanlık',
  'Metabolik yavaşlama ve kilo vermede zorlanma',
];

export const DetoxWhyAndHow: React.FC<DetoxWhyAndHowProps> = ({ onJoinClick }) => {
  return (
    <section className="py-12 md:py-20 bg-white border-b border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-900 mb-2.5">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
              <span>Bedenin "Yeniden Başlat" Tuşu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight font-display uppercase">
              Detoks Nedir & Neden Yapıyoruz?
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-medium mt-2 max-w-2xl mx-auto">
              Detoks, vücudu içten dışa arındırma sürecidir. Amaç sadece kilo vermek değil, bedenin doğal metabolik dengesini yeniden kurmaktır.
            </p>
          </div>
        </ScrollReveal>

        {/* 2 Big Definition & Principle Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12 items-stretch">
          
          {/* Card 1: Detoks Nedir */}
          <ScrollReveal direction="up" delay={70} className="lg:col-span-6 flex">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F7F5] border border-emerald-200/90 shadow-soft flex flex-col justify-between text-left w-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 font-display mb-3">
                  Detoks Nedir? 🌿
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium mb-3">
                  Detoks, vücudumuza çevresel etkenler, yanlış beslenme alışkanlıkları ve yoğun stresle yüklenen birikmiş metabolik atıklardan ve serbest radikallerden arınmayı destekleme sürecidir.
                </p>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium mb-4">
                  Karaciğerin, sindirim sisteminin ve hücrelerin hafiflemesini sağlar. Cildin canlanmasına, zihinsel berraklığa ve kaliteli gece uykusuna yardımcı olur. Kısacası bedenin <em>“yeniden başlat”</em> tuşuna basmaktır.
                </p>
              </div>

              {/* Medical Anchor Note */}
              <div className="p-3.5 rounded-2xl bg-white border border-emerald-200/80 text-xs text-emerald-950 font-semibold leading-relaxed">
                <p>
                  <strong>Dr. Abdullah Kesgin:</strong> “Doğal ve sağlıklı beslenme alışkanlıkları bedenin arınma mekanizmalarını harekete geçirir. İlk adım sindirim sisteminin ve karaciğerin yükünü hafifletmektir.”
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: 1. Seviye Hedefleri (Meta Compliant) */}
          <ScrollReveal direction="up" delay={120} className="lg:col-span-6 flex">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white shadow-soft flex flex-col justify-between text-left w-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-sm">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display mb-3">
                  1. Seviye Hedefimiz Nedir? 🎯
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium mb-5">
                  Vücudu arındırmak, organların yükünü hafifletmek ve sürdürülebilir zindelik alışkanlıkları kazanmak için adım adım ilerliyoruz:
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/10">
                    <Scale className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-sm font-bold text-white block">Metabolik Rahatlama & Ödem Atımı</span>
                      <span className="text-[11px] text-neutral-300">1 haftalık arındırıcı menülerle bedensel hafiflik</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/10">
                    <Flame className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-sm font-bold text-white block">Sindirim Sistemi Rahatlığı & Şişkinliğin Azalması</span>
                      <span className="text-[11px] text-neutral-300">Karın ve mide bölgesinde ferahlama ve hafifleme</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/10">
                    <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
                    <div>
                      <span className="text-sm font-bold text-white block">Hekim Rehberliğinde Yaşam Alışkanlığı</span>
                      <span className="text-[11px] text-neutral-300">Uzmanlar eşliğinde koruyucu sağlık ve doğru beslenme bilinci</span>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-neutral-400 italic">
                  *Sonuçlar kişiden kişiye; metabolizma hızı, yaş, cinsiyet ve program kurallarına uyuma göre farklılık gösterebilir.
                </p>
              </div>

              <div className="mt-4 text-[11px] text-emerald-300 font-mono font-medium border-t border-white/10 pt-3">
                ✓ 4 yıldır binlerce katılımcı tarafından uygulanan kanıtlanmış arınma rehberi.
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Symptoms checklist: Neden Detoks Yapıyoruz? */}
        <ScrollReveal direction="up" delay={150}>
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFBF9] border border-neutral-200">
            <div className="text-left mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Kendini Dinle</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-neutral-900 font-display">
                Neden Detoks Yapıyoruz? (Bu Belirtilerden Kaçı Sende Var?)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Günlük koşturmaca ve hazır gıdalarla artan bu belirtiler arınma ve yenilenme ihtiyacını gösterir:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 mb-6 text-left">
              {SYMPTOMS.map((symptom, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-neutral-200/80 shadow-2xs flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-neutral-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{symptom}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <p className="text-xs sm:text-sm font-bold text-emerald-950">
                  Kendine önem verdiğin ve sağlıklı yaşamayı seçtiğin için detoks yapıyoruz!
                </p>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Detoks ile hayat kalitemizi ve enerjimizi hep birlikte yükseltiyoruz.
                </p>
              </div>
              <button
                onClick={onJoinClick}
                className="px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Tanıtıma Katıl</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
