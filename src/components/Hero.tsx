import React, { useState } from 'react';
import { 
  MessageCircle, ArrowRight, ShieldCheck, Sun, Users, Moon, 
  Sparkles, Check, Home, UserCheck, ChevronRight
} from 'lucide-react';
import { DoctorAvatar } from './DoctorAvatar';
import { useSiteContent } from '../context/ContentContext';
import { ScrollReveal } from './ScrollReveal';

interface HeroProps {
  onJoinClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinClick }) => {
  const { content } = useSiteContent();
  const { hero, doctors } = content;
  const [activeCycle, setActiveCycle] = useState<'morning' | 'group' | 'night'>('morning');

  const heroImageSrc = hero.customHeroImage || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80';

  return (
    <section className="relative overflow-hidden pt-4 pb-10 md:pt-8 md:pb-16 bg-live-gradient-light border-b border-emerald-950/5">
      {/* Living Ambient Floating Orbs */}
      <div className="absolute top-4 left-1/4 w-[500px] h-[350px] bg-gradient-to-tr from-emerald-300/35 via-lime-200/30 to-teal-100/25 rounded-full blur-3xl pointer-events-none -z-10 orb-float-1" />
      <div className="absolute top-12 right-1/4 w-[450px] h-[300px] bg-gradient-to-bl from-teal-200/30 via-emerald-200/25 to-amber-100/20 rounded-full blur-3xl pointer-events-none -z-10 orb-float-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Urgent Warm Announcement Pill */}
        <ScrollReveal direction="up" delay={30}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300/90 text-xs font-bold text-emerald-950 mb-3 shadow-2xs backdrop-blur-xs whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>🌿 7 Günlük 1. Seviye Detoks Tanıtım Programı Başlıyor — Kontenjan Sınırlıdır!</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT: ANA BAŞLIK, METİNLER & SABAHTAN GECEYE DÖNGÜSÜ                      */}
          {/* ========================================================================= */}
          <ScrollReveal direction="up" delay={60} className="lg:col-span-7 flex flex-col items-start text-left">
            
            <div className="flex items-center gap-1.5 text-xs font-black tracking-widest text-emerald-700 uppercase mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>⚡ Dr. Abdullah KESGİN & Uzm. Dr. Eyyüb YILMAZ ve 45 Kişilik Ekip Eşliğinde</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.9rem] font-black text-neutral-900 tracking-tight leading-[1.12] font-display uppercase mb-3 text-balance">
              Online Detoks <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600">
                Programı Başlıyor
              </span>
            </h1>

            {/* Emotional Lead Copy */}
            <p className="text-sm sm:text-base text-neutral-700 font-medium leading-relaxed mb-4 max-w-xl">
              Sabahları zor uyanmaktan, geçmeyen ödem ve yorgunluk hissinden yoruldun mu? Aç kalmadan, evinin düzenini bozmadan ve yalnız olmadan bedenini 7 günde sıfırla.
            </p>

            {/* 3 Core Trust Badges */}
            <div className="w-full flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-emerald-200/90 text-xs font-bold text-emerald-800 shadow-2xs">
                <span>🌿</span> Ücretsiz Tanıtım Programı
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-emerald-200/90 text-xs font-bold text-neutral-800 shadow-2xs">
                <Home className="w-3.5 h-3.5 text-emerald-600" /> Evinin Konforunda
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-emerald-200/90 text-xs font-bold text-neutral-800 shadow-2xs">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> 45 Kişilik Uzman Heyeti
              </span>
            </div>

            {/* 7 GÜNLÜK ARINMA RİTMİ KARTI */}
            <div className="w-full p-4 rounded-2xl bg-white/95 border border-emerald-200/80 shadow-soft mb-5">
              <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-emerald-900 uppercase tracking-wider font-display">
                    ⏰ 7 Günlük Arınma Ritmi
                  </span>
                  <span className="text-neutral-300">●</span>
                  <span className="text-[11px] font-bold text-emerald-700">WhatsApp + Zoom Canlı</span>
                </div>
              </div>

              {/* Cycle Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setActiveCycle('morning')}
                  className={`p-2 rounded-xl text-left transition-all cursor-pointer ${
                    activeCycle === 'morning'
                      ? 'bg-amber-50 border-2 border-amber-400 text-amber-950 shadow-xs'
                      : 'bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold mb-0.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Sabah Uyanışı</span>
                  </div>
                  <p className="text-[10px] text-neutral-500">Güne Hafif Başla</p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCycle('group')}
                  className={`p-2 rounded-xl text-left transition-all cursor-pointer ${
                    activeCycle === 'group'
                      ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 shadow-xs'
                      : 'bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold mb-0.5">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Grup Enerjisi</span>
                  </div>
                  <p className="text-[10px] text-neutral-500">Birlikte Başarıyoruz</p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCycle('night')}
                  className={`p-2 rounded-xl text-left transition-all cursor-pointer ${
                    activeCycle === 'night'
                      ? 'bg-indigo-50 border-2 border-indigo-400 text-indigo-950 shadow-xs'
                      : 'bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold mb-0.5">
                    <Moon className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Gece Onarımı</span>
                  </div>
                  <p className="text-[10px] text-neutral-500">Hediye Canlı Seans</p>
                </button>
              </div>

              {/* Dynamic Content for Cycle */}
              {activeCycle === 'morning' && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2 animate-fadeIn">
                  <div className="font-bold text-amber-950 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-600" />
                      <span>☀️ Güne Arınarak & Hafif Başla (1. Adım)</span>
                    </span>
                    <span className="text-[10px] bg-amber-200/80 text-amber-950 font-bold px-2 py-0.5 rounded-full">
                      Sabah Mesajı
                    </span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed text-[11px]">
                    Sabah telefonuna günün başlangıç rehberi ve 10 dakikalık omurga açıcı nefes hareketi gelir. Yüzlerce kadınla aynı anda uygulamanın verdiği güçle güne dinç başlarsın.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold text-amber-950 pt-1">
                    <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-amber-100">
                      <Check className="w-3 h-3 text-emerald-600" /> Günlük Başlangıç Rehberi
                    </span>
                    <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-amber-100">
                      <Check className="w-3 h-3 text-emerald-600" /> 10 Dk Nefes Egzersizi
                    </span>
                    <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-amber-100">
                      <Check className="w-3 h-3 text-emerald-600" /> Binlerce Kadın Seninle
                    </span>
                  </div>
                </div>
              )}

              {activeCycle === 'group' && (
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-2 animate-fadeIn">
                  <div className="font-bold text-emerald-950 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>🤝 Grup Enerjisi: Birlikte Başarıyoruz (2. Adım)</span>
                    </span>
                    <span className="text-[10px] bg-emerald-200/80 text-emerald-950 font-bold px-2 py-0.5 rounded-full">
                      Yalnız Değilsin
                    </span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed text-[11px]">
                    Bu programın sırrı birlikte olmakta! Binlerce kadın aynı anda aynı adımları atıyor. Grupta birinin "Ben de yaptım!" demesi o güne yüksek motivasyon katıyor.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold text-emerald-950 pt-1">
                    <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-emerald-100">
                      <Check className="w-3 h-3 text-emerald-600" /> Karşılıklı Destek
                    </span>
                    <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-emerald-100">
                      <Check className="w-3 h-3 text-emerald-600" /> Hekimlerle Soru-Cevap
                    </span>
                  </div>
                </div>
              )}

              {activeCycle === 'night' && (
                <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs space-y-2 animate-fadeIn">
                  <div className="font-bold text-indigo-950 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5 text-indigo-600" />
                      <span>🌙 Gece Onarımı: Hediye Canlı Seans (3. Adım)</span>
                    </span>
                    <span className="text-[10px] bg-indigo-200/70 text-indigo-900 font-bold px-2 py-0.5 rounded-full">
                      Her Akşam Canlı
                    </span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed text-[11px]">
                    Her akşam hekimlerimiz ve uzmanlarımızla kısa bir Zoom buluşması. Çayını al, ekrana bak, sadece dinle. O gün kafanda biriken her şeyi bırakıp hafifçe uyu.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold text-indigo-900 pt-1">
                    <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-indigo-100">
                      <Check className="w-3 h-3 text-emerald-600" /> Canlı Hekim Buluşması
                    </span>
                    <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-indigo-100">
                      <Check className="w-3 h-3 text-emerald-600" /> Yüz Yogası & Rahatlama
                    </span>
                    <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-indigo-100">
                      <Check className="w-3 h-3 text-emerald-600" /> Dinlendirici Uyku
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Primary High-Converting CTA */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-2">
              <button
                onClick={onJoinClick}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm font-black text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-full transition-all duration-200 shadow-cta active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
                <span className="tracking-wide uppercase font-display">DETOKS TANITIMINA KATIL →</span>
              </button>
            </div>

            <p className="text-[11px] text-neutral-500 font-medium">
              Katılım Tamamen Ücretsizdir · 30 Saniyede Dahil Ol · Kontenjan Sınırlıdır
            </p>

          </ScrollReveal>

          {/* ========================================================================= */}
          {/* RIGHT: DOKTOR GÜVENİ & GÖRSEL KARTI                                       */}
          {/* ========================================================================= */}
          <ScrollReveal direction="left" delay={120} className="lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full max-w-md group">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 rounded-[2.5rem] blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

              <div className="relative rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-2xl">
                
                {/* Hero Photo */}
                <div className="relative aspect-[4/3] sm:aspect-[1.15/1] overflow-hidden bg-neutral-100">
                  <img
                    src={heroImageSrc}
                    alt="Online Detoks Programı Doktor Güveni"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md text-[11px] font-bold text-emerald-950 border border-emerald-100">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Hekim Kontrollü 1. Seviye Detoks</span>
                  </div>

                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-md text-[10px] font-extrabold uppercase tracking-wider">
                    <span>%100 ONLINE</span>
                  </div>

                  {/* Bottom Glass Card */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex -space-x-1.5 shrink-0">
                        {doctors.slice(0, 3).map((doc) => (
                          <DoctorAvatar key={doc.id} doctor={doc} className="w-7 h-7 border border-white" />
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-900 leading-tight">
                          Dr. Abdullah KESGİN & Uzm. Dr. Eyyüb YILMAZ
                        </p>
                        <p className="text-[10px] text-emerald-700 font-semibold">
                          45 Kişilik Uzman & Yönetim Heyeti ile Yanınızda
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-600 italic border-t border-neutral-100 pt-1 mt-1 leading-snug">
                      “Aç kalmadan karaciğer ve bağırsakları dinlendiren, bedenin doğal hafifliğini uyandıran hekim programı.”
                    </p>
                  </div>
                </div>

                {/* Sub-bar below Image */}
                <div className="p-3 bg-[#FAFBF9] border-t border-neutral-100 flex items-center justify-between text-left">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[11px] font-bold text-neutral-800">
                      Yeni Dönem Başvuruları Açık
                    </span>
                  </div>
                  <button
                    onClick={onJoinClick}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Yerinizi Ayırtın</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};
