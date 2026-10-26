import React, { createContext, useContext, useState, useEffect } from 'react';
import { Doctor, INITIAL_DOCTORS } from '../data/doctors';

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface SignalItem {
  id: string;
  icon: string;
  tag: string;
  title: string;
  description: string;
  bottomText: string;
  cardColor: 'peach' | 'lime' | 'lavender';
}

export interface JourneyStep {
  step: string;
  title: string;
  description: string;
}

export interface SectionVisibility {
  announcement: boolean;
  hero: boolean;
  topicStrip: boolean;
  signals: boolean;
  about: boolean;
  journey: boolean;
  invitation: boolean;
  faq: boolean;
  healthNote: boolean;
  mobileCta: boolean;
  // Backward compatibility keys
  symptoms?: boolean;
  dailyRoutine?: boolean;
  detoxWhyAndHow?: boolean;
  eveningZoomSessions?: boolean;
  whatsAppGroupsSystem?: boolean;
  expertSupport?: boolean;
  simpleSystem?: boolean;
  emotionalValue?: boolean;
}

export interface EveningSessionItem {
  id: string;
  emoji: string;
  title: string;
  instructor: string;
}

export interface WhatIsIncludedItem {
  id: string;
  title: string;
  description: string;
  subtext: string;
}

export interface SimpleSystemItem {
  step: string;
  title: string;
  description: string;
  tag: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
}

