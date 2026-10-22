import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteContent, DEFAULT_SIGNALS, DEFAULT_JOURNEY_STEPS, DEFAULT_FAQ, PosterSlide } from '../context/ContentContext';

export const KesginDetoxLanding: React.FC = () => {
  const { content, openAdminWithAuth } = useSiteContent();
  const [showPrivacy, setShowPrivacy] = useState(false);

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
            detox
            <span className="brand-sub">DR. ABDULLAH KESGİN</span>
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
      <footer className="wrap">
        <a href="/" className="brand">
          ✳ detox
        </a>
        <span>İyi yaşam için bilinçli bir başlangıç.</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            className="text-button"
            id="privacy-open"
            onClick={() => setShowPrivacy(true)}
            style={{ cursor: 'pointer' }}
          >
            Gizlilik bilgisi
          </button>
          <button
            className="text-button"
            onClick={openAdminWithAuth}
            style={{ opacity: 0.5, cursor: 'pointer' }}
            title="Yönetici Paneli (Alt + A)"
          >
            · Yönetici
          </button>
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
