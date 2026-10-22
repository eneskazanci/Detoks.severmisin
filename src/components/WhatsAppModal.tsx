import React, { useState } from 'react';
import { MessageCircle, X, Check, ShieldCheck, Users, ArrowRight, User, Phone, Mail, Loader2, ExternalLink } from 'lucide-react';
import { DoctorAvatar } from './DoctorAvatar';
import { useSiteContent } from '../context/ContentContext';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  const { content, addLead } = useSiteContent();
  const whatsappUrl = content.whatsappUrl;
  const doctors = content.doctors;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim() || !consent) return;

    setIsSubmitting(true);
    try {
      await addLead({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
      });

      setSubmitted(true);

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Lead submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectWhatsAppClick = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleResetAndClose = () => {
    setName('');
    setPhone('');
    setEmail('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={handleResetAndClose}
    >
      {/* Modal Card */}
      <div 
        className="w-full max-w-md rounded-3xl bg-white border border-neutral-200 p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] text-left relative overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle top decoration bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-[#25D366] to-lime-500" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer z-10"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto pr-1 -mr-1">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-neutral-100 mt-1">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-md shadow-emerald-500/20 text-white">
                <MessageCircle className="w-7 h-7 fill-white text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  Resmi WhatsApp Grubu Katılımı
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight leading-tight font-display">
                Online Detoks Programı 🌿
              </h3>
              <p className="text-[11px] text-neutral-500">
                Uzm. Dr. Eyyüb YILMAZ & Dr. Abdullah KESGİN
              </p>
            </div>
          </div>

          {!submitted ? (
            <>
              {/* Doctors notice */}
              <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 mb-4 flex items-center gap-2.5">
                <div className="flex -space-x-1.5 shrink-0">
                  {doctors.slice(0, 2).map((d) => (
                    <DoctorAvatar key={d.id} doctor={d} className="w-7 h-7 border border-white" />
                  ))}
                </div>
                <p className="text-xs text-emerald-950 font-medium leading-snug">
                  Bilgilerinizi girerek hekimlerimizle doğrudan WhatsApp grubunda buluşun.
                </p>
              </div>

              {/* Lead Capture Form */}
              <form onSubmit={handleSubmit} className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Adınız ve Soyadınız <span className="text-emerald-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adınız Soyadınız..."
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Telefon Numarası (WhatsApp) <span className="text-emerald-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XX XXX XX XX"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    E-posta Adresi <span className="text-emerald-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@gmail.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Group Motivation Highlights (Gender-neutral, no recipe mention) */}
                <div className="py-2 space-y-1.5 text-xs text-neutral-600 border-t border-neutral-100 pt-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Güçlü grup motivasyonu ve karşılıklı dayanışma</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Zoom canlı yayınlarında doktorlara soru sorma imkanı</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Günde 15 dakikalık pratik esneme ve hareket rehberi</span>
                  </div>
                </div>

                {/* Meta Compliant Consent Checkbox */}
                <div className="pt-1 text-left">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 shrink-0"
                      required
                    />
                    <span className="text-[11px] text-neutral-500 leading-snug">
                      İletişim bilgilerimin program bilgilendirmesi amacıyla işlenmesini ve WhatsApp grubuna yönlendirilmeyi kabul ediyorum.
                    </span>
                  </label>
                </div>

                {/* Submit & Redirect Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !consent}
                  className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-cta active:scale-[0.98] cursor-pointer disabled:opacity-70 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Kaydediliyor ve Yönlendiriliyor...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span className="font-display tracking-wide uppercase">
                        Bilgileri Gönder & Gruba Katıl
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State after Submission */
            <div className="py-4 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h4 className="text-base font-bold text-neutral-900 font-display">
                  Tebrikler, Kaydınız Alındı!
                </h4>
                <p className="text-xs text-neutral-600 mt-1 max-w-xs mx-auto">
                  WhatsApp grubu yeni bir sekmede açıldı. Sayfa otomatik açılmadıysa aşağıdaki butona tıklayabilirsiniz.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleDirectWhatsAppClick}
                  className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl flex items-center justify-center gap-2 shadow-cta cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Şimdi WhatsApp Grubunu Aç</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
                >
                  Kapat
                </button>
              </div>
            </div>
          )}

          {/* Privacy & Trust Footer */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>KVKK Güvencesi</span>
            </span>
            <span>Spamsiz · Resmi WhatsApp Grubu</span>
          </div>

        </div>
      </div>
    </div>
  );
};