export const DEFAULT_SECTION_VISIBILITY: SectionVisibility = {
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

export const DEFAULT_SIGNALS: SignalItem[] = [
  {
    id: 'sig-1',
    icon: '☀',
    tag: '01 / ENERJİ',
    title: 'Uyandınız.\nAma dinlenemediniz.',
    description: 'Güne yorgun başlıyor, gün içinde kendinize ayıracak enerjiyi bulmakta zorlanıyor musunuz?',
    bottomText: 'Biraz durup kendinizi dinleyin. ↗',
    cardColor: 'peach',
  },
  {
    id: 'sig-2',
    icon: '◎',
    tag: '02 / BESLENME',
    title: 'Bir öğün daha.\nYine ağırlık hissi.',
    description: 'Sık atıştırmak, geç saatlerde yemek ve yemeklerden sonra şişkinlik hissetmek tanıdık geliyor mu?',
    bottomText: 'Alışkanlıklarınıza yeniden bakın. ↗',
    cardColor: 'lime',
  },
  {
    id: 'sig-3',
    icon: '☾',
    tag: '03 / DENGE',
    title: 'Değişmek istiyorsunuz.\nBaşlamak zor geliyor.',
    description: 'Uyku, hareket, beslenme… Günün koşturmacasında kendi ihtiyaçlarınız hep en sona mı kalıyor?',
    bottomText: 'İlk adımı birlikte atalım. ↗',
    cardColor: 'lavender',
  },
];

export const DEFAULT_JOURNEY_STEPS: JourneyStep[] = [
  {
    step: '01',
    title: 'Bedeninizi anlamak',
    description: 'Detoks kavramını, sık duyulan iddiaları ve sağlıklı yaşamla ilişkisini konuşalım.',
  },
  {
    step: '02',
    title: 'Uzmanlardan dinlemek',
    description: 'Beslenme, hareket ve uykuya bütünsel bir bakış; uzmanlarla canlı buluşma ve 7 günlük takip programını tanıma fırsatı. Başlangıç için ihtiyacınız olan katılım bilgileri WhatsApp grubunda.',
  },
  {
    step: '03',
    title: 'Birlikte başlamak',
    description: 'WhatsApp grubuna katılın; toplantı bağlantısına ve program duyurularına tek yerden ulaşın.',
  },
];

export const DEFAULT_FAQ: FaqItem[] = [
  {
    id: 'faq-1',
    q: 'Toplantıya nasıl katılabilirim?',
    a: 'WhatsApp grubuna katılın. Zoom toplantı bağlantısı ve katılım bilgileri grup üzerinden paylaşılacak. Bu sayfadan ayrıca kayıt formu doldurmanız gerekmiyor.',
  },
  {
    id: 'faq-2',
    q: 'Katılım ücretli mi?',
    a: 'Tanıtım semineri ücretsizdir. 7 günlük takip programının kapsamı ve varsa ek ürün veya hizmet koşulları için gruptaki duyuruları inceleyin.',
  },
  {
    id: 'faq-3',
    q: 'Detoks hakkında ne bilmeliyim?',
    a: '“Detoks” farklı uygulamalar için kullanılan bir kavramdır. Bu uygulamaların toksin atma ve kalıcı kilo kaybı iddialarını destekleyen güçlü kanıtlar yoktur. Buluşmayı sağlıklı yaşam alışkanlıkları hakkında bilgi edinme fırsatı olarak değerlendirin.',
  },
  {
    id: 'faq-4',
    q: 'Bu program herkes için uygun mu?',
    a: 'Uygunluk kişisel sağlık durumunuza göre değişir. Kronik hastalığınız, düzenli ilaç kullanımınız varsa, hamileyseniz veya emziriyorsanız bir uygulamaya başlamadan önce hekiminizle görüşün. Seminer kişisel tıbbi değerlendirme yerine geçmez.',
  },
];

export const DEFAULT_EVENING_SESSIONS: EveningSessionItem[] = [
  { id: 'sess-1', emoji: '🧘‍♀️', title: 'Yüz Yogası & Doğal Güzellik', instructor: 'Aslı Özden' },
  { id: 'sess-2', emoji: '🌬️', title: 'Nefes Eğitimi & Zihin Dinginliği', instructor: 'Merve Nayman' },
  { id: 'sess-3', emoji: '✨', title: 'EFT & Stres Boşaltma', instructor: 'Aygün Güleşir' },
  { id: 'sess-4', emoji: '😄', title: 'Kahkaha & Pozitif Enerji', instructor: 'Gülay İdalı' },
  { id: 'sess-5', emoji: '🧠', title: 'Nöroformat Meditasyon', instructor: 'Fazilet Eberdes' },
  { id: 'sess-6', emoji: '🌸', title: 'Beden & Zihin Terapi', instructor: 'Sibel Odabaşı' },
  { id: 'sess-7', emoji: '🔬', title: 'Bilinçli Beslenme & Gıda', instructor: 'Erdem Öner (TÜBİTAK Gıda Müh.)' },
  { id: 'sess-8', emoji: '💖', title: 'Duygusal Yenilenme (JAAS)', instructor: 'Ayten Demir' },
];

export const DEFAULT_SYMPTOMS: string[] = [
  'Sabahları yorgun uyanma hali',
  'Vücutta geçmeyen şişkinlik ve ödem',
  'Tatlı ve sürekli atıştırma krizleri',
  'Rahatsız ve kalitesiz uyku',
  'Gün içi baş ağrısı ve halsizlik',
  'Zihinsel yorgunluk ve moralsizlik',
];

export type SlideTransitionEffect = 'glow-shimmer' | 'fade-smooth' | 'glow-fade' | 'slide-horizontal' | 'zoom-pulse' | 'flip-card';

export interface PosterSlide {
  id: string;
  imageUrl: string;
  title?: string;
  caption?: string;
  badge?: string;
}

export interface SiteContent {
  doctorName?: string;
  brandTitle?: string;
  announcementText: string;
  announcementSubtext: string;
  title: string;
  intro: string;
  eventTitle: string;
  eventDate: string;
  whatsappUrl: string;
  cta: string;
  about: string;
  about2: string;
  program: string;
  note: string;
  posterImage: string;
  posterDateText?: string;
  hidePosterStaticDate?: boolean;
  posterSlides?: PosterSlide[];
  slideIntervalSeconds?: number;
  slideTransitionEffect?: SlideTransitionEffect;
  adminPassword?: string;
  hostingerWebhookUrl?: string;
  sectionsVisibility: SectionVisibility;
  signalsList: SignalItem[];
  journeyList: JourneyStep[];
  faq: FaqItem[];
  // Legacy fields
  eveningSessions: EveningSessionItem[];
  symptoms: string[];
  hero: {
    pill: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    description: string;
    quote: string;
    subQuote: string;
    ctaText: string;
    supportingPill: string;
    customHeroImage?: string;
    heroImageCaption?: string;
  };
  whatIsIncluded: WhatIsIncludedItem[];
  simpleSystem: SimpleSystemItem[];
  doctors: Doctor[];
  emotionalValue: {
    badge: string;
    title: string;
    subheading: string;
    paragraph: string;
    ctaText: string;
  };
}

export const DEFAULT_POSTER_SLIDES: PosterSlide[] = [
  {
    id: 'slide-1',
    imageUrl: '/kapak-toplanti.jpg',
    title: 'CANLI ZOOM TOPLANTISI',
    caption: 'Katılım WhatsApp Gruplarımız üzerindendir.',
    badge: 'CANLI & ÜCRETSİZ',
  },
];

export const DEFAULT_SITE_CONTENT: SiteContent = {
  doctorName: 'DR. ABDULLAH KESGİN',
  brandTitle: 'detox',
  announcementText: 'Kendinize bir akşam ayırın.',
  announcementSubtext: 'Ücretsiz canlı tanıtım semineri',
  title: 'Bedenine kulak ver. Değişime birlikte başlayalım.',
  intro: 'Sabah yorgun uyanmak, gün boyu şişkinlik hissetmek, bir türlü düzene giremeyen alışkanlıklar… Kendinize yeniden iyi bakmanın zamanı. İlk adımı uzmanlarla, birlikte atalım.',
  eventTitle: 'Tıbbi Detoks ve Bütünsel Arınma',
  eventDate: '2026-10-22T20:00:00+03:00',
  whatsappUrl: 'https://chat.whatsapp.com/ItHdw0hFUecEZMRWCLAoMU',
  cta: 'Ücretsiz WhatsApp grubuna katıl',
  about: 'Bazen aç olmadığımız halde atıştırıyor, yoğun günlerde öğünlerimizi ve dinlenmeyi ikinci plana atıyoruz. Sonra da “Neden kendimi iyi hissetmiyorum?” diye soruyoruz. Bu buluşma, alışkanlıklarınıza durup yeniden bakmanız için bir davet.',
  about2: 'Hazır cevaplar yerine doğru sorularla başlayalım: Beslenmemde neleri gözden geçirebilirim? Uykuma ve hareket etmeye nasıl alan açabilirim? Sorularınızı not edin, buluşmada uzmanları dinleyin.',
  program: 'Beslenme, hareket ve uykuya bütünsel bir bakış; uzmanlarla canlı buluşma ve 7 günlük takip programını tanıma fırsatı. Başlangıç için ihtiyacınız olan katılım bilgileri WhatsApp grubunda.',
  note: 'Bu etkinlik genel bilgilendirme amaçlıdır; tanı ve tedavi yerine geçmez. Detoks uygulamalarının toksin atma ve kalıcı kilo kaybı iddiaları için güçlü bilimsel kanıt bulunmamaktadır. Süregelen şikâyetleriniz varsa veya beslenmenizi değiştirmeyi düşünüyorsanız hekiminize danışın.',
  posterImage: '/kapak-toplanti.jpg',
  posterDateText: '',
  hidePosterStaticDate: true,
  posterSlides: DEFAULT_POSTER_SLIDES,
  slideIntervalSeconds: 5,
  slideTransitionEffect: 'glow-shimmer',
  adminPassword: 'Detoks8080*',
  hostingerWebhookUrl: '',
  sectionsVisibility: DEFAULT_SECTION_VISIBILITY,
  signalsList: DEFAULT_SIGNALS,
  journeyList: DEFAULT_JOURNEY_STEPS,
  faq: DEFAULT_FAQ,
  eveningSessions: DEFAULT_EVENING_SESSIONS,
  symptoms: DEFAULT_SYMPTOMS,
  hero: {
    pill: '🌿 7 Günlük 1. Seviye Detoks Tanıtım Programı Başlıyor — Kontenjan Sınırlıdır!',
    titleLine1: 'Online Detoks',
    titleLine2: 'Programı Başlıyor',
    subtitle: '⚡ Dr. Abdullah KESGİN & Uzm. Dr. Eyyüb YILMAZ ve 45 Kişilik Ekip Eşliğinde',
    description: 'Sabahları zor uyanmaktan, geçmeyen ödem ve yorgunluk hissinden yoruldun mu? Aç kalmadan, evinin düzenini bozmadan ve yalnız olmadan bedenini 7 günde sıfırla.',
    quote: 'Hayatını durdurma. Programı hayatının içine al.',
    subQuote: 'Aç kalmadan, günlük hayatının içinde kolayca hafifle ve enerjini tazele.',
    ctaText: 'DETOKS TANITIMINA KATIL →',
    supportingPill: '🌿 Ücretsiz Tanıtım Programı · 🏠 Evinin Konforunda · 👩‍⚕️ 45 Kişilik Uzman Heyeti',
    customHeroImage: '/kapak-toplanti.jpg',
    heroImageCaption: 'Dr. Abdullah KESGİN & Uzm. Dr. Eyyüb YILMAZ ve 45 Kişilik Heyet Eşliğinde',
  },
  whatIsIncluded: [
    {
      id: 'item-1',
      title: 'Günlük Menü',
      description: 'Detoks planı ve dengeli beslenme rehberi.',
      subtext: 'Aç kalmadan, arındıran beslenme',
    },
    {
      id: 'item-2',
      title: 'Hareket',
      description: 'Günlük yaşama uyarlanabilen hareket içerikleri.',
      subtext: 'Günde 15 dakika hafif esneme',
    },
  ],
  simpleSystem: [
    {
      step: '01',
      title: 'WhatsApp grubunu takip et',
      description: 'Grup duyurularını ve günün akışını telefonundan düzenli takip et.',
      tag: '01 · Takip Et',
    },
  ],
  doctors: INITIAL_DOCTORS,
  emotionalValue: {
    badge: 'Kendinize Ayıracağınız En Değerli 7 Gün',
    title: '7 GÜNÜ KENDİN İÇİN AYIR.',
    subheading: 'Hayatını değiştirmek için her şeyi değiştirmek zorunda değilsin.',
    paragraph: 'Her gün yoğun tempo içinde kendine vakit bulamayabiliyorsun. Şimdi 7 gün boyunca güçlü grup motivasyonuyla bedenine ve sağlığına odaklanma zamanı.',
    ctaText: 'WHATSAPP GRUBUNA KATIL',
  },
};

const STORAGE_KEY = 'kesgin_detox_site_content_v14';
const AUTH_STORAGE_KEY = 'kesgin_detox_admin_auth_v2';
const LEADS_STORAGE_KEY = 'kesgin_detox_leads_v2';
const OLD_DEFAULT_WHATSAPP = 'https://chat.whatsapp.com/BpbTaRKJJ802SurZ1gTzn1?s';
const NEW_DEFAULT_WHATSAPP = 'https://chat.whatsapp.com/ItHdw0hFUecEZMRWCLAoMU';

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  updateSectionVisibility: (sectionKey: keyof SectionVisibility, isVisible: boolean) => void;
  setAllSectionsVisibility: (visible: boolean) => void;
  updateSignals: (signals: SignalItem[]) => void;
  updateJourney: (journey: JourneyStep[]) => void;
  updateFaq: (faq: FaqItem[]) => void;
  saveSettingsToHostinger: (
    newDate: string, 
    newWhatsapp: string, 
    newPosterDateText?: string, 
    newHidePosterStaticDate?: boolean,
    newPosterSlides?: PosterSlide[],
    newSlideIntervalSeconds?: number,
    newSlideTransitionEffect?: SlideTransitionEffect,
    newDoctorName?: string,
    newBrandTitle?: string
  ) => Promise<{ success: boolean; message: string }>;
  resetToDefault: () => void;
  
  // Leads management
  leads: Lead[];
  addLead: (leadData: { name: string; phone: string; email: string }) => Promise<void>;
  deleteLead: (id: string) => void;
  clearAllLeads: () => void;

  // Auth & Admin state
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  openAdminWithAuth: () => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (newPass: string) => void;

  // Compatibility helpers
  updateHero?: (heroData: any) => void;
  updateDoctors?: (doctors: Doctor[]) => void;
  updateDoctorPhoto?: (doctorId: string, base64Image: string) => void;
  updateDoctorInfo?: (doctorId: string, doctorData: Partial<Doctor>) => void;
  updateWhatIsIncluded?: (items: WhatIsIncludedItem[]) => void;
  updateSimpleSystem?: (steps: SimpleSystemItem[]) => void;
  updateEmotionalValue?: (data: any) => void;
  updateEveningSessions?: (sessions: EveningSessionItem[]) => void;
  updateSymptoms?: (symptoms: string[]) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('kesgin_detox_site_content_v12');
      if (saved) {
        const parsed = JSON.parse(saved);
        const resolvedWhatsapp =
          !parsed.whatsappUrl ||
          parsed.whatsappUrl === OLD_DEFAULT_WHATSAPP ||
          parsed.whatsappUrl.includes('BpbTaRKJJ')
            ? NEW_DEFAULT_WHATSAPP
            : parsed.whatsappUrl;

        return {
          ...DEFAULT_SITE_CONTENT,
          ...parsed,
          whatsappUrl: resolvedWhatsapp,
          adminPassword: parsed.adminPassword || DEFAULT_SITE_CONTENT.adminPassword,
          sectionsVisibility: { ...DEFAULT_SECTION_VISIBILITY, ...(parsed.sectionsVisibility || {}) },
          signalsList: parsed.signalsList || DEFAULT_SIGNALS,
          journeyList: parsed.journeyList || DEFAULT_JOURNEY_STEPS,
          faq: parsed.faq || DEFAULT_FAQ,
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SITE_CONTENT;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const savedLeads = localStorage.getItem(LEADS_STORAGE_KEY);
      if (savedLeads) return JSON.parse(savedLeads);
    } catch {
      // Ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch {
      // Ignore
    }
  }, [leads]);

  const addLead = async (leadData: { name: string; phone: string; email: string }) => {
    const newLead: Lead = {
      id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: leadData.name.trim(),
      phone: leadData.phone.trim(),
      email: leadData.email.trim(),
      createdAt: new Date().toISOString(),
    };

    setLeads((prev) => [newLead, ...prev]);

    if (content.hostingerWebhookUrl && content.hostingerWebhookUrl.trim().startsWith('http')) {
      try {
        await fetch(content.hostingerWebhookUrl.trim(), {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newLead),
        });
      } catch (err) {
        console.warn('Hostinger webhook transmission:', err);
      }
    }
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const clearAllLeads = () => {
    setLeads([]);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [content]);

  // Load server-side settings.json on mount (for live Hostinger deployment)
  useEffect(() => {
    fetch('/settings.json?t=' + Date.now())
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setContent((prev) => ({
            ...prev,
            eventDate: data.eventDate || prev.eventDate,
            whatsappUrl: data.whatsappUrl || prev.whatsappUrl,
            eventTitle: data.eventTitle || prev.eventTitle,
            ...(data.doctorName !== undefined ? { doctorName: data.doctorName } : {}),
            ...(data.brandTitle !== undefined ? { brandTitle: data.brandTitle } : {}),
            ...(data.posterDateText !== undefined ? { posterDateText: data.posterDateText } : {}),
            ...(data.hidePosterStaticDate !== undefined ? { hidePosterStaticDate: data.hidePosterStaticDate } : {}),
            ...(Array.isArray(data.posterSlides) && data.posterSlides.length > 0 ? { posterSlides: data.posterSlides } : {}),
            ...(typeof data.slideIntervalSeconds === 'number' ? { slideIntervalSeconds: data.slideIntervalSeconds } : {}),
            ...(data.slideTransitionEffect ? { slideTransitionEffect: data.slideTransitionEffect } : {}),
            ...(data.sectionsVisibility ? { sectionsVisibility: { ...prev.sectionsVisibility, ...data.sectionsVisibility } } : {}),
          }));
        }
      })
      .catch(() => {});
  }, []);

  const openAdminWithAuth = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const loginAdmin = (password: string): boolean => {
    const currentPassword = content.adminPassword || DEFAULT_SITE_CONTENT.adminPassword || 'Detoks8080*';
    if (password === currentPassword) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch {
        // Ignore
      }
      setIsPasswordModalOpen(false);
      setIsAdminOpen(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    setIsAdminOpen(false);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const changeAdminPassword = (newPass: string) => {
    setContent((prev) => ({
      ...prev,
      adminPassword: newPass,
    }));
  };

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent((prev) => ({ ...prev, ...newContent }));
  };

  const updateSectionVisibility = (sectionKey: keyof SectionVisibility, isVisible: boolean) => {
    setContent((prev) => ({
      ...prev,
      sectionsVisibility: {
        ...prev.sectionsVisibility,
        [sectionKey]: isVisible,
      },
    }));
  };

  const setAllSectionsVisibility = (visible: boolean) => {
    setContent((prev) => ({
      ...prev,
      sectionsVisibility: {
        announcement: visible,
        hero: visible,
        topicStrip: visible,
        signals: visible,
        about: visible,
        journey: visible,
        invitation: visible,
        faq: visible,
        healthNote: visible,
        mobileCta: visible,
      },
    }));
  };

  const updateSignals = (signals: SignalItem[]) => {
    setContent((prev) => ({ ...prev, signalsList: signals }));
  };

  const updateJourney = (journey: JourneyStep[]) => {
    setContent((prev) => ({ ...prev, journeyList: journey }));
  };

  const updateFaq = (faq: FaqItem[]) => {
    setContent((prev) => ({ ...prev, faq }));
  };

  const saveSettingsToHostinger = async (
    newDate: string, 
    newWhatsapp: string, 
    newPosterDateText?: string, 
    newHidePosterStaticDate?: boolean,
    newPosterSlides?: PosterSlide[],
    newSlideIntervalSeconds?: number,
    newSlideTransitionEffect?: SlideTransitionEffect,
    newDoctorName?: string,
    newBrandTitle?: string
  ) => {
    setContent((prev) => ({
      ...prev,
      eventDate: newDate,
      whatsappUrl: newWhatsapp,
      ...(newDoctorName !== undefined ? { doctorName: newDoctorName } : {}),
      ...(newBrandTitle !== undefined ? { brandTitle: newBrandTitle } : {}),
      ...(newPosterDateText !== undefined ? { posterDateText: newPosterDateText } : {}),
      ...(newHidePosterStaticDate !== undefined ? { hidePosterStaticDate: newHidePosterStaticDate } : {}),
      ...(newPosterSlides !== undefined ? { posterSlides: newPosterSlides } : {}),
      ...(newSlideIntervalSeconds !== undefined ? { slideIntervalSeconds: newSlideIntervalSeconds } : {}),
      ...(newSlideTransitionEffect !== undefined ? { slideTransitionEffect: newSlideTransitionEffect } : {}),
    }));

    try {
      const resp = await fetch('/save-settings.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: content.adminPassword || 'Detoks8080*',
          eventDate: newDate,
          whatsappUrl: newWhatsapp,
          eventTitle: content.eventTitle,
          doctorName: newDoctorName !== undefined ? newDoctorName : content.doctorName,
          brandTitle: newBrandTitle !== undefined ? newBrandTitle : content.brandTitle,
          posterDateText: newPosterDateText !== undefined ? newPosterDateText : content.posterDateText,
          hidePosterStaticDate: newHidePosterStaticDate !== undefined ? newHidePosterStaticDate : content.hidePosterStaticDate,
          posterSlides: newPosterSlides !== undefined ? newPosterSlides : content.posterSlides,
          slideIntervalSeconds: newSlideIntervalSeconds !== undefined ? newSlideIntervalSeconds : content.slideIntervalSeconds,
          slideTransitionEffect: newSlideTransitionEffect !== undefined ? newSlideTransitionEffect : content.slideTransitionEffect,
          sectionsVisibility: content.sectionsVisibility,
        }),
      });

      if (resp.ok) {
        const result = await resp.json();
        return { success: true, message: result.message || 'Hostinger sunucusuna (settings.json) kaydedildi!' };
      } else {
        return { success: false, message: 'Sunucu yanıtı: ' + resp.statusText };
      }
    } catch {
      return {
        success: false,
        message: 'save-settings.php dosyasına ulaşılamadı (Hostinger public_html içine yüklendiğinde otomatik çalışacaktır).',
      };
    }
  };

  const resetToDefault = () => {
    setContent(DEFAULT_SITE_CONTENT);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        updateSectionVisibility,
        setAllSectionsVisibility,
        updateSignals,
        updateJourney,
        updateFaq,
        saveSettingsToHostinger,
        resetToDefault,
        leads,
        addLead,
        deleteLead,
        clearAllLeads,
        isAdminOpen,
        setIsAdminOpen,
        isPasswordModalOpen,
        setIsPasswordModalOpen,
        isAuthenticated,
        openAdminWithAuth,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a ContentProvider');
  }
  return context;
};
