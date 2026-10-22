import React from 'react';
import { MessageCircle, Award, ArrowRight, Check, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface WhatsAppGroupsSystemProps {
  onJoinClick: () => void;
}

const GROUPS = [
  {
    num: '1',
    title: 'Ana Detoks Grubu 🌿',
    badge: 'Günlük Akış & Menüler',
    desc: 'Günlük başlangıç menüsü, Zoom bağlantıları, hafif hareket videoları ve motivasyon paylaşımları bu gruptan akar.',
    highlight: 'Günün tüm yönlendirmeleri burada',
    borderColor: 'border-emerald-300',
  },
  {
    num: '2',
    title: 'Soru - Cevap Grubu 💬',
    badge: 'Hekim & Uzman Yanıtları',
    desc: 'Aklına takılan her şeyi sorabileceğin, doktorumuz ve 45 kişilik uzman heyetimizin doğrudan yanıtladığı destek hattı.',
    highlight: 'Hekimler ve uzmanlar devrede',
    borderColor: 'border-teal-300',
  },
  {
    num: '3',
    title: 'Önemli Duyurular Grubu 📢',
    badge: 'Kritik Bilgiler & Linkler',
    desc: 'Kaçırmaman gereken kritik yayın saatleri ve Zoom şifreleri sadece burada paylaşılır.',
    highlight: 'Sadece yetkili duyuruları (Spamsiz)',
    borderColor: 'border-amber-300',
  },
];

export const WhatsAppGroupsSystem: React.FC<WhatsAppGroupsSystemProps> = ({ onJoinClick }) => {
  return (
    <section className="py-12 md:py-20 bg-white border-b border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-900 mb-2.5">
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>3 Özel WhatsApp Grubu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight font-display uppercase">
              Süreç Nasıl İlerliyor? 💬
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-medium mt-2 max-w-2xl mx-auto">
              Yalnız değilsin! İletişimi düzenli tutmak için 3 özel WhatsApp grubuyla adım adım ilerliyoruz:
            </p>
          </div>
        </ScrollReveal>

        {/* 3 WhatsApp Groups Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {GROUPS.map((group, idx) => (
            <ScrollReveal key={idx} direction="up" delay={70 + idx * 60}>
              <div className={`h-full p-6 rounded-3xl bg-white border ${group.borderColor} shadow-soft hover:shadow-md transition-all text-left flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#25D366] text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {group.num}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                      {group.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-neutral-900 font-display mb-2">
                    {group.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium mb-4">
                    {group.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{group.highlight}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Banner between groups and graduation */}
        <ScrollReveal direction="up" delay={150}>
          <div className="text-center mb-10">
            <button
              onClick={onJoinClick}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs sm:text-sm font-black text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-full transition-all duration-200 shadow-cta active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>GRUBA KATIL — YERİNİ AYIRT →</span>
            </button>
            <p className="text-xs text-neutral-500 font-semibold mt-2">
              Grup linki anında açılır • Başvuru ücreti yoktur
            </p>
          </div>
        </ScrollReveal>

        {/* 8. Gün Mezuniyeti ve Sonrası Kartı */}
        <ScrollReveal direction="up" delay={200}>
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FAFBF9] to-emerald-50/50 border border-emerald-200/90 shadow-soft text-left relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-700 uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>🎓 8. Gün Mezuniyeti ve Sonrası</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 font-display tracking-tight mb-2.5">
                  Arınmış ve Hafiflemiş Bir Bedenle Kutlama
                </h3>
                
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium mb-3">
                  7 günü tamamlayıp ödemlerinden arınmış, hafiflemiş bir bedenle 8. günde mezuniyet kutlamamızı yapıyoruz. Deneyimlerimizi grupta paylaşıp bu arınmayı kutluyoruz. Dileyen katılımcılarımızla birlikte daha ileri seviye sağlıklı yaşam programlarımıza devam ediyoruz.
                </p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>✨ 4 Yıldır Her Ay Düzenli Olarak Uygulanmaktadır</span>
                </div>
              </div>

              <div className="shrink-0 text-center sm:text-right">
                <button
                  onClick={onJoinClick}
                  className="px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-black transition-all shadow-cta active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>GRUPLARA KATIL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
