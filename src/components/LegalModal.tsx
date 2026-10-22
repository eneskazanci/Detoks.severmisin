import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock, AlertTriangle } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | 'kvkk' | 'disclaimer';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: LegalDocType;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, initialDoc = 'privacy' }) => {
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(initialDoc);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-white border border-neutral-200 shadow-2xl text-left relative overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-[#FAFBF9]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 font-display">
              Yasal Bilgilendirme & Politikalar
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 px-4 pt-2 gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveDoc('privacy')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeDoc === 'privacy'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Gizlilik Politikası
          </button>
          <button
            onClick={() => setActiveDoc('terms')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeDoc === 'terms'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Kullanım Koşulları
          </button>
          <button
            onClick={() => setActiveDoc('kvkk')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeDoc === 'kvkk'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            KVKK Metni
          </button>
          <button
            onClick={() => setActiveDoc('disclaimer')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeDoc === 'disclaimer'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Tıbbi Sorumluluk Reddi
          </button>
        </div>

        {/* Document Content */}
        <div className="p-5 sm:p-6 overflow-y-auto text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-4">
          
          {activeDoc === 'privacy' && (
            <div className="space-y-3">
              <h4 className="text-base font-bold text-neutral-900 font-display">Gizlilik Politikası (Privacy Policy)</h4>
              <p>
                Bütünsel Arınma & Destek Topluluğu olarak, web sitemizi ziyaret eden ve WhatsApp grubumuza katılan değerli kullanıcılarımızın kişisel verilerinin korunmasına büyük önem vermekteyiz.
              </p>
              <h5 className="font-bold text-neutral-900">1. Toplanan Veriler</h5>
              <p>
                WhatsApp katılım formu aracılığıyla yalnızca kullanıcılarımızın rızasıyla Ad Soyad, Telefon Numarası ve E-posta adresi toplanmaktadır.
              </p>
              <h5 className="font-bold text-neutral-900">2. Verilerin Kullanım Amacı</h5>
              <p>
                Toplanan iletişim bilgileri, yalnızca programın yürütülmesi, WhatsApp grup davet bağlantısının iletilmesi ve canlı Zoom yayın linklerinin paylaşılması amacıyla kullanılır. Bilgileriniz kesinlikle üçüncü şahıslara veya reklam şirketlerine satılmaz veya devredilmez.
              </p>
              <h5 className="font-bold text-neutral-900">3. Veri Güvenliği</h5>
              <p>
                Kişisel verileriniz modern güvenlik önlemleri ve şifreleme yöntemleriyle korunmaktadır. İstediğiniz an verilerinizin silinmesini talep etme hakkına sahipsiniz.
              </p>
            </div>
          )}

          {activeDoc === 'terms' && (
            <div className="space-y-3">
              <h4 className="text-base font-bold text-neutral-900 font-display">Kullanım Koşulları (Terms of Service)</h4>
              <p>
                Bu internet sitesini ziyaret ederek ve 7 günlük tanıtım programına dahil olarak aşağıdaki şartları kabul etmiş sayılırsınız:
              </p>
              <h5 className="font-bold text-neutral-900">1. Programın Niteliği</h5>
              <p>
                7 Günlük Online Detoks Tanıtım Programı, sağlıklı beslenme alışkanlıkları, farkındalık hareketleri ve yaşam kalitesi desteği sağlayan bir topluluk programıdır.
              </p>
              <h5 className="font-bold text-neutral-900">2. Katılımcı Sorumluluğu</h5>
              <p>
                Programda paylaşılan genel menüler, egzersiz önerileri ve uzman tavsiyeleri genel bilgilendirme amaçlıdır. Ciddi bir kronik hastalığı, hamileliği veya özel tıbbi durumu olan bireylerin programı uygulamadan önce şahsi hekimlerine danışmaları tavsiye edilir.
              </p>
              <h5 className="font-bold text-neutral-900">3. Fikri Mülkiyet</h5>
              <p>
                Sitede paylaşılan PDF menüler, videolar ve eğitim içerikleri Bütünsel Arınma & Destek Topluluğu'na aittir; izinsiz ticari amaçla çoğaltılamaz.
              </p>
            </div>
          )}

          {activeDoc === 'kvkk' && (
            <div className="space-y-3">
              <h4 className="text-base font-bold text-neutral-900 font-display">KVKK Aydınlatma Metni</h4>
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla Bütünsel Arınma & Destek Topluluğu tarafından işlenen kişisel verileriniz hakkında bilgilendirmedir:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>İşlenen Veriler:</strong> Kimlik (Ad-Soyad), İletişim (Telefon No, E-posta).</li>
                <li><strong>İşleme Hukuki Sebebi:</strong> İlgili kişinin açık rızası ve program hizmetinin ifası.</li>
                <li><strong>Haklarınız:</strong> KVKK'nın 11. maddesi uyarınca dilediğiniz zaman verilerinizin işlenip işlenmediğini öğrenme, düzeltme ve silinmesini talep etme hakkınız bulunmaktadır.</li>
              </ul>
            </div>
          )}

          {activeDoc === 'disclaimer' && (
            <div className="space-y-3">
              <h4 className="text-base font-bold text-neutral-900 font-display">Tıbbi & Sonuç Sorumluluk Reddi (Disclaimer)</h4>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 font-medium">
                <p>
                  <strong>Önemli Yasal ve Tıbbi Uyarı:</strong> Bu sitede veya WhatsApp grubunda paylaşılan hiçbir içerik, tavsiye, menü veya yayın; tıbbi teşhis, tedavi veya doktor muayenesinin yerine geçmez.
                </p>
              </div>
              <p>
                <strong>Bireysel Sonuçlar:</strong> Her bireyin metabolizması, vücut kitle indeksi, yaşı, genetik yapısı ve programa uyum disiplini farklıdır. Bu nedenle programdan elde edilen hafifleme ve zindelik hissi kişiden kişiye değişkenlik gösterebilir; sabit veya kesin bir kilo verme garantisi verilmemektedir.
              </p>
              <p>
                <strong>Meta Reklam İlkeleri Beyanı:</strong> Bu internet sitesi Meta Platforms, Inc., Facebook veya Instagram ile ilişkili veya bağlantılı değildir. Facebook ve Instagram, Meta Platforms, Inc.'in tescilli ticari markalarıdır.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-100 bg-[#FAFBF9] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold cursor-pointer transition-colors"
          >
            Anladım, Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
