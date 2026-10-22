import React, { useState } from 'react';
import { ArrowUp, Lock, ShieldCheck } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import { LegalModal, LegalDocType } from './LegalModal';

export const Footer: React.FC = () => {
  const { openAdminWithAuth } = useSiteContent();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<LegalDocType>('privacy');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLegal = (doc: LegalDocType) => {
    setSelectedDoc(doc);
    setLegalModalOpen(true);
  };

  return (
    <>
      <footer className="border-t border-neutral-200/90 py-8 bg-white text-neutral-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-display font-bold text-neutral-900 tracking-tight text-xs sm:text-sm uppercase">
              ONLINE DETOKS PROGRAMI
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-neutral-500 text-[11px]">7 Gün. Online. Birlikte.</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 text-neutral-600 font-semibold text-xs">
            <a href="#sistem" className="hover:text-emerald-700 transition-colors">Nasıl Çalışır?</a>
            <a href="#doktorlar" className="hover:text-emerald-700 transition-colors">Doktorlarımız</a>
            <a href="#sss" className="hover:text-emerald-700 transition-colors">SSS</a>
          </div>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 font-semibold text-neutral-600 hover:text-emerald-700 transition-colors cursor-pointer text-xs"
          >
            <span>Başa dön</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

        {/* Meta Compliance Policy Links Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-neutral-500 font-medium">
          <button
            onClick={() => handleOpenLegal('privacy')}
            className="hover:text-emerald-700 underline transition-colors cursor-pointer"
          >
            Gizlilik Politikası (Privacy Policy)
          </button>
          <span>•</span>
          <button
            onClick={() => handleOpenLegal('terms')}
            className="hover:text-emerald-700 underline transition-colors cursor-pointer"
          >
            Kullanım Koşulları (Terms of Service)
          </button>
          <span>•</span>
          <button
            onClick={() => handleOpenLegal('kvkk')}
            className="hover:text-emerald-700 underline transition-colors cursor-pointer"
          >
            KVKK Aydınlatma Metni
          </button>
          <span>•</span>
          <button
            onClick={() => handleOpenLegal('disclaimer')}
            className="hover:text-emerald-700 underline transition-colors cursor-pointer"
          >
            Tıbbi Sorumluluk Reddi (Disclaimer)
          </button>
        </div>

        {/* Required Meta / Facebook Advertising Disclaimer Box */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-4 text-center">
          <p className="text-[10px] text-neutral-400 leading-relaxed bg-[#F8FAF8] p-3 rounded-xl border border-neutral-100">
            <strong>Meta Reklam İlkeleri Uyarısı:</strong> Bu internet sitesi Meta Platforms, Inc., Facebook veya Instagram ile ilişkili veya bağlantılı değildir. Facebook ve Instagram, Meta Platforms, Inc.'in tescilli ticari markalarıdır. Bu sitede sunulan bilgiler genel beslenme farkındalığı ve sağlıklı yaşam tarzı desteği amacı taşır; tıbbi teşhis, tedavi veya doktor muayenesinin yerine geçmez. Kişisel sonuçlar metabolizma, yaş ve programa uyuma göre farklılık gösterebilir.
          </p>
        </div>

        {/* Copyright and discreet admin */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-[11px] text-neutral-400">
          <div>
            © 2026 Onlinedetoks. Tüm hakları saklıdır.
          </div>

          <div className="text-[10px] text-neutral-400">
            Paylaşılan bilgiler genel yaşam alışkanlığı ve motivasyon desteği içindir, tıbbi teşhis ve tedavinin yerine geçmez.
          </div>

          <button
            onClick={openAdminWithAuth}
            className="text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer text-[10px] inline-flex items-center gap-1 opacity-50 hover:opacity-100"
            title="Yönetici Girişi (Alt + A)"
          >
            <Lock className="w-2.5 h-2.5" />
            <span>Yönetici</span>
          </button>
        </div>
      </footer>

      {/* Legal Documents Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialDoc={selectedDoc}
      />
    </>
  );
};
