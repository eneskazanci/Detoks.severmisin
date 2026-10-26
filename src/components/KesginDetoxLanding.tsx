import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  useSiteContent, DEFAULT_SIGNALS, DEFAULT_JOURNEY_STEPS, DEFAULT_FAQ, 
  PosterSlide, SocialMediaAccount, DEFAULT_SOCIAL_LINKS 
} from '../context/ContentContext';

export const renderSocialIcon = (platform: string, className: string = 'w-4 h-4') => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.11c-.04 2.11-.79 4.22-2.26 5.76-1.9 2.01-4.73 2.92-7.46 2.45-3.09-.52-5.7-2.86-6.57-5.87-.93-3.21.08-6.85 2.58-8.99 1.79-1.54 4.26-2.22 6.6-1.74v4.11c-1.34-.37-2.85-.15-3.95.69-1.07.82-1.63 2.22-1.4 3.56.22 1.32 1.3 2.39 2.62 2.6 1.48.24 3.04-.44 3.73-1.78.29-.56.41-1.2.4-1.83V.02h-2.12z" />
        </svg>
      );
    case 'telegram':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case 'website':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      );
  }
};

export const KesginDetoxLanding: React.FC = () => {
  const { content, openAdminWithAuth } = useSiteContent();
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Sosyal Medya Hesapları
  const socialLinks: SocialMediaAccount[] = (content.socialLinks && content.socialLinks.length > 0)
    ? content.socialLinks
    : DEFAULT_SOCIAL_LINKS;

  const activeSocialLinks = socialLinks.filter((s) => s.enabled !== false && s.url && s.url.trim().length > 0);

  // Afiş Slayt Gösterisi Durumu
  const posterSlides: PosterSlide[] = (content.posterSlides && content.posterSlides.length > 0)
    ? content.posterSlides
    : [{ id: 'slide-1', imageUrl: content.posterImage || '/kapak-toplanti.jpg', title: '', caption: '', badge: '' }];
  
  const isMultiSlide = posterSlides.length > 1;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlidePaused, setIsSlidePaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);

  // Slayt geçişinde parıltı / silinme animasyonunu tetikle
  useEffect(() => {
    setIsTransitioning(true);
    setTransitionKey((k) => k + 1);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 750);
    return () => clearTimeout(timer);
  }, [currentSlideIndex]);

  const effect = content.slideTransitionEffect || 'glow-shimmer';

  const getSlideAnimation = () => {
    switch (effect) {
      case 'fade-smooth':
        return 'slide-fade-in 0.65s ease-in-out forwards';
      case 'slide-horizontal':
        return 'slide-horizontal-in 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      case 'zoom-pulse':
        return 'slide-zoom-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      case 'glow-fade':
        return 'slide-fade-in 0.6s ease-in-out forwards, slide-glow-in 0.75s ease-out forwards';
      case 'glow-shimmer':
      default:
        return 'slide-glow-in 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    }
  };

  const shouldShowShimmerBeam =
    isTransitioning &&
    isMultiSlide &&
    (effect === 'glow-shimmer' || effect === 'glow-fade' || effect === 'slide-horizontal' || effect === 'zoom-pulse');

  // Otomatik Slayt Geçişi (Yalnızca 1'den fazla görsel varsa çalışır)
  useEffect(() => {
    if (!isMultiSlide || isSlidePaused) return;
    const intervalSec = content.slideIntervalSeconds || 5;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % posterSlides.length);
    }, intervalSec * 1000);
    return () => clearInterval(timer);
  }, [isMultiSlide, isSlidePaused, posterSlides.length, content.slideIntervalSeconds]);

  // Slayt silinmesi durumunda index taşmasını önle
  useEffect(() => {
    if (currentSlideIndex >= posterSlides.length) {
      setCurrentSlideIndex(0);
    }
  }, [posterSlides.length, currentSlideIndex]);

  const goToNextSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % posterSlides.length);
  };

  const goToPrevSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + posterSlides.length) % posterSlides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
    setTouchStartX(null);
  };

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

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    isElapsed: boolean;
    headerDateStr: string;
    eventLabelStr: string;
    monthStr: string;
    dayStr: string;
  }>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    isElapsed: false,
    headerDateStr: '22 EKİM • 20.00',
    eventLabelStr: '22 Ekim Perşembe · 20.00',
    monthStr: 'EKİM',
    dayStr: '22',
  });

  useEffect(() => {
    const updateCountdown = () => {
      const eventDateStr = content.eventDate || '2026-10-22T20:00:00+03:00';
      const targetDate = new Date(eventDateStr);
      const now = Date.now();
      const remainingSeconds = Math.max(0, Math.ceil((targetDate.getTime() - now) / 1000));

      const d = Math.floor(remainingSeconds / 86400);
      const h = Math.floor(remainingSeconds / 3600) % 24;
      const m = Math.floor(remainingSeconds / 60) % 60;
      const s = remainingSeconds % 60;

      const opts: Intl.DateTimeFormatOptions = { timeZone: 'Europe/Istanbul' };
      const headerFmt = new Intl.DateTimeFormat('tr-TR', {
        ...opts,
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
        .format(targetDate)
        .toLocaleUpperCase('tr-TR');

      const labelFmt =
        new Intl.DateTimeFormat('tr-TR', {
          ...opts,
          day: 'numeric',
          month: 'long',
          weekday: 'long',
        }).format(targetDate) +
        ' · ' +
        new Intl.DateTimeFormat('tr-TR', {
          ...opts,
          hour: '2-digit',
          minute: '2-digit',
        }).format(targetDate);

      const monthFmt = new Intl.DateTimeFormat('tr-TR', { ...opts, month: 'short' })
        .format(targetDate)
        .toLocaleUpperCase('tr-TR');

      const dayFmt = new Intl.DateTimeFormat('tr-TR', { ...opts, day: 'numeric' }).format(targetDate);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
        isElapsed: remainingSeconds === 0,
        headerDateStr: headerFmt,
        eventLabelStr: labelFmt,
        monthStr: monthFmt,
        dayStr: dayFmt,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [content.eventDate]);

  // Calendar .ics generator (exact matching app.js from detox.drabdullahkesgin.com)
  const handleCalendarDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const eventDateStr = content.eventDate || '2026-10-22T20:00:00+03:00';
    const start = new Date(eventDateStr);
    const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const escapeStr = (s: string) => s.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/[,;]/g, '\\$&');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Detox//Bulusma//TR',
      'BEGIN:VEVENT',
      'UID:detox-' + stamp(start) + '@drabdullahkesgin.com',
      'DTSTAMP:' + stamp(new Date()),
      'DTSTART:' + stamp(start),
      'SUMMARY:' + escapeStr(content.eventTitle || 'Tıbbi Detoks ve Bütünsel Arınma'),
      'DESCRIPTION:' + escapeStr('Katılım bilgileri WhatsApp grubunda: ' + (content.whatsappUrl || 'https://chat.whatsapp.com/ItHdw0hFUecEZMRWCLAoMU')),
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const url = URL.createObjectURL(new Blob([icsContent], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'detox-bulusmasi.ics';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const formatWhatsAppLink = (url?: string): string => {
    if (!url) return 'https://chat.whatsapp.com/ItHdw0hFUecEZMRWCLAoMU';
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('whatsapp://')) {
      return trimmed;
    }
    if (trimmed.startsWith('chat.whatsapp.com') || trimmed.startsWith('wa.me') || trimmed.startsWith('api.whatsapp.com')) {
      return 'https://' + trimmed;
    }
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length >= 10) {
      const phone = digits.startsWith('0') ? '9' + digits : (digits.startsWith('90') ? digits : '90' + digits);
      return `https://api.whatsapp.com/send?phone=${phone}`;
    }
    return 'https://' + trimmed;
  };

  const whatsappHref = formatWhatsAppLink(content.whatsappUrl);

  // Dynamic poster date computation:
  // If content.posterDateText is explicitly set by admin, use it.
  // Otherwise, automatically format from content.eventDate in uppercase Turkish
  const getPosterDateDisplay = (): string => {
    if (content.posterDateText && content.posterDateText.trim()) {
      return content.posterDateText.trim().toUpperCase();
    }
    try {
      const dt = new Date(content.eventDate || '2026-10-22T20:00:00+03:00');
      if (isNaN(dt.getTime())) {
        return '22 EKİM PERŞEMBE SAAT 20.00';
      }
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
  };

  // Format title with italic emphasis if it contains "Değişime" or punctuation
  const renderTitle = () => {
    const rawTitle = content.title || 'Bedenine kulak ver. Değişime birlikte başlayalım.';
    const splitKey = rawTitle.includes('Değişime') ? 'Değişime' : (rawTitle.includes('birlikte') ? 'birlikte' : null);
    if (splitKey) {
      const idx = rawTitle.indexOf(splitKey);
      return (
        <>
          {rawTitle.slice(0, idx)}
          <em>{rawTitle.slice(idx)}</em>
        </>
      );
    }
    return rawTitle;
  };

  return (
    <div className="detox-site-root">
      {/* Skip to content */}
      <a className="skip" href="#icerik">
        İçeriğe geç
      </a>

      {/* ========================================================================= */}
      {/* 1. TOP ANNOUNCEMENT BAR                                                   */}
      {/* ========================================================================= */}
      {visibility.announcement !== false && (
        <a 
          href={whatsappHref} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="announcement hover:opacity-95 transition-opacity block"
        >
          <span className="live-dot" /> {content.announcementText || 'Kendinize bir akşam ayırın.'}{' '}
          <span>{content.announcementSubtext || 'Ücretsiz canlı tanıtım semineri'}</span>
          <span className="announcement-arrow">↗</span>
        </a>
      )}

      {/* ========================================================================= */}
      {/* HEADER                                                                    */}
      {/* ========================================================================= */}
      <header className="wrap header">
        <a href="/" className="brand" aria-label="Detox ana sayfa">
          <span className="brand-symbol">✳</span>
          <span>
            {content.brandTitle || 'detox'}
            {(content.doctorName !== undefined ? content.doctorName : 'DR. ABDULLAH KESGİN') && (
              <span className="brand-sub">
                {content.doctorName !== undefined ? content.doctorName : 'DR. ABDULLAH KESGİN'}
              </span>
            )}
          </span>
        </a>

        <nav aria-label="Ana menü">
          {visibility.about !== false && <a href="#bulusma">Buluşma hakkında</a>}
          {visibility.faq !== false && <a href="#sorular">Merak edilenler</a>}
          <a
            className="nav-cta"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Gruba katıl <span>↗</span>
          </a>
        </nav>
      </header>

      {/* Main Content Area */}
      <main id="icerik">
        {/* ========================================================================= */}
        {/* 2. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        {visibility.hero !== false && (
          <section className="wrap hero">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="small-line" /> ÜCRETSİZ CANLI BULUŞMAYA DAVETLİSİNİZ
              </div>

              <h1 id="title">{renderTitle()}</h1>

              <p className="intro" id="intro">
                {content.intro ||
                  'Sabah yorgun uyanmak, gün boyu şişkinlik hissetmek, bir türlü düzene giremeyen alışkanlıklar… Kendinize yeniden iyi bakmanın zamanı. İlk adımı uzmanlarla, birlikte atalım.'}
              </p>

              <div className="event-inline">
                <div className="calendar-icon">
                  <span id="month">{timeLeft.monthStr}</span>
                  <strong id="day">{timeLeft.dayStr}</strong>
                </div>
                <div>
                  <strong id="event-label">{timeLeft.eventLabelStr}</strong>
                  <span>Canlı Zoom buluşması · Türkiye saati</span>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button - opens WhatsApp immediately without modal */}
              <a
                className="button whatsapp"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4.1A8 8 0 1 1 20 11.7Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M8.5 8c.5 3.5 2 5 5.5 6l1.5-1.5-2-1-1 1c-1.5-.5-2-1-2.5-2.5l1-1-1-2Z"
                    fill="currentColor"
                  />
                </svg>
                <span data-cta>{content.cta || 'Ücretsiz WhatsApp grubuna katıl'}</span>
                <span>↗</span>
              </a>
              <p className="cta-caption">Toplantı bağlantısı ve program detayları grupta.</p>

              {/* Live Countdown Box */}
              <div className={`countdown ${timeLeft.isElapsed ? 'elapsed' : ''}`} id="countdown" aria-label="Toplantıya kalan süre">
                <div className="countdown-heading">
                  <span className="live-dot" />
                  <span id="countdown-label">
                    {timeLeft.isElapsed ? 'BULUŞMA ZAMANI' : 'BULUŞMAYA GERİ SAYIM'}
                  </span>
                  <span>{timeLeft.headerDateStr}</span>
                </div>

                <div className="countdown-units" role="timer" aria-live="off">
                  <div>
                    <strong id="count-days">{timeLeft.days}</strong>
                    <span>GÜN</span>
                  </div>
                  <b>:</b>
                  <div>
                    <strong id="count-hours">{timeLeft.hours}</strong>
                    <span>SAAT</span>
                  </div>
                  <b>:</b>
                  <div>
                    <strong id="count-minutes">{timeLeft.minutes}</strong>
                    <span>DAKİKA</span>
                  </div>
                  <b>:</b>
                  <div>
                    <strong id="count-seconds">{timeLeft.seconds}</strong>
                    <span>SANİYE</span>
                  </div>
                </div>

                {timeLeft.isElapsed && (
                  <p id="countdown-message">
                    Planlanan toplantı saati geldi. Güncel katılım bilgileri için WhatsApp grubunu kontrol edin.
                  </p>
                )}
              </div>

              <div className="hero-tags">
                <span>✓ Ücretsiz tanıtım</span>
                <span>✓ Uzmanlarla canlı buluşma</span>
              </div>
            </div>

            {/* Hero Art / Poster with exact kapak-toplanti.jpg */}
            <div className="hero-art">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <span className="art-spark">✳</span>
              <div className="free-sticker">
                <span>CANLI</span>
                <strong>ÜCRETSİZ</strong>
                <span>TANITIM SEMİNERİ</span>
              </div>
              <div className="poster-heading">
                <span>BEDENİNİ DİNLE. KENDİNE ALAN AÇ.</span>
                <span>01 / BULUŞMA</span>
              </div>

              {/* Afiş Alanı: Tek resim varsa sabit afiş, birden fazla resim varsa slayt gösterisi */}
              {(() => {
                const currentSlide = posterSlides[currentSlideIndex] || posterSlides[0];
                const isMeetingPoster =
                  currentSlide.imageUrl === '/kapak-toplanti.jpg' ||
                  currentSlide.imageUrl === content.posterImage ||
                  currentSlide.imageUrl.includes('kapak-toplanti');

                return (
                  <figure
                    className="poster"
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '12px',
                    }}
                    onMouseEnter={() => setIsSlidePaused(true)}
                    onMouseLeave={() => setIsSlidePaused(false)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <a
                      href={currentSlide.imageUrl || '/kapak-toplanti.jpg'}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${currentSlide.title || 'Toplantı afişini'} tam boyutta aç`}
                      style={{ display: 'block', position: 'relative', width: '100%', height: '100%' }}
                    >
                      <img
                        key={currentSlide.id || currentSlideIndex}
                        src={currentSlide.imageUrl || '/kapak-toplanti.jpg'}
                        width={640}
                        height={640}
                        alt={currentSlide.title || `Ücretsiz Tıbbi Detoks ve Bütünsel Arınma tanıtım semineri. ${getPosterDateDisplay()}, canlı Zoom toplantısı.`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          aspectRatio: '1 / 1',
                          objectFit: 'cover',
                          animation: isTransitioning && isMultiSlide ? getSlideAnimation() : undefined,
                          willChange: 'transform, opacity, filter',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/kapak-toplanti.jpg';
                        }}
                      />

                      {/* Parlama Işık Dalgası & Efekti (Mobilde ve Masaüstünde Yüksek Görünürlük) */}
                      {shouldShowShimmerBeam && (
                        <>
                          <div className="poster-shimmer-beam" key={`beam-${transitionKey}`} />
                          <div
                            key={`burst-${transitionKey}`}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              pointerEvents: 'none',
                              zIndex: 14,
                              background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.55) 0%, rgba(217, 244, 137, 0.4) 30%, rgba(180, 130, 240, 0.3) 60%, transparent 80%)',
                              animation: 'spark-burst 0.75s ease-out forwards',
                              mixBlendMode: 'screen',
                            }}
                          />
                        </>
                      )}

                      {/* 22 EKİM PERŞEMBE SAAT 20.00 yazısını kapatıp yönetici girişine göre revize eden dinamik alan */}
                      {isMeetingPoster && content.hidePosterStaticDate !== false && (
                        <div
                          className="poster-dynamic-date-badge"
                          style={{
                            position: 'absolute',
                            top: '80.0%',
                            left: '7%',
                            right: '7%',
                            height: '7.0%',
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            zIndex: 3,
                            boxShadow: '0 0 12px 6px #ffffff',
                            pointerEvents: 'none',
                          }}
                          title="Yönetici paneliyle güncellenen canlı tarih"
                        >
                          <span
                            style={{
                              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                              fontWeight: 900,
                              color: '#0d1430',
                              letterSpacing: '-0.3px',
                              fontSize: 'clamp(11px, 2.7vw, 17px)',
                              lineHeight: 1.15,
                              textTransform: 'uppercase',
                            }}
                          >
                            {getPosterDateDisplay()}
                          </span>
                        </div>
                      )}

                      {/* Slayt Özel Başlık / Açıklama / Etiket Katmanı */}
                      {(currentSlide.title || currentSlide.caption || currentSlide.badge) && !isMeetingPoster && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '36px 18px 18px',
                            background: 'linear-gradient(to top, rgba(13,20,48,0.92) 0%, rgba(13,20,48,0.6) 65%, transparent 100%)',
                            zIndex: 4,
                            pointerEvents: 'none',
                            textAlign: 'left',
                          }}
                        >
                          {currentSlide.badge && (
                            <span
                              style={{
                                display: 'inline-block',
                                background: '#7546c5',
                                color: '#ffffff',
                                fontSize: '9px',
                                fontWeight: 800,
                                letterSpacing: '0.8px',
                                textTransform: 'uppercase',
                                padding: '2px 8px',
                                borderRadius: '999px',
                                marginBottom: '4px',
                              }}
                            >
                              {currentSlide.badge}
                            </span>
                          )}
                          {currentSlide.title && (
                            <h4
                              style={{
                                color: '#ffffff',
                                fontSize: 'clamp(13px, 2.6vw, 16px)',
                                fontWeight: 800,
                                lineHeight: 1.25,
                                margin: 0,
                                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                              }}
                            >
                              {currentSlide.title}
                            </h4>
                          )}
                          {currentSlide.caption && (
                            <p
                              style={{
                                color: 'rgba(255,255,255,0.9)',
                                fontSize: 'clamp(10px, 2vw, 12px)',
                                lineHeight: 1.35,
                                margin: '3px 0 0',
                                fontWeight: 500,
                              }}
                            >
                              {currentSlide.caption}
                            </p>
                          )}
                        </div>
                      )}
                    </a>

                    {/* YALNIZCA BİRDEN FAZLA RESİM VARSA SLAYT KONTROLLERİ GÖRÜNÜR */}
                    {isMultiSlide && (
                      <>
                        {/* Slayt Sayacı (Örn: 2 / 3) */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            background: 'rgba(13, 20, 48, 0.75)',
                            backdropFilter: 'blur(8px)',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '999px',
                            border: '1px solid rgba(255,255,255,0.25)',
                            zIndex: 10,
                            pointerEvents: 'none',
                          }}
                        >
                          {currentSlideIndex + 1} / {posterSlides.length}
                        </div>

                        {/* Önceki Slayt Butonu */}
                        <button
                          type="button"
                          onClick={goToPrevSlide}
                          aria-label="Önceki slayt"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '10px',
                            transform: 'translateY(-50%)',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(13, 20, 48, 0.75)',
                            backdropFilter: 'blur(6px)',
                            color: '#ffffff',
                            border: '1px solid rgba(255,255,255,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 10,
                            boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#7546c5';
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(13, 20, 48, 0.75)';
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                          }}
                        >
                          <ChevronLeft size={20} />
                        </button>

                        {/* Sonraki Slayt Butonu */}
                        <button
                          type="button"
                          onClick={goToNextSlide}
                          aria-label="Sonraki slayt"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px',
                            transform: 'translateY(-50%)',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(13, 20, 48, 0.75)',
                            backdropFilter: 'blur(6px)',
                            color: '#ffffff',
                            border: '1px solid rgba(255,255,255,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 10,
                            boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#7546c5';
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(13, 20, 48, 0.75)';
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                          }}
                        >
                          <ChevronRight size={20} />
                        </button>

                        {/* Nokta Göstergeleri (Dots) */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '6px',
                            alignItems: 'center',
                            zIndex: 10,
                            backgroundColor: 'rgba(13, 20, 48, 0.65)',
                            backdropFilter: 'blur(6px)',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            border: '1px solid rgba(255,255,255,0.2)',
                          }}
                        >
                          {posterSlides.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentSlideIndex(idx);
                              }}
                              aria-label={`Slayt ${idx + 1}`}
                              style={{
                                width: idx === currentSlideIndex ? '18px' : '6px',
                                height: '6px',
                                borderRadius: '3px',
                                backgroundColor: idx === currentSlideIndex ? '#d9f489' : 'rgba(255,255,255,0.5)',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                              }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </figure>
                );
              })()}

              <div className="art-foot">
                <span className="live-dot" />
                <span>Birlikte öğrenelim, birlikte başlayalım.</span>
                <span>↗</span>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 3. TILTED TOPIC STRIP                                                     */}
        {/* ========================================================================= */}
        {visibility.topicStrip !== false && (
          <div className="topic-strip">
            <div className="wrap">
              <span>BÜTÜNSEL BİR BAKIŞ</span>
              <span>Beslenme</span>
              <i>✳</i>
              <span>Hareket</span>
              <i>✳</i>
              <span>Uyku</span>
              <i>✳</i>
              <span>İyi yaşam alışkanlıkları</span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. SIGNALS SECTION (BU HİSLER TANIDIK MI?)                                */}
        {/* ========================================================================= */}
        {visibility.signals !== false && (
          <section className="wrap signals section">
            <div className="signals-heading">
              <div>
                <p className="eyebrow">BU HİSLER TANIDIK MI?</p>
                <h2>
                  Her gün aynı döngü.
                  <br />
                  <em>Ya bu kez kendinize zaman ayırsanız?</em>
                </h2>
              </div>
              <p>
                Bedeninize iyi bakmak, onu dinlemekle başlar.
                <br />
                Küçük bir farkındalık, yeni bir başlangıca dönüşebilir.
              </p>
            </div>

            <div className="signal-grid">
              {(content.signalsList || DEFAULT_SIGNALS).map((sig) => (
                <article key={sig.id} className={`signal-card ${sig.cardColor || 'peach'}`}>
                  <span className="signal-icon" aria-hidden="true">
                    {sig.icon}
                  </span>
                  <span className="signal-number">{sig.tag}</span>
                  <h3>
                    {sig.title.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < sig.title.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h3>
                  <p>{sig.description}</p>
                  <a 
                    href={whatsappHref} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="signal-bottom hover:underline block"
                  >
                    {sig.bottomText}
                  </a>
                </article>
              ))}
            </div>

            <p className="signals-note">
              Bu belirtilerin farklı nedenleri olabilir; süregelen şikâyetleriniz için hekiminize danışın.
            </p>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 5. ABOUT SECTION (KÜÇÜK BİR DURAKLAMA, YENİ BİR BAKIŞ)                      */}
        {/* ========================================================================= */}
        {visibility.about !== false && (
          <section className="wrap about section" id="bulusma">
            <div>
              <p className="eyebrow">KÜÇÜK BİR DURAKLAMA, YENİ BİR BAKIŞ</p>
              <h2>
                Sağlığınız, kendinize
                <br />
                <em>ayırdığınız zamana değer.</em>
              </h2>
            </div>
            <div>
              <p id="about">
                {content.about ||
                  'Bazen aç olmadığımız halde atıştırıyor, yoğun günlerde öğünlerimizi ve dinlenmeyi ikinci plana atıyoruz. Sonra da “Neden kendimi iyi hissetmiyorum?” diye soruyoruz. Bu buluşma, alışkanlıklarınıza durup yeniden bakmanız için bir davet.'}
              </p>
              <p>
                {content.about2 ||
                  'Hazır cevaplar yerine doğru sorularla başlayalım: Beslenmemde neleri gözden geçirebilirim? Uykuma ve hareket etmeye nasıl alan açabilirim? Sorularınızı not edin, buluşmada uzmanları dinleyin.'}
              </p>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 6. JOURNEY SECTION (01 Bedeninizi anlamak, 02 Uzmanlar, 03 Başlamak)      */}
        {/* ========================================================================= */}
        {visibility.journey !== false && (
          <section className="wrap journey">
            {(content.journeyList || DEFAULT_JOURNEY_STEPS).map((step) => (
              <article key={step.step}>
                <span className="step">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </section>
        )}

        {/* ========================================================================= */}
        {/* 7. INVITATION SECTION (ARTIK KENDİME İYİ BAKMAK İSTİYORUM)                */}
        {/* ========================================================================= */}
        {visibility.invitation !== false && (
          <section className="wrap invitation section">
            <div className="invitation-decoration" aria-hidden="true">
              ✳
            </div>
            <div>
              <p className="eyebrow">“ARTIK KENDİME İYİ BAKMAK İSTİYORUM.”</p>
              <h2 id="eventTitle">
                {content.eventTitle || 'Tıbbi Detoks ve Bütünsel Arınma'}
              </h2>
              <p id="invite-date">{timeLeft.eventLabelStr}</p>
              <p>Ücretsiz tanıtım semineri · Zoom üzerinden canlı</p>
            </div>
            <div className="join-box">
              <p>Bu kez ertelemeyin. Birlikte başlayalım.</p>
              <a
                className="button light"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span data-cta>{content.cta || 'Ücretsiz WhatsApp grubuna katıl'}</span> ↗
              </a>
              <span>Katılım bilgilerini gruptan takip edin.</span>
              <a
                className="calendar-link"
                id="calendar"
                href="#"
                onClick={handleCalendarDownload}
              >
                Takvimime ekle ↓
              </a>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 8. FAQ SECTION (MERAK EDİLENLER)                                          */}
        {/* ========================================================================= */}
        {visibility.faq !== false && (
          <section className="wrap faq section" id="sorular">
            <div>
              <p className="eyebrow">AKLINIZDA KALMASIN</p>
              <h2>
                Merak
                <br />
                <em>edilenler.</em>
              </h2>
            </div>
            <div>
              {(content.faq || DEFAULT_FAQ).map((item) => (
                <details key={item.id}>
                  <summary>
                    {item.q}
                    <span>+</span>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 9. HEALTH NOTE & MEDICAL DISCLAIMER                                       */}
        {/* ========================================================================= */}
        {visibility.healthNote !== false && (
          <>
            <section className="wrap health-note">
              <span>ⓘ</span>
              <p id="note">
                {content.note ||
                  'Bu etkinlik genel bilgilendirme amaçlıdır; tanı ve tedavi yerine geçmez. Detoks uygulamalarının toksin atma ve kalıcı kilo kaybı iddiaları için güçlü bilimsel kanıt bulunmamaktadır. Süregelen şikâyetleriniz varsa veya beslenmenizi değiştirmeyi düşünüyorsanız hekiminize danışın.'}
              </p>
            </section>

            {/* Meta / Facebook Advertising Disclaimer (as required by advertising guidelines) */}
            <div style={{ textAlign: 'center', marginTop: '28px', padding: '16px 20px', borderTop: '1px solid var(--line, #e4e0e7)' }} className="wrap">
              <p style={{ fontSize: '10px', color: 'var(--muted, #706c79)', lineHeight: 1.6, margin: 0 }}>
                <strong>Meta Reklam İlkeleri Uyarısı:</strong> Bu internet sitesi Meta Platforms, Inc., Facebook veya Instagram ile ilişkili veya bağlantılı değildir. Facebook ve Instagram, Meta Platforms, Inc.'in tescilli ticari markalarıdır.
              </p>
            </div>
          </>
        )}
      </main>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer className="wrap footer-block" style={{ borderTop: '1px solid var(--line, #e7deef)', paddingTop: '32px', paddingBottom: '36px', display: 'block' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '22px' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <a href="/" className="brand" style={{ fontSize: '24px' }}>
                ✳ {content.brandTitle || 'detox'}
              </a>
              <span style={{ fontSize: '11px', color: 'var(--muted, #736782)' }}>
                İyi yaşam için bilinçli bir başlangıç.
              </span>
            </div>

            {/* Sosyal Medya Butonları */}
            {activeSocialLinks.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#5932ad', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  Bizi Takip Edin:
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  {activeSocialLinks.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={item.title}
                      aria-label={item.title}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        backgroundColor: '#f3eefb',
                        color: '#514177',
                        border: '1px solid #dfcef6',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#5932ad';
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.08)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(89, 50, 173, 0.28)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3eefb';
                        e.currentTarget.style.color = '#514177';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {renderSocialIcon(item.platform, 'w-4 h-4')}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                className="text-button"
                id="privacy-open"
                onClick={() => setShowPrivacy(true)}
                style={{ cursor: 'pointer', fontSize: '11px', color: '#736782' }}
              >
                Gizlilik bilgisi
              </button>
              <button
                className="text-button"
                onClick={openAdminWithAuth}
                style={{ opacity: 0.7, cursor: 'pointer', fontSize: '11px', fontWeight: 700, color: '#5932ad' }}
                title="Yönetici Paneli (Alt + A)"
              >
                · Yönetici
              </button>
            </div>
          </div>

          {/* Alt Telif Şeridi */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px', borderTop: '1px solid #f0eaf7', paddingTop: '16px', fontSize: '11px', color: '#97899e' }}>
            <span>© {new Date().getFullYear()} {content.brandTitle || 'Detox'} · {content.doctorName || 'Dr. Abdullah Kesgin'}. Tüm hakları saklıdır.</span>
            <span>Katılım ve bilgilendirme WhatsApp gruplarımız üzerinden yürütülmektedir.</span>
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* PRIVACY DIALOG MODAL                                                      */}
      {/* ========================================================================= */}
      {showPrivacy && (
        <dialog id="privacy" open style={{ display: 'block', position: 'fixed', zIndex: 100, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0 }}>
          <h2>Gizlilik bilgisi</h2>
          <p>
            Ziyaretler ve WhatsApp davet tıklamaları, aynı IP tekrar sayılmayacak şekilde ölçülür. Ham IP adresiniz uygulama
            veritabanına yazılmaz; gizli anahtarla üretilen bir özet değer ve işlem tarihi saklanır. Barındırma sağlayıcısının
            erişim kayıtları ayrı olabilir.
          </p>
          <p>
            Bu sayfa reklam veya üçüncü taraf analiz çerezi kullanmaz. WhatsApp'a geçtiğinizde o hizmetin gizlilik koşulları
            uygulanır. Gruba katıldığınızda telefon numaranız diğer grup üyelerine görünebilir.
          </p>
          <button className="button" id="privacy-close" onClick={() => setShowPrivacy(false)}>
            Kapat
          </button>
        </dialog>
      )}

      {/* ========================================================================= */}
      {/* 10. MOBILE STICKY BOTTOM CTA                                              */}
      {/* ========================================================================= */}
      {visibility.mobileCta !== false && (
        <div className="mobile-cta">
          <a
            className="button"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ücretsiz gruba katıl ↗
          </a>
        </div>
      )}
    </div>
  );
};
