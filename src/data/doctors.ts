export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  role: string;
  experience: string;
  quote: string;
  photoPreset: 'eyyub' | 'keskin' | 'female_dietitian' | 'female_doctor' | 'custom';
  customImage?: string;
  imageFallbackUrl?: string;
  badges: string[];
}

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'dr-abdullah-kesgin',
    name: 'Dr. Abdullah Kesgin',
    title: 'Emekli Başhekim & Sporcu Hekim',
    specialty: 'Bütüncül Tıp & Detoks Koordinatörü',
    role: 'Program Lideri & Bütüncül Tıbbi Rehberlik',
    experience: '25+ Yıllık Hekimlik & Başhekimlik Tecrübesi',
    quote: 'Sağlığın temeli doğru beslenme ve vücudun toksin yükünü hafifletmektir. İlk adım karaciğer ve bağırsak arınmasıdır. Bilinçli alışkanlıklarla bedeninize zindelik kazandırıyoruz.',
    photoPreset: 'keskin',
    imageFallbackUrl: '/images/Keskin.png',
    badges: ['Emekli Başhekim', 'Bütüncül Tıp Rehberliği', 'Canlı Zoom Buluşması'],
  },
  {
    id: 'dr-eyyub',
    name: 'Uzm. Dr. Eyyüb Yılmaz',
    title: 'İç Hastalıkları Uzmanı',
    specialty: 'Bütüncül Tıp & Fonksiyonel Hareket',
    role: 'Tıbbi Değerlendirme & Günlük Hareket Rehberliği',
    experience: '20+ Yıllık İç Hastalıkları Uzmanlık Tecrübesi',
    quote: 'Ağır spor salonlarına gitmenize gerek yok. Günde 15 dakikalık hafif omurga ve esneme akışıyla bedenin doğal enerjisini ve arınmasını uyandırıyoruz.',
    photoPreset: 'eyyub',
    imageFallbackUrl: '/images/fit.png',
    badges: ['İç Hastalıkları Uzmanı', 'Günlük 15 Dk Hareket', 'Canlı Tıbbi Rehberlik'],
  },
  {
    id: 'ayse-tolga',
    name: 'Ayşe Tolga',
    title: 'Bütünsel Yaşam & Aromaterapist',
    specialty: 'Aromaterapi, Holistik Sağlık & Zihinsel Dinginlik',
    role: 'Bütünsel Yaşam & Ruhsal Arınma Rehberi',
    experience: '15+ Yıllık Bütünsel Sağlık & Yaşam Danışmanlığı',
    quote: 'Arınma sadece bedende değil, zihinde ve ruhta başlar. Doğanın şifalı frekanslarıyla kendinize hak ettiğiniz dinginliği armağan edin.',
    photoPreset: 'female_dietitian',
    imageFallbackUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    badges: ['Bütünsel Yaşam', 'Aromaterapi', 'Ruhsal Denge'],
  },
  {
    id: 'dr-rezan-cezan',
    name: 'Dr. Rezan Cezan',
    title: 'Bütünsel Tıp & Biyoregülasyon',
    specialty: 'Biyoregülasyon, Doğal Tıp & Hücresel Arınma',
    role: 'Hücresel Detoks & Biyoregülasyon Danışmanlığı',
    experience: '18+ Yıllık Tıp & Biyoregülasyon Tecrübesi',
    quote: 'Bedenin kendi kendini onarma kapasitesi mucizevidir. Doğru arınma ve destekle hücrelerimiz yeniden nefes alır.',
    photoPreset: 'female_doctor',
    imageFallbackUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    badges: ['Bütünsel Tıp', 'Biyoregülasyon', 'Hücresel Arınma'],
  },
];

export const DOCTORS_DATA = INITIAL_DOCTORS;
