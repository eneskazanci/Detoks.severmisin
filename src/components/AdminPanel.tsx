import React, { useState, useRef } from 'react';
import { 
  X, Save, RotateCcw, Image as ImageIcon, Upload, Check, 
  Settings, LayoutList, HelpCircle, Smartphone, 
  MessageCircle, Plus, Trash2, ExternalLink, Download, FileUp, Sparkles,
  LogOut, Lock, KeyRound, Server, Copy, CheckCheck, 
  Eye, EyeOff, AlertCircle, ToggleLeft, ToggleRight, Calendar, ArrowUpRight,
  Layers, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Play, Share2, Globe
} from 'lucide-react';
import { 
  useSiteContent, FaqItem, SectionVisibility, SignalItem, JourneyStep, PosterSlide, 
  DEFAULT_POSTER_SLIDES, SlideTransitionEffect, SocialMediaAccount, SocialPlatform, 
  DEFAULT_SOCIAL_LINKS 
} from '../context/ContentContext';
import { renderSocialIcon } from './KesginDetoxLanding';

export const AdminPanel: React.FC = () => {
  const { 
    content, 
    updateContent, 
    updateSectionVisibility,
    setAllSectionsVisibility,
    updateSignals,
    updateJourney,
    updateFaq,
    saveSettingsToHostinger,
    resetToDefault, 
    isAdminOpen, 
    setIsAdminOpen,
    logoutAdmin,
    changeAdminPassword,
  } = useSiteContent();

  const [activeTab, setActiveTab] = useState<'quick' | 'sections' | 'content' | 'hostinger' | 'security'>('quick');
  const [saveToast, setSaveToast] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordToast, setPasswordToast] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Quick Hostinger settings state
  const [quickDoctorName, setQuickDoctorName] = useState(content.doctorName || 'DR. ABDULLAH KESGİN');
  const [quickBrandTitle, setQuickBrandTitle] = useState(content.brandTitle || 'detox');
  const [quickEventDate, setQuickEventDate] = useState(content.eventDate || '2026-10-22T20:00:00+03:00');
  const [quickWhatsapp, setQuickWhatsapp] = useState(content.whatsappUrl || 'https://chat.whatsapp.com/ItHdw0hFUecEZMRWCLAoMU');
  const [quickPosterDateText, setQuickPosterDateText] = useState(content.posterDateText || '');
  const [quickHidePosterStaticDate, setQuickHidePosterStaticDate] = useState(content.hidePosterStaticDate !== false);
  const [isSavingHostinger, setIsSavingHostinger] = useState(false);
  const [hostingerStatus, setHostingerStatus] = useState<string | null>(null);

  // Slayt Gösterisi Durumu
  const [slides, setSlides] = useState<PosterSlide[]>(
    content.posterSlides && content.posterSlides.length > 0
      ? content.posterSlides
      : DEFAULT_POSTER_SLIDES
  );
  const [slideInterval, setSlideInterval] = useState<number>(content.slideIntervalSeconds || 5);
  const [slideEffect, setSlideEffect] = useState<SlideTransitionEffect>(
    content.slideTransitionEffect || 'glow-shimmer'
  );
  const [previewSlideIdx, setPreviewSlideIdx] = useState(0);

  // Sosyal Medya Hesapları Durumu
  const [socialList, setSocialList] = useState<SocialMediaAccount[]>(
    content.socialLinks && content.socialLinks.length > 0
      ? content.socialLinks
      : DEFAULT_SOCIAL_LINKS
  );
  const [newPlatformSelect, setNewPlatformSelect] = useState<SocialPlatform>('instagram');

  // Sosyal Medya Yönetim Fonksiyonları
  const handleAddSocial = (platform: SocialPlatform = newPlatformSelect) => {
    const platformDefaults: Record<SocialPlatform, { title: string; url: string }> = {
      instagram: { title: 'Instagram', url: 'https://instagram.com/' },
      youtube: { title: 'YouTube', url: 'https://youtube.com/' },
      facebook: { title: 'Facebook', url: 'https://facebook.com/' },
      tiktok: { title: 'TikTok', url: 'https://tiktok.com/@' },
      telegram: { title: 'Telegram', url: 'https://t.me/' },
      whatsapp: { title: 'WhatsApp', url: 'https://chat.whatsapp.com/' },
      twitter: { title: 'X (Twitter)', url: 'https://x.com/' },
      linkedin: { title: 'LinkedIn', url: 'https://linkedin.com/in/' },
      website: { title: 'Web Sitesi', url: 'https://' },
    };

    const def = platformDefaults[platform] || { title: 'Sosyal Medya', url: 'https://' };
    const newAccount: SocialMediaAccount = {
      id: 'soc-' + Date.now(),
      platform,
      title: def.title,
      url: def.url,
      enabled: true,
    };
    setSocialList((prev) => [...prev, newAccount]);
    triggerToast();
  };

  const handleUpdateSocial = (index: number, updated: Partial<SocialMediaAccount>) => {
    setSocialList((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updated };
      return copy;
    });
  };

  const handleToggleSocial = (index: number) => {
    setSocialList((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], enabled: copy[index].enabled === false ? true : false };
      return copy;
    });
    triggerToast();
  };

  const handleMoveSocial = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= socialList.length) return;
    setSocialList((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  const handleRemoveSocial = (index: number) => {
    setSocialList((prev) => prev.filter((_, idx) => idx !== index));
    triggerToast();
  };

  const handleResetSocial = () => {
    setSocialList(DEFAULT_SOCIAL_LINKS);
    triggerToast();
  };

  // Content editing state
  const [editTitle, setEditTitle] = useState(content.title || '');
  const [editIntro, setEditIntro] = useState(content.intro || '');
  const [editEventTitle, setEditEventTitle] = useState(content.eventTitle || '');
  const [editAbout, setEditAbout] = useState(content.about || '');
  const [editAbout2, setEditAbout2] = useState(content.about2 || '');
  const [editNote, setEditNote] = useState(content.note || '');
  const [editAnnouncement, setEditAnnouncement] = useState(content.announcementText || '');
  const [editAnnouncementSub, setEditAnnouncementSub] = useState(content.announcementSubtext || '');
  const [editPosterImage, setEditPosterImage] = useState(content.posterImage || '/kapak-toplanti.jpg');

  const [signals, setSignals] = useState<SignalItem[]>(content.signalsList || []);
  const [journeySteps, setJourneySteps] = useState<JourneyStep[]>(content.journeyList || []);
  const [faqItems, setFaqItems] = useState<FaqItem[]>(content.faq || []);

  const posterFileInputRef = useRef<HTMLInputElement>(null);
  const slideFileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  if (!isAdminOpen) return null;

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // Slayt Ekleme, Düzenleme, Sıralama, Silme İşlevleri
  const handleAddSlide = () => {
    const newSlide: PosterSlide = {
      id: 'slide-' + Date.now(),
      imageUrl: '/kapak-toplanti.jpg',
      title: 'Canlı Buluşma & Tanıtım',
      caption: 'Uzmanlarla Birlikte Arınma',
      badge: 'YENİ OTURUM',
    };
    const updated = [...slides, newSlide];
    setSlides(updated);
    setPreviewSlideIdx(updated.length - 1);
  };

  const handleUpdateSlide = (index: number, updated: Partial<PosterSlide>) => {
    setSlides(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updated };
      return copy;
    });
  };

  const handleSlideFileUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleUpdateSlide(index, { imageUrl: reader.result });
        triggerToast();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= slides.length) return;
    setSlides(prev => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
    setPreviewSlideIdx(targetIdx);
  };

  const handleRemoveSlide = (index: number) => {
    if (slides.length <= 1) {
      alert('Afiş alanında en az 1 adet görsel bulunmalıdır.');
      return;
    }
    const updated = slides.filter((_, idx) => idx !== index);
    setSlides(updated);
    if (previewSlideIdx >= updated.length) {
      setPreviewSlideIdx(0);
    }
  };

  const handleResetSlides = () => {
    setSlides(DEFAULT_POSTER_SLIDES);
    setPreviewSlideIdx(0);
    triggerToast();
  };

  const handleSaveQuickSettings = async () => {
    setIsSavingHostinger(true);
    setHostingerStatus(null);
    updateContent({
      doctorName: quickDoctorName,
      brandTitle: quickBrandTitle,
      socialLinks: socialList,
      eventDate: quickEventDate,
      whatsappUrl: quickWhatsapp,
      posterDateText: quickPosterDateText,
      hidePosterStaticDate: quickHidePosterStaticDate,
      posterSlides: slides,
      slideIntervalSeconds: slideInterval,
      slideTransitionEffect: slideEffect,
      posterImage: slides[0]?.imageUrl || '/kapak-toplanti.jpg',
    });
    const res = await saveSettingsToHostinger(
      quickEventDate, 
      quickWhatsapp, 
      quickPosterDateText, 
      quickHidePosterStaticDate,
      slides,
      slideInterval,
      slideEffect,
      quickDoctorName,
      quickBrandTitle,
      socialList
    );
    setIsSavingHostinger(false);
    setHostingerStatus(res.message);
    triggerToast();
  };

  const handleSaveAllContent = () => {
    updateContent({
      doctorName: quickDoctorName,
      brandTitle: quickBrandTitle,
      socialLinks: socialList,
      title: editTitle,
      intro: editIntro,
      eventTitle: editEventTitle,
      about: editAbout,
      about2: editAbout2,
      note: editNote,
      announcementText: editAnnouncement,
      announcementSubtext: editAnnouncementSub,
      posterImage: slides[0]?.imageUrl || editPosterImage,
      posterDateText: quickPosterDateText,
      hidePosterStaticDate: quickHidePosterStaticDate,
      posterSlides: slides,
      slideIntervalSeconds: slideInterval,
      slideTransitionEffect: slideEffect,
      signalsList: signals,
      journeyList: journeySteps,
      faq: faqItems,
    });
    triggerToast();
  };

  const handlePosterFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEditPosterImage(reader.result);
          if (slides.length > 0) {
            handleUpdateSlide(0, { imageUrl: reader.result });
          }
          updateContent({ posterImage: reader.result });
          triggerToast();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadSettingsJson = () => {
    const data = {
      doctorName: quickDoctorName,
      brandTitle: quickBrandTitle,
      socialLinks: socialList,
      eventDate: quickEventDate,
      whatsappUrl: quickWhatsapp,
      eventTitle: content.eventTitle,
      posterDateText: quickPosterDateText,
      hidePosterStaticDate: quickHidePosterStaticDate,
      posterSlides: slides,
      slideIntervalSeconds: slideInterval,
      slideTransitionEffect: slideEffect,
      sectionsVisibility: content.sectionsVisibility,
      updatedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportFullBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `detoks-site-yedek-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result as string);
          updateContent(parsed);
          triggerToast();
          alert('İçerik yedeği başarıyla yüklendi!');
        } catch {
          alert('Geçersiz JSON dosyası!');
        }
      };
      reader.readAsText(file);
    }
  };

  // Section list definitions matching detox.drabdullahkesgin.com exactly
  const sectionsList: { key: keyof SectionVisibility; name: string; desc: string; icon: string }[] = [
    { 
      key: 'announcement', 
      name: '1. Üst Duyuru Bandı', 
      desc: 'Mor renkli üst şerit: "Kendinize bir akşam ayırın. Ücretsiz canlı tanıtım semineri ↗"', 
      icon: '📢' 
    },
    { 
      key: 'hero', 
      name: '2. Hero & Canlı Sayaç & Afiş', 
      desc: 'Ana başlık, tarih rozeti, WhatsApp butonu, geri sayım sayacı ve kapak-toplanti.jpg görseli', 
      icon: '⚡' 
    },
    { 
      key: 'topicStrip', 
      name: '3. Konu Şeridi (Bütünsel Bakış)', 
      desc: 'Açık yeşil şerit: "BÜTÜNSEL BİR BAKIŞ ✳ Beslenme ✳ Hareket ✳ Uyku ✳ İyi yaşam alışkanlıkları"', 
      icon: '🌿' 
    },
    { 
      key: 'signals', 
      name: '4. Sinyaller & Belirtiler ("Bu Hisler Tanıdık Mı?")', 
      desc: '3 renkli kart (01 Enerji, 02 Beslenme, 03 Denge) ve sağlık uyarısı dipnotu', 
      icon: '🎯' 
    },
    { 
      key: 'about', 
      name: '5. Buluşma Hakkında ("Küçük Bir Duraklama")', 
      desc: '"Sağlığınız, kendinize ayırdığınız zamana değer." ve açıklama paragrafları', 
      icon: '📖' 
    },
    { 
      key: 'journey', 
      name: '6. 3 Adımlı Yolculuk Adımları', 
      desc: '01 Bedeninizi anlamak, 02 Uzmanlardan dinlemek, 03 Birlikte başlamak kartları', 
      icon: '👣' 
    },
    { 
      key: 'invitation', 
      name: '7. Davet & Takvime Ekle Bölümü', 
      desc: '"ARTIK KENDİME İYİ BAKMAK İSTİYORUM.", canlı Zoom bilgisi, WhatsApp butonu ve .ics takvim indirme', 
      icon: '✉️' 
    },
    { 
      key: 'faq', 
      name: '8. Merak Edilenler (SSS Akordeonu)', 
      desc: 'Toplantıya nasıl katılırım, ücretli mi, detoks hakkında ne bilmeliyim vb. akordeon soruları', 
      icon: '❓' 
    },
    { 
      key: 'healthNote', 
      name: '9. Sağlık Bilgilendirme Notu & Meta Uyarısı', 
      desc: 'Tıbbi bilgilendirme ve Meta / Facebook reklam politikası uyarı metni', 
      icon: 'ⓘ' 
    },
    { 
      key: 'mobileCta', 
      name: '10. Mobil Sabit WhatsApp Butonu', 
      desc: 'Mobil ekranlarda sayfa altında sabit kalan "Ücretsiz gruba katıl ↗" barı', 
      icon: '📱' 
    },
  ];

  const visibility = content.sectionsVisibility || {
    announcement: true,
    hero: true,
    topicStrip: true,
    signals: true,
    about: true,
    journey: true,
    invitation: true,
    faq: true,
    healthNote: true,
    mobileCta: true,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-5xl h-[92vh] rounded-3xl bg-white border border-neutral-200 shadow-2xl flex flex-col overflow-hidden text-left relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-5 py-4 border-b border-neutral-200 bg-[#FAF9F6] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#514177] text-white flex items-center justify-center shadow-xs">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-sans flex items-center gap-2">
                <span>Detox Yönetim & Bölüm Kontrol Paneli</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  Hostinger Uyumlu
                </span>
              </h2>
              <p className="text-xs text-neutral-500">
                Tarihi ve WhatsApp linkini anında değiştirin; sitedeki bölümleri açıp kapatın veya düzenleyin.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveToast && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                <Check className="w-3.5 h-3.5" />
                Kaydedildi!
              </span>
            )}
            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-red-50 text-neutral-600 hover:text-red-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Yönetici Oturumunu Kapat"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Çıkış</span>
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
              title="Paneli Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 border-b border-neutral-200 bg-white flex items-center gap-1.5 overflow-x-auto shrink-0 py-2.5 scrollbar-none">
          <button
            onClick={() => setActiveTab('quick')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'quick' ? 'bg-[#514177] text-white shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>⚡ Tarih & WhatsApp Linki</span>
          </button>

          <button
            onClick={() => setActiveTab('sections')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'sections' ? 'bg-emerald-600 text-white shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span>Bölümleri Aç / Kapat</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'content' ? 'bg-[#514177] text-white shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Metin & Afiş Düzenleme</span>
          </button>

          <button
            onClick={() => setActiveTab('hostinger')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'hostinger' ? 'bg-[#287653] text-white shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Hostinger Yayınlama Rehberi</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'security' ? 'bg-neutral-800 text-white shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Şifre & Yedek</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF9F6]">
          
          {/* ========================================================================= */}
          {/* TAB 1: QUICK SETTINGS (TARİH & WHATSAPP LİNKİ)                             */}
          {/* ========================================================================= */}
          {activeTab === 'quick' && (
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* Highlight Info Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-emerald-50 border border-purple-200">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">
                      Tarih, WhatsApp Linki ve Üst Alanı Canlı Olarak Değiştirin
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      Buradan belirlediğiniz doktor ismi, marka logosu, tarih ve WhatsApp bağlantısı sitedeki ilgili tüm alanlara anında yansır.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sitenin Üst Kısmı: Doktor İsmi & Logo ("DR. ABDULLAH KESGİN") */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 text-[#514177] flex items-center justify-center font-bold text-xs">
                      ✳
                    </span>
                    <span>Sitenin Üst Kısmı: Doktor İsmi & Logo ("DR. ABDULLAH KESGİN")</span>
                  </div>
                  <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg font-bold border border-purple-200">
                    Header Marka Alanı
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  Sitenin en üst sol köşesinde yer alan <strong>"DR. ABDULLAH KESGİN"</strong> yazısını ve üstündeki marka ismini dilediğiniz gibi güncelleyebilirsiniz.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Doktor / Uzman İsmi (Üst Kısım):
                    </label>
                    <input
                      type="text"
                      value={quickDoctorName}
                      onChange={(e) => setQuickDoctorName(e.target.value)}
                      placeholder="DR. ABDULLAH KESGİN"
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold tracking-wider focus:ring-2 focus:ring-purple-500 uppercase"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <button
                        type="button"
                        onClick={() => setQuickDoctorName('DR. ABDULLAH KESGİN')}
                        className="px-2 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-[10px] font-semibold text-neutral-700 cursor-pointer"
                      >
                        DR. ABDULLAH KESGİN (Varsayılan)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDoctorName('UZM. DR. ABDULLAH KESGİN')}
                        className="px-2 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-[10px] font-semibold text-neutral-700 cursor-pointer"
                      >
                        UZM. DR. ABDULLAH KESGİN
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDoctorName('DR. ABDULLAH KESGİN & EKİBİ')}
                        className="px-2 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-[10px] font-semibold text-neutral-700 cursor-pointer"
                      >
                        DR. ABDULLAH KESGİN & EKİBİ
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Marka Başlığı (Üst Metin):
                    </label>
                    <input
                      type="text"
                      value={quickBrandTitle}
                      onChange={(e) => setQuickBrandTitle(e.target.value)}
                      placeholder="detox"
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold focus:ring-2 focus:ring-purple-500"
                    />
                    <p className="text-[11px] text-neutral-500 mt-2">
                      Doktor isminin üzerinde yer alan ana marka metnidir (varsayılan: <strong>detox</strong>).
                    </p>
                  </div>
                </div>

                {/* Header Canlı Önizleme */}
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <span className="text-neutral-500 font-medium">Sitede Üst Kısımda Böyle Görünecek:</span>
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl border border-neutral-300 shadow-2xs">
                    <span className="text-base text-neutral-900 leading-none">✳</span>
                    <span className="flex flex-col text-left">
                      <strong className="text-sm font-black text-neutral-900 leading-tight">
                        {quickBrandTitle || 'detox'}
                      </strong>
                      {quickDoctorName && (
                        <span className="text-[9px] font-extrabold text-neutral-500 tracking-wider uppercase leading-tight">
                          {quickDoctorName}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* 1. Tarih & Saat Seçici */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                    <Calendar className="w-4 h-4 text-[#514177]" />
                    <span>1. Toplantı / Seminer Tarihi ve Saati</span>
                  </div>
                  <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg font-bold border border-purple-200">
                    Otomatik Geri Sayım & Sayaç
                  </span>
                </div>

                <p className="text-xs text-neutral-500">
                  Tarihi değiştirdiğinizde sayaç otomatik olarak kalan gün, saat, dakika ve saniyeyi hesaplar.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Tarih & Saat (ISO Formatı veya Seçici)
                    </label>
                    <input
                      type="datetime-local"
                      value={quickEventDate.slice(0, 16)}
                      onChange={(e) => {
                        if (e.target.value) {
                          setQuickEventDate(e.target.value + ':00+03:00');
                        }
                      }}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Hızlı Önayarlı Tarih Seçin
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          d.setDate(d.getDate() + 2);
                          d.setHours(20, 0, 0, 0);
                          setQuickEventDate(d.toISOString().slice(0, 19) + '+03:00');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold cursor-pointer"
                      >
                        2 Gün Sonra 20:00
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          d.setDate(d.getDate() + 7);
                          d.setHours(20, 0, 0, 0);
                          setQuickEventDate(d.toISOString().slice(0, 19) + '+03:00');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold cursor-pointer"
                      >
                        Haftaya Perşembe 20:00
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickEventDate('2026-10-22T20:00:00+03:00')}
                        className="px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold cursor-pointer border border-purple-200"
                      >
                        22 Ekim 20.00 (Orijinal)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sitede Nasıl Görünecek Önizlemesi */}
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span className="text-neutral-500">Sitedeki Canlı Etiket:</span>
                  <strong className="text-purple-900 font-bold text-sm">
                    {(() => {
                      try {
                        const d = new Date(quickEventDate);
                        return new Intl.DateTimeFormat('tr-TR', {
                          timeZone: 'Europe/Istanbul',
                          day: 'numeric',
                          month: 'long',
                          weekday: 'long',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(d);
                      } catch {
                        return quickEventDate;
                      }
                    })()}
                  </strong>
                </div>
              </div>

              {/* 2. WhatsApp Grup Linki */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>2. WhatsApp Grup Davet Linki</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg font-bold border border-emerald-200">
                    Doğrudan Harici Bağlantı (Form Yok)
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  Ziyaretçiler sitedeki herhangi bir WhatsApp butonuna tıkladığında <strong>hiçbir form açılmaz</strong>. Doğrudan WhatsApp uygulaması açılarak burada belirttiğiniz gruba yönlendirilir.
                </p>

                {/* Direct API Launch Info */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1.5 text-neutral-700">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <span>📱</span>
                    <span>Doğrudan Uygulama Başlatma (Universal Link & API)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-neutral-600">
                    <strong>Mobil Cihazlar:</strong> Linke tıklandığında iOS ve Android sistemleri WhatsApp uygulamasını hemen doğrudan başlatır.
                  </p>
                  <p className="text-[11px] leading-relaxed text-neutral-600">
                    <strong>Desteklenen Linkler:</strong> Grup Daveti (<code className="font-mono bg-white px-1 py-0.5 rounded text-[10px]">https://chat.whatsapp.com/...</code>), WhatsApp API (<code className="font-mono bg-white px-1 py-0.5 rounded text-[10px]">https://api.whatsapp.com/send?phone=...</code>) veya <code className="font-mono bg-white px-1 py-0.5 rounded text-[10px]">https://wa.me/...</code>.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-neutral-700">
                    WhatsApp Grup URL Adresi:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      value={quickWhatsapp}
                      onChange={(e) => setQuickWhatsapp(e.target.value)}
                      placeholder="https://chat.whatsapp.com/ItHdw0hFUecEZMRWCLAoMU"
                      className="flex-1 px-3 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:ring-2 focus:ring-emerald-500"
                    />
                    <a
                      href={quickWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 border border-emerald-200 transition-colors"
                    >
                      <span>Grubu Test Et</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer Sosyal Medya Hesapları Yönetimi */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                    <Share2 className="w-4 h-4 text-purple-700" />
                    <span>Footer Sosyal Medya Hesapları Yönetimi</span>
                  </div>
                  <span className="text-[11px] font-mono text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg font-bold border border-purple-200">
                    {socialList.filter((s) => s.enabled !== false).length} Aktif / {socialList.length} Toplam
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  Sitenin alt (footer) kısmında ziyaretçilerinize sunulacak sosyal medya bağlantılarını (Instagram, YouTube, Facebook, Telegram vb.) buradan ekleyip düzenleyebilirsiniz.
                </p>

                {/* Yeni Hesap Ekleme Barı */}
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-neutral-700">Platform Seç:</span>
                    <select
                      value={newPlatformSelect}
                      onChange={(e) => setNewPlatformSelect(e.target.value as SocialPlatform)}
                      className="px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs font-bold bg-white text-neutral-800 cursor-pointer focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="instagram">📸 Instagram</option>
                      <option value="youtube">🎥 YouTube</option>
                      <option value="facebook">📘 Facebook</option>
                      <option value="telegram">✈️ Telegram</option>
                      <option value="tiktok">🎵 TikTok</option>
                      <option value="whatsapp">💬 WhatsApp Hattı</option>
                      <option value="website">🌐 Web Sitesi</option>
                      <option value="twitter">🐦 X (Twitter)</option>
                      <option value="linkedin">💼 LinkedIn</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleAddSocial(newPlatformSelect)}
                      className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-xs transition-all active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Hesap Ekle</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetSocial}
                    className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-600 text-xs font-semibold border border-neutral-200 cursor-pointer"
                    title="Varsayılan sosyal medya listesine dön"
                  >
                    <span>Varsayılanlara Sıfırla</span>
                  </button>
                </div>

                {/* Hesaplar Listesi */}
                <div className="space-y-3">
                  {socialList.length === 0 ? (
                    <div className="p-4 rounded-xl bg-neutral-50 text-center text-xs text-neutral-500">
                      Henüz sosyal medya hesabı eklenmedi. Yukarıdan dilediğiniz platformu seçip ekleyebilirsiniz.
                    </div>
                  ) : (
                    socialList.map((item, idx) => {
                      const isEnabled = item.enabled !== false;
                      return (
                        <div
                          key={item.id || idx}
                          className={`p-3.5 rounded-xl border transition-all space-y-2.5 ${
                            isEnabled
                              ? 'bg-white border-neutral-200 shadow-2xs'
                              : 'bg-neutral-50 border-neutral-200 opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-7 h-7 rounded-full bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
                                {renderSocialIcon(item.platform, 'w-3.5 h-3.5')}
                              </span>
                              <select
                                value={item.platform}
                                onChange={(e) => handleUpdateSocial(idx, { platform: e.target.value as SocialPlatform })}
                                className="px-2 py-1 rounded border border-neutral-200 text-xs font-bold text-neutral-800 bg-white"
                              >
                                <option value="instagram">Instagram</option>
                                <option value="youtube">YouTube</option>
                                <option value="facebook">Facebook</option>
                                <option value="telegram">Telegram</option>
                                <option value="tiktok">TikTok</option>
                                <option value="whatsapp">WhatsApp</option>
                                <option value="website">Web Sitesi</option>
                                <option value="twitter">X (Twitter)</option>
                                <option value="linkedin">LinkedIn</option>
                              </select>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {/* Açık / Kapalı Toggle */}
                              <button
                                type="button"
                                onClick={() => handleToggleSocial(idx)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                                  isEnabled
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : 'bg-neutral-200 text-neutral-600'
                                }`}
                              >
                                {isEnabled ? 'Sitede Açık' : 'Gizli'}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleMoveSocial(idx, 'up')}
                                disabled={idx === 0}
                                className="p-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 disabled:opacity-30 cursor-pointer"
                                title="Yukarı Taşı"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveSocial(idx, 'down')}
                                disabled={idx === socialList.length - 1}
                                className="p-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 disabled:opacity-30 cursor-pointer"
                                title="Aşağı Taşı"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveSocial(idx)}
                                className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer ml-1"
                                title="Hesabı Sil"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                            <div className="sm:col-span-4">
                              <label className="block text-[10px] font-bold text-neutral-500 mb-0.5">
                                Görünen İsim:
                              </label>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => handleUpdateSocial(idx, { title: e.target.value })}
                                placeholder="Örn: Instagram"
                                className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs font-bold bg-white"
                              />
                            </div>

                            <div className="sm:col-span-8">
                              <label className="block text-[10px] font-bold text-neutral-500 mb-0.5">
                                Profil / Kanal URL Adresi:
                              </label>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="url"
                                  value={item.url}
                                  onChange={(e) => handleUpdateSocial(idx, { url: e.target.value })}
                                  placeholder="https://..."
                                  className="flex-1 px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs font-mono bg-white focus:ring-1 focus:ring-purple-500"
                                />
                                {item.url && (
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg bg-neutral-100 hover:bg-purple-100 text-neutral-700 hover:text-purple-800 cursor-pointer border border-neutral-200"
                                    title="Bağlantıyı Yeni Sekmede Aç"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer Canlı Önizlemesi */}
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <span className="text-xs text-neutral-500 font-semibold block">
                    Sitede Footer Alanında Böyle Görünecek:
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold text-[#5932ad] tracking-wider uppercase">
                      Bizi Takip Edin:
                    </span>
                    {socialList.filter((s) => s.enabled !== false && s.url).map((item) => (
                      <span
                        key={item.id}
                        title={item.title}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f3eefb] text-[#514177] border border-[#dfcef6] shadow-2xs"
                      >
                        {renderSocialIcon(item.platform, 'w-3.5 h-3.5')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Sağdaki Afiş Görseli Üzerindeki Tarih Alanı (22 EKİM PERŞEMBE SAAT 20.00 Revizyonu) */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                    <ImageIcon className="w-4 h-4 text-purple-700" />
                    <span>3. Sağdaki Afiş Üzerindeki Tarih Alanı</span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={quickHidePosterStaticDate}
                      onChange={(e) => setQuickHidePosterStaticDate(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded border-neutral-300 focus:ring-purple-500 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-neutral-700">Afiş Tarihini Dinamik Yap</span>
                  </label>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200 text-xs text-neutral-600 leading-relaxed">
                  <p className="font-semibold text-purple-900 mb-1">
                    ✓ Afişteki Eski Statik Tarih Kapatıldı:
                  </p>
                  Orijinal afiş görselinde yer alan <strong>"22 EKİM PERŞEMBE SAAT 20.00"</strong> yazısı kapatılmıştır. Bu alana yukarıda belirlediğiniz yeni toplantı tarihi ve saati otomatik olarak veya aşağıya gireceğiniz özel metin canlı yansıtılır.
                </div>

                {quickHidePosterStaticDate && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-neutral-700">
                          Afiş Üzerinde Görünecek Tarih Yazısı:
                        </label>
                        {quickPosterDateText && (
                          <button
                            type="button"
                            onClick={() => setQuickPosterDateText('')}
                            className="text-[11px] text-purple-700 hover:underline cursor-pointer"
                          >
                            Otomatik Tarihe Sıfırla
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={quickPosterDateText}
                        onChange={(e) => setQuickPosterDateText(e.target.value)}
                        placeholder="Örn: 24 KASIM SALI SAAT 20.00 (Boş bırakılırsa tarihten otomatik üretilir)"
                        className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:ring-2 focus:ring-purple-500"
                      />
                      <p className="text-[11px] text-neutral-500 mt-1">
                        * Boş bırakırsanız 1. adımdaki toplantı tarihinden otomatik üretilir. İsterseniz dilediğiniz özel tarihi veya metni buraya yazabilirsiniz.
                      </p>
                    </div>

                    {/* Canlı Afiş Tarihi Önizlemesi */}
                    <div className="p-3.5 rounded-xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-2">
                      <span className="text-xs text-neutral-300">Afişte Görünen Canlı Yazı:</span>
                      <div className="px-4 py-1.5 bg-white text-[#0d1430] rounded font-black tracking-tight text-xs uppercase shadow-sm">
                        {(() => {
                          if (quickPosterDateText && quickPosterDateText.trim()) {
                            return quickPosterDateText.trim().toUpperCase();
                          }
                          try {
                            const dt = new Date(quickEventDate);
                            if (isNaN(dt.getTime())) return '22 EKİM PERŞEMBE SAAT 20.00';
                            const day = dt.getDate();
                            const monthNames = [
                              'OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN',
                              'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK'
                            ];
                            const dayNames = [
                              'PAZAR', 'PAZARTESİ', 'SALI', 'ÇARŞAMBA', 'PERŞEMBE', 'CUMA', 'CUMARTESİ'
                            ];
                            const monthStr = monthNames[dt.getMonth()];
                            const dayName = dayNames[dt.getDay()];
                            const hours = String(dt.getHours()).padStart(2, '0');
                            const mins = String(dt.getMinutes()).padStart(2, '0');
                            return `${day} ${monthStr} ${dayName} SAAT ${hours}.${mins}`;
                          } catch {
                            return '22 EKİM PERŞEMBE SAAT 20.00';
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Afiş & Slayt Gösterisi Yönetimi (Görseller ve Yazılar) */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                    <Layers className="w-4 h-4 text-purple-700" />
                    <span>4. Afiş & Slayt Gösterisi Yönetimi (Görseller ve Yazılar)</span>
                  </div>
                  {slides.length <= 1 ? (
                    <span className="text-[11px] font-mono text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg font-bold border border-neutral-200">
                      Tek Afiş Modu (Slayt Kapalı)
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg font-bold border border-purple-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-600" />
                      Slayt Gösterisi Aktif ({slides.length} Görsel)
                    </span>
                  )}
                </div>

                {/* Bilgilendirme Notu */}
                <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200 text-xs text-neutral-600 leading-relaxed space-y-1">
                  <p className="font-semibold text-purple-900">
                    {slides.length <= 1 
                      ? '📌 Tek Görsel Kuralı:' 
                      : '✨ Slayt Gösterisi Kuralı:'}
                  </p>
                  <p>
                    {slides.length <= 1
                      ? 'Afiş alanında şu an tek bir görsel var. Kural gereği tek görsel olduğunda slayt gösterisi otomatik olarak devre dışıdır ve sabit afiş olarak sergilenir. Aşağıdaki "Yeni Slayt Ekle" butonuna basıp 2. veya daha fazla görsel eklediğinizde anında otomatik ve oklarla geçişli slayt gösterisine dönüşür.'
                      : `Afiş alanında toplam ${slides.length} görsel bulunmaktadır. Sitede ziyaretçilere ok tuşları, dokunmatik kaydırma veya ${slideInterval} saniyede bir otomatik geçişle slayt gösterisi olarak sunulacaktır.`}
                  </p>
                </div>

                {/* Kontroller: Yeni Slayt Ekle, Süre Seçimi, Orijinale Dön */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAddSlide}
                      className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Yeni Slayt Ekle</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetSlides}
                      className="px-3 py-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-700 font-medium text-xs flex items-center gap-1 cursor-pointer border border-neutral-200"
                      title="Varsayılan tek orijinal afişe dön"
                    >
                      <RotateCcw className="w-3 h-3 text-neutral-500" />
                      <span>Orijinal Tek Afişe Dön</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    {/* Geçiş Efekti Seçenekleri (Parlama ve Silinme) */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-purple-950 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        Geçiş Efekti:
                      </span>
                      <select
                        value={slideEffect}
                        onChange={(e) => setSlideEffect(e.target.value as SlideTransitionEffect)}
                        className="px-2.5 py-1.5 rounded-lg border border-purple-300 text-xs font-bold bg-white text-purple-900 focus:ring-2 focus:ring-purple-500 shadow-2xs cursor-pointer"
                      >
                        <option value="glow-shimmer">✨ Parlama & Işıltı Efekti (Önerilen)</option>
                        <option value="fade-smooth">🌫️ Silinme & Yumuşak Solma (Crossfade)</option>
                        <option value="glow-fade">💫 Parlama + Silinme (Kombinasyon)</option>
                        <option value="slide-horizontal">↔️ Yatay Kayma & Parlama</option>
                        <option value="zoom-pulse">🔍 Derinlikli Zoom & Parlama</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-neutral-600 font-semibold">Süre:</span>
                      <select
                        value={slideInterval}
                        onChange={(e) => setSlideInterval(Number(e.target.value))}
                        className="px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold bg-white text-neutral-800 focus:ring-2 focus:ring-purple-500 cursor-pointer"
                      >
                        <option value={3}>3 Saniye</option>
                        <option value={5}>5 Saniye (Önerilen)</option>
                        <option value={7}>7 Saniye</option>
                        <option value={10}>10 Saniye</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Slayt Listesi */}
                <div className="space-y-4">
                  {slides.map((slide, idx) => {
                    const isMeetingImg =
                      slide.imageUrl === '/kapak-toplanti.jpg' ||
                      slide.imageUrl.includes('kapak-toplanti');

                    return (
                      <div
                        key={slide.id || idx}
                        className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-purple-300 transition-all space-y-3"
                      >
                        {/* Slayt Üst Başlık & Sıralama / Silme */}
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center font-mono">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-neutral-800">
                              {slide.title || `Slayt #${idx + 1}`}
                            </span>
                            {isMeetingImg && (
                              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                                Orijinal Toplantı Afişi
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMoveSlide(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                              title="Yukarı Taşı"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveSlide(idx, 'down')}
                              disabled={idx === slides.length - 1}
                              className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                              title="Aşağı Taşı"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveSlide(idx)}
                              disabled={slides.length <= 1}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ml-1"
                              title={slides.length <= 1 ? 'En az 1 görsel bulunmalıdır' : 'Slaytı Sil'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Slayt İçeriği: Görsel + Yazılar */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
                          {/* Sol: Görsel Önizleme ve Yükleme (4 kolon) */}
                          <div className="md:col-span-4 flex flex-col items-center gap-2">
                            <div className="w-full aspect-square max-w-[140px] rounded-xl overflow-hidden border border-neutral-300 bg-neutral-100 relative group">
                              <img
                                src={slide.imageUrl || '/kapak-toplanti.jpg'}
                                alt={`Slayt ${idx + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/kapak-toplanti.jpg';
                                }}
                              />
                            </div>

                            <input
                              type="file"
                              ref={(el) => {
                                slideFileInputRefs.current[slide.id || idx] = el;
                              }}
                              accept="image/*"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleSlideFileUpload(idx, f);
                              }}
                              className="hidden"
                            />

                            <div className="w-full space-y-1.5">
                              <button
                                type="button"
                                onClick={() => slideFileInputRefs.current[slide.id || idx]?.click()}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer border border-purple-200"
                              >
                                <Upload className="w-3 h-3" />
                                <span>Bilgisayardan Yükle</span>
                              </button>
                              
                              <input
                                type="text"
                                value={slide.imageUrl}
                                onChange={(e) => handleUpdateSlide(idx, { imageUrl: e.target.value })}
                                placeholder="Görsel URL veya /kapak-toplanti.jpg"
                                className="w-full px-2 py-1 rounded-lg border border-neutral-300 text-[11px] font-mono"
                              />
                            </div>
                          </div>

                          {/* Sağ: Metinler ve Yazılar (8 kolon) */}
                          <div className="md:col-span-8 space-y-2.5">
                            <div>
                              <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                                Slayt Başlığı / Yazısı:
                              </label>
                              <input
                                type="text"
                                value={slide.title || ''}
                                onChange={(e) => handleUpdateSlide(idx, { title: e.target.value })}
                                placeholder="Örn: CANLI ZOOM TOPLANTISI veya DETOKS SEMİNERİ"
                                className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 text-xs focus:ring-2 focus:ring-purple-500 font-semibold"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                                Alt Açıklama Metni:
                              </label>
                              <input
                                type="text"
                                value={slide.caption || ''}
                                onChange={(e) => handleUpdateSlide(idx, { caption: e.target.value })}
                                placeholder="Örn: Katılım WhatsApp Gruplarımız üzerindendir."
                                className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 text-xs focus:ring-2 focus:ring-purple-500"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                                  Küçük Etiket (Badge):
                                </label>
                                <input
                                  type="text"
                                  value={slide.badge || ''}
                                  onChange={(e) => handleUpdateSlide(idx, { badge: e.target.value })}
                                  placeholder="Örn: CANLI & ÜCRETSİZ, 2. GÜN"
                                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 text-xs focus:ring-2 focus:ring-purple-500"
                                />
                              </div>

                              <div className="flex items-end">
                                <div className="text-[11px] text-neutral-500 bg-neutral-50 p-2 rounded-lg border border-neutral-200 w-full">
                                  {isMeetingImg ? (
                                    <span className="text-purple-700 font-semibold">
                                      ✓ 3. adımdaki tarih alanı bu görselde canlı gösterilir.
                                    </span>
                                  ) : (
                                    <span>
                                      ✓ Bu görselin altında girdiğiniz başlık ve açıklama şık bir şekilde gösterilir.
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Slayt Önizleme Kutusu (Admin içinde canlı kontrol) */}
                {slides.length > 1 && (
                  <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold flex items-center gap-1.5 text-purple-300">
                        <Play className="w-3.5 h-3.5" />
                        Admin İçi Canlı Slayt Önizlemesi ({previewSlideIdx + 1} / {slides.length})
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setPreviewSlideIdx((prev) => (prev - 1 + slides.length) % slides.length)}
                          className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-[11px] font-bold cursor-pointer"
                        >
                          ‹ Önceki
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewSlideIdx((prev) => (prev + 1) % slides.length)}
                          className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Sonraki ›
                        </button>
                      </div>
                    </div>

                    <div className="relative aspect-video max-w-sm mx-auto rounded-lg overflow-hidden border border-neutral-700 bg-neutral-950 flex items-center justify-center">
                      <img
                        src={slides[previewSlideIdx]?.imageUrl || '/kapak-toplanti.jpg'}
                        alt="Önizleme"
                        className="w-full h-full object-cover"
                      />
                      {(slides[previewSlideIdx]?.title || slides[previewSlideIdx]?.caption || slides[previewSlideIdx]?.badge) && (
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-left">
                          {slides[previewSlideIdx]?.badge && (
                            <span className="inline-block px-1.5 py-0.5 rounded bg-purple-600 text-white text-[9px] font-bold uppercase mb-1">
                              {slides[previewSlideIdx]?.badge}
                            </span>
                          )}
                          {slides[previewSlideIdx]?.title && (
                            <p className="text-xs font-bold text-white leading-tight">
                              {slides[previewSlideIdx]?.title}
                            </p>
                          )}
                          {slides[previewSlideIdx]?.caption && (
                            <p className="text-[10px] text-neutral-300 leading-tight mt-0.5">
                              {slides[previewSlideIdx]?.caption}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Canlıya Kaydet Butonları */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    onClick={handleSaveQuickSettings}
                    disabled={isSavingHostinger}
                    className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavingHostinger ? 'Kaydediliyor...' : 'Değişiklikleri Canlıya Kaydet'}</span>
                  </button>

                  <button
                    onClick={handleDownloadSettingsJson}
                    className="px-4 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer border border-neutral-300 transition-all"
                    title="settings.json dosyasını indirip Hostinger public_html içine de yükleyebilirsiniz"
                  >
                    <Download className="w-4 h-4" />
                    <span>settings.json İndir</span>
                  </button>
                </div>

                {hostingerStatus && (
                  <p className="text-xs font-semibold p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 animate-fadeIn">
                    ✓ {hostingerStatus}
                  </p>
                )}
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: SECTIONS VISIBILITY (BÖLÜMLERİ AÇ / KAPAT)                          */}
          {/* ========================================================================= */}
          {activeTab === 'sections' && (
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 font-sans flex items-center gap-2">
                    <LayoutList className="w-4 h-4 text-emerald-600" />
                    <span>Sitedeki Bölümleri Açıp Kapatma</span>
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    İstediğiniz bölümün anahtarını kapatarak anında sayfadan gizleyebilirsiniz. Sayfayı yenilemeden canlıya yansır.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setAllSectionsVisibility(true);
                      triggerToast();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors cursor-pointer border border-emerald-200"
                  >
                    Tümünü Aç
                  </button>
                  <button
                    onClick={() => {
                      setAllSectionsVisibility(false);
                      triggerToast();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold transition-colors cursor-pointer border border-neutral-200"
                  >
                    Tümünü Kapat
                  </button>
                </div>
              </div>

              {/* 10 Sections Grid */}
              <div className="grid grid-cols-1 gap-3">
                {sectionsList.map((sec) => {
                  const isVisible = visibility[sec.key] !== false;
                  return (
                    <div
                      key={sec.key}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                        isVisible
                          ? 'bg-white border-neutral-200 shadow-2xs'
                          : 'bg-neutral-100/70 border-neutral-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="text-2xl mt-0.5">{sec.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                              {sec.name}
                            </h4>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isVisible
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-neutral-200 text-neutral-600'
                              }`}
                            >
                              {isVisible ? 'Açık (Sitede Görünüyor)' : 'Kapalı (Gizlendi)'}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                            {sec.desc}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          updateSectionVisibility(sec.key, !isVisible);
                          triggerToast();
                        }}
                        className={`p-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                          isVisible
                            ? 'text-emerald-600 hover:bg-emerald-50'
                            : 'text-neutral-400 hover:bg-neutral-200'
                        }`}
                        title={isVisible ? 'Bölümü Gizle' : 'Bölümü Göster'}
                      >
                        {isVisible ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex justify-end">
                <button
                  onClick={handleSaveQuickSettings}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Bölüm Ayarlarını Canlıya Kaydet</span>
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: CONTENT & POSTER EDITING                                           */}
          {/* ========================================================================= */}
          {activeTab === 'content' && (
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* Afiş & Slayt Gösterisi Durum Kartı */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-700" />
                    <span>Kapak Afişi & Slayt Gösterisi ({slides.length} Görsel)</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('quick')}
                    className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs flex items-center gap-1 cursor-pointer border border-purple-200"
                  >
                    <span>⚡ Hızlı Ayarlar'da Yönet</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-neutral-300 shrink-0 bg-neutral-200">
                    <img 
                      src={slides[0]?.imageUrl || '/kapak-toplanti.jpg'} 
                      alt="Afiş Önizleme" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/kapak-toplanti.jpg';
                      }}
                    />
                  </div>

                  <div className="space-y-1 text-xs text-neutral-600 flex-1">
                    <p className="font-bold text-neutral-900">
                      {slides.length <= 1 
                        ? '📌 Tek Afiş Modu (Slayt Kapalı)' 
                        : `✨ Slayt Gösterisi Aktif (${slides.length} Görsel)`}
                    </p>
                    <p className="text-neutral-500 text-[11px] leading-relaxed">
                      {slides.length <= 1 
                        ? 'Şu an sitede tek bir afiş sergileniyor. Yeni görseller ve yazılar ekleyerek slayt gösterisi oluşturmak için "Hızlı Ayarlar" sekmesindeki 4. adımı kullanabilirsiniz.'
                        : `Toplam ${slides.length} adet görsel ve özel başlık/açıklama metinleri yapılandırılmıştır. Otomatik geçiş ve ok butonlarıyla sitede sergilenmektedir.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hero Metinleri */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#514177]" />
                  <span>Üst Header Logo & Hero Metinleri</span>
                </h3>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-purple-50/50 rounded-xl border border-purple-200">
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Sitenin Üst Kısmındaki Doktor / Uzman İsmi:
                      </label>
                      <input
                        type="text"
                        value={quickDoctorName}
                        onChange={(e) => setQuickDoctorName(e.target.value)}
                        placeholder="DR. ABDULLAH KESGİN"
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold uppercase tracking-wider bg-white focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Logo Marka İsmi:
                      </label>
                      <input
                        type="text"
                        value={quickBrandTitle}
                        onChange={(e) => setQuickBrandTitle(e.target.value)}
                        placeholder="detox"
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold bg-white focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Üst Duyuru Metni:
                    </label>
                    <input
                      type="text"
                      value={editAnnouncement}
                      onChange={(e) => setEditAnnouncement(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                      placeholder="Kendinize bir akşam ayırın."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Ana Başlık (H1):
                    </label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold"
                      placeholder="Bedenine kulak ver. Değişime birlikte başlayalım."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Giriş Açıklama Paragrafı:
                    </label>
                    <textarea
                      rows={3}
                      value={editIntro}
                      onChange={(e) => setEditIntro(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Etkinlik / Program Adı:
                    </label>
                    <input
                      type="text"
                      value={editEventTitle}
                      onChange={(e) => setEditEventTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                      placeholder="Tıbbi Detoks ve Bütünsel Arınma"
                    />
                  </div>
                </div>
              </div>

              {/* Buluşma Hakkında */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <span className="text-base">📖</span>
                  <span>Buluşma Hakkında Paragrafları</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">1. Paragraf:</label>
                    <textarea
                      rows={3}
                      value={editAbout}
                      onChange={(e) => setEditAbout(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">2. Paragraf:</label>
                    <textarea
                      rows={3}
                      value={editAbout2}
                      onChange={(e) => setEditAbout2(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* SSS (Merak Edilenler) */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    <span>Merak Edilenler (SSS Soru & Cevapları)</span>
                  </h3>
                  <button
                    onClick={() => {
                      const newFaq: FaqItem = {
                        id: 'faq-' + Date.now(),
                        q: 'Yeni Soru Başlığı',
                        a: 'Yeni sorunun detaylı yanıtı buraya gelecek.',
                      };
                      setFaqItems([...faqItems, newFaq]);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 border border-emerald-200 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Yeni Soru Ekle</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {faqItems.map((item, idx) => (
                    <div key={item.id} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold text-neutral-500">#{idx + 1}</span>
                        <input
                          type="text"
                          value={item.q}
                          onChange={(e) => {
                            const updated = [...faqItems];
                            updated[idx].q = e.target.value;
                            setFaqItems(updated);
                          }}
                          className="flex-1 px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs font-bold bg-white"
                        />
                        <button
                          onClick={() => setFaqItems(faqItems.filter((_, i) => i !== idx))}
                          className="text-neutral-400 hover:text-red-600 p-1 rounded cursor-pointer"
                          title="Soruyu Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={item.a}
                        onChange={(e) => {
                          const updated = [...faqItems];
                          updated[idx].a = e.target.value;
                          setFaqItems(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Sosyal Medya Kartı */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                      Footer Sosyal Medya Hesapları ({socialList.filter(s => s.enabled !== false).length} Aktif / {socialList.length} Toplam)
                    </h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                      Instagram, YouTube, Facebook, Telegram ve diğer sosyal bağlantılarınızı "Hızlı Ayarlar" sekmesinden kolayca ekleyebilir ve sıralayabilirsiniz.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('quick')}
                  className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold shrink-0 border border-purple-200 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Sosyal Medyayı Yönet</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tıbbi Not */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-2">
                <label className="block text-xs font-bold text-neutral-700">
                  Sağlık & Tıbbi Bilgilendirme Notu:
                </label>
                <textarea
                  rows={2}
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              {/* Save All Content Button */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 flex justify-end">
                <button
                  onClick={handleSaveAllContent}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Tüm Metin Değişikliklerini Kaydet</span>
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: HOSTINGER DEPLOYMENT GUIDE                                         */}
          {/* ========================================================================= */}
          {activeTab === 'hostinger' && (
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div className="p-5 rounded-2xl bg-[#287653] text-white space-y-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-emerald-200" />
                  <h3 className="text-base font-bold">Hostinger'da Yayınlama Rehberi</h3>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Bu web sitesi, Hostinger paylaşımlı veya bulut barındırma paketlerinde hiçbir ek veritabanı kurmaya gerek kalmadan doğrudan çalışacak şekilde tasarlanmıştır.
                </p>
              </div>

              {/* Adım Adım Rehber */}
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-5 text-xs text-neutral-700 leading-relaxed">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#514177] text-white flex items-center justify-center font-bold shrink-0 text-xs">
                      1
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900">Projeyi Derleyin (Build)</h4>
                      <p className="text-neutral-600 mt-1">
                        Terminalde aşağıdaki komutu çalıştırın. Bu işlem <code className="bg-neutral-100 font-mono px-1 py-0.5 rounded text-[11px]">dist</code> klasörünün içine optimize edilmiş dosyaları çıkartır:
                      </p>
                      <pre className="p-2.5 rounded-xl bg-neutral-900 text-emerald-400 font-mono text-[11px] mt-2">
                        npm run build
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#514177] text-white flex items-center justify-center font-bold shrink-0 text-xs">
                      2
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900">Hostinger Dosya Yöneticisine Yükleyin</h4>
                      <p className="text-neutral-600 mt-1">
                        Hostinger hPanel &gt; <strong>Dosya Yöneticisi (File Manager)</strong> alanına gidin. <code className="bg-neutral-100 font-mono px-1 py-0.5 rounded text-[11px]">public_html</code> klasörünü açın.
                      </p>
                      <p className="text-neutral-600 mt-1">
                        <code className="bg-neutral-100 font-mono px-1 py-0.5 rounded text-[11px]">dist</code> klasörünün içindeki tüm dosyaları (index.html, assets klasörü, kapak-toplanti.jpg, settings.json ve save-settings.php) doğrudan <code className="bg-neutral-100 font-mono px-1 py-0.5 rounded text-[11px]">public_html</code> içine yükleyin.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#514177] text-white flex items-center justify-center font-bold shrink-0 text-xs">
                      3
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900">Tarih ve Linkleri İstediğiniz Zaman Değiştirin</h4>
                      <p className="text-neutral-600 mt-1">
                        Sitenize girin, en alttaki <strong>· Yönetici</strong> bağlantısına tıklayın (veya klavyeden <strong>Alt + A</strong> tuşlayın).
                      </p>
                      <p className="text-neutral-600 mt-1">
                        Şifrenizi (<strong>Detoks8080*</strong>) girin. Yeni tarihi ve yeni WhatsApp bağlantısını yazıp <strong>Canlıya Kaydet</strong> butonuna basın.
                      </p>
                      <p className="text-neutral-600 mt-1">
                        Sunucudaki <code className="bg-neutral-100 font-mono px-1 py-0.5 rounded text-[11px]">save-settings.php</code> betiği, <code className="bg-neutral-100 font-mono px-1 py-0.5 rounded text-[11px]">settings.json</code> dosyasını otomatik olarak günceller ve tüm ziyaretçiler yenilenen tarihi/linki anında görür!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hızlı İndirmeler */}
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 mt-4">
                  <span className="font-bold text-neutral-800 block">Hostinger İçin Gerekli Dosyaları İndirin:</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={handleDownloadSettingsJson}
                      className="px-3.5 py-2 rounded-xl bg-white border border-neutral-300 text-neutral-800 font-bold text-xs flex items-center gap-1.5 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>settings.json İndir</span>
                    </button>
                    <a
                      href="/save-settings.php"
                      download="save-settings.php"
                      className="px-3.5 py-2 rounded-xl bg-white border border-neutral-300 text-neutral-800 font-bold text-xs flex items-center gap-1.5 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>save-settings.php İndir</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: SECURITY & BACKUP                                                  */}
          {/* ========================================================================= */}
          {activeTab === 'security' && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Şifre Değiştirme */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                  <KeyRound className="w-4 h-4 text-neutral-700" />
                  <span>Yönetici Paneli Giriş Şifresi</span>
                </div>

                <p className="text-xs text-neutral-500">
                  Mevcut giriş şifresi: <code className="bg-neutral-100 px-2 py-0.5 rounded font-mono font-bold text-neutral-900">{content.adminPassword || 'Detoks8080*'}</code>
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="Yeni şifre belirleyin..."
                    className="flex-1 px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                  />
                  <button
                    onClick={() => {
                      if (!newPasswordInput.trim()) return;
                      changeAdminPassword(newPasswordInput.trim());
                      setNewPasswordInput('');
                      setPasswordToast(true);
                      setTimeout(() => setPasswordToast(false), 3000);
                    }}
                    className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs cursor-pointer"
                  >
                    Şifreyi Güncelle
                  </button>
                </div>

                {passwordToast && (
                  <p className="text-xs text-emerald-700 font-bold">
                    ✓ Yönetici şifreniz başarıyla güncellendi!
                  </p>
                )}
              </div>

              {/* Yedekleme & Geri Yükleme */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                  <Download className="w-4 h-4 text-neutral-700" />
                  <span>İçerik Yedeği & Dışa Aktar</span>
                </div>

                <p className="text-xs text-neutral-500">
                  Tüm ayarları, açık/kapalı bölümleri ve metinleri tek bir JSON dosyası olarak kaydedebilir veya geri yükleyebilirsiniz.
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleExportFullBackup}
                    className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-neutral-200"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Yedek Dosyasını İndir (.json)</span>
                  </button>

                  <label className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-neutral-200">
                    <FileUp className="w-3.5 h-3.5" />
                    <span>Yedek Yükle</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportBackup}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Fabrika Ayarlarına Dön */}
              <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-3">
                <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
                  <RotateCcw className="w-4 h-4 text-red-700" />
                  <span>Fabrika Ayarlarına Dön</span>
                </div>
                <p className="text-xs text-red-700">
                  Tüm ayarları sıfırlayıp detox.drabdullahkesgin.com orijinal varsayılanlarına döndürür.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm('Tüm ayarları orijinal varsayılan değerlere sıfırlamak istediğinize emin misiniz?')) {
                      resetToDefault();
                      triggerToast();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer"
                >
                  Varsayılanlara Sıfırla
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
