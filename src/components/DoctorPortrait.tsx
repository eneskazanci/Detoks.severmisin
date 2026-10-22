import React, { useRef, useState } from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';
import { Doctor } from '../data/doctors';

interface DoctorPortraitProps {
  doctor: Doctor;
  onPhotoUpload?: (doctorId: string, base64Image: string) => void;
  className?: string;
  showUploadTrigger?: boolean;
}

export const DoctorPortrait: React.FC<DoctorPortraitProps> = ({
  doctor,
  onPhotoUpload,
  className = 'w-full aspect-[1/1]',
  showUploadTrigger = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgError, setImgError] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onPhotoUpload) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onPhotoUpload(doctor.id, reader.result);
          setImgError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const imageSrc = doctor.customImage || (!imgError ? doctor.imageFallbackUrl : undefined);

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-neutral-100 group ${className}`}>
      {/* 1. Custom or Fallback Photo Image */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={doctor.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      ) : doctor.photoPreset === 'keskin' ? (
        /* 2. Dr. Abdullah KESGİN Visual Portrait (Light blue shirt, lapel mic, warm smile) */
        <div className="w-full h-full bg-gradient-to-b from-[#F0F7FF] via-[#E6F0FA] to-[#D5E5F7] flex items-center justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="90" r="85" fill="#FFFFFF" opacity="0.8" />
            
            {/* Torso & Light Blue Button-Down Shirt (Matching Keskin.png) */}
            <path
              d="M35 240C35 185 55 160 100 160C145 160 165 185 165 240H35Z"
              fill="#5294E2"
            />
            {/* Collar */}
            <path d="M78 160L92 182L100 170L108 182L122 160H78Z" fill="#3D7BC4" />
            <path d="M84 160L98 178L100 166L102 178L116 160H84Z" fill="#6FA8EC" />
            
            {/* Shirt Center Placket */}
            <rect x="97" y="168" width="6" height="72" fill="#4687D4" />
            <circle cx="100" cy="188" r="1.5" fill="#E2E8F0" />
            <circle cx="100" cy="208" r="1.5" fill="#E2E8F0" />
            <circle cx="100" cy="228" r="1.5" fill="#E2E8F0" />

            {/* Black Clip-on Lapel Mic (From Keskin.png) */}
            <rect x="106" y="184" width="3.5" height="7" rx="1.5" fill="#18181B" />
            <path d="M107 191C107 197 104 202 99 205" stroke="#27272A" strokeWidth="1.2" strokeLinecap="round" />

            {/* Neck */}
            <path d="M86 128H114V165H86V128Z" fill="#ECC3A6" />
            <path d="M86 142C94 150 106 150 114 142V165H86V142Z" fill="#DFC3B1" opacity="0.6" />

            {/* Face Shape */}
            <path
              d="M68 85C68 55 132 55 132 85C132 118 122 144 100 144C78 144 68 118 68 85Z"
              fill="#F7D3BC"
            />

            {/* Ears */}
            <ellipse cx="66" cy="94" rx="4" ry="9" fill="#F0C3A8" />
            <ellipse cx="134" cy="94" rx="4" ry="9" fill="#F0C3A8" />

            {/* Short Dark Brown Hair */}
            <path
              d="M66 75C66 45 134 45 134 75C134 82 131 90 128 92C126 78 120 58 100 58C80 58 74 78 72 92C69 90 66 82 66 75Z"
              fill="#271C16"
            />
            <path
              d="M68 62C75 48 125 48 132 62C130 52 118 42 100 42C82 42 70 52 68 62Z"
              fill="#1C140F"
            />

            {/* Friendly Warm Eyebrows */}
            <path d="M78 80C82 78 88 78 92 81" stroke="#2C1D16" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M108 81C112 78 118 78 122 80" stroke="#2C1D16" strokeWidth="2.5" strokeLinecap="round" />

            {/* Kind Eyes */}
            <ellipse cx="85" cy="88" rx="4.5" ry="3.5" fill="#3D2619" />
            <ellipse cx="115" cy="88" rx="4.5" ry="3.5" fill="#3D2619" />
            <circle cx="86.5" cy="87" r="1.2" fill="#FFFFFF" />
            <circle cx="116.5" cy="87" r="1.2" fill="#FFFFFF" />

            {/* Nose */}
            <path d="M100 87V105C97 106 103 106 100 105" stroke="#DDAA88" strokeWidth="2.2" strokeLinecap="round" />

            {/* Wide, Friendly White Smile */}
            <path d="M85 116C90 128 110 128 115 116H85Z" fill="#FFFFFF" stroke="#BE4B42" strokeWidth="1.5" />
            <path d="M84 116C90 126 110 126 116 116" stroke="#9E322A" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="87" y1="120" x2="113" y2="120" stroke="#E2E8F0" strokeWidth="0.8" />
          </svg>
        </div>
      ) : doctor.photoPreset === 'eyyub' ? (
        /* 3. Uzm. Dr. Eyyüb YILMAZ Visual Portrait (Dark navy shirt, grey hair, athletic fit posture) */
        <div className="w-full h-full bg-gradient-to-b from-[#F5F8F6] via-[#E9F0EC] to-[#DCE7E1] flex items-center justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="80" r="85" fill="#FFFFFF" opacity="0.85" />

            {/* Athletic Torso & Dark Navy Casual T-Shirt (Matching fit.png) */}
            <path
              d="M30 240C30 180 50 155 100 155C150 155 170 180 170 240H30Z"
              fill="#263147"
            />
            {/* Crew Neck Collar */}
            <path d="M84 155C84 168 116 168 116 155H84Z" fill="#1B2232" />
            <path d="M86 155C86 165 114 165 114 155" stroke="#374560" strokeWidth="2" strokeLinecap="round" />

            {/* T-Shirt Brand Accent */}
            <circle cx="128" cy="188" r="2" fill="#3D4B66" />

            {/* Strong Athletic Neck */}
            <path d="M85 120H115V158H85V120Z" fill="#E2B799" />
            <path d="M85 135C93 144 107 144 115 135V158H85V135Z" fill="#D29F7F" opacity="0.6" />

            {/* Face Shape */}
            <path
              d="M68 80C68 52 132 52 132 80C132 114 120 138 100 138C80 138 68 114 68 80Z"
              fill="#F2C5A7"
            />

            {/* Ears */}
            <ellipse cx="66" cy="88" rx="4" ry="9" fill="#E7B695" />
            <ellipse cx="134" cy="88" rx="4" ry="9" fill="#E7B695" />

            {/* Salt-and-Pepper Grey Textured Hair (Matching fit.png) */}
            <path
              d="M66 70C66 42 134 42 134 70C134 78 130 84 128 86C126 72 118 52 100 52C82 52 74 72 72 86C70 84 66 78 66 70Z"
              fill="#64748B"
            />
            <path
              d="M70 56C76 44 124 44 130 56C128 48 118 40 100 40C82 40 72 48 70 56Z"
              fill="#475569"
            />
            <path d="M78 48C84 44 116 44 122 48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <path d="M82 54C88 50 112 50 118 54" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />

            {/* Confident Athletic Eyebrows */}
            <path d="M77 76C81 74 87 74 91 76" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M109 76C113 74 119 74 123 76" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />

            {/* Smiling Eyes with Warmth */}
            <ellipse cx="84" cy="83" rx="4.5" ry="3.5" fill="#2E241E" />
            <ellipse cx="116" cy="83" rx="4.5" ry="3.5" fill="#2E241E" />
            <circle cx="85.5" cy="82" r="1.2" fill="#FFFFFF" />
            <circle cx="117.5" cy="82" r="1.2" fill="#FFFFFF" />

            {/* Nose */}
            <path d="M100 82V101C97 102 103 102 100 101" stroke="#CE9776" strokeWidth="2.2" strokeLinecap="round" />

            {/* Warm Athletic Smile */}
            <path d="M84 111C90 123 110 123 116 111H84Z" fill="#FFFFFF" stroke="#9E322A" strokeWidth="1.5" />
            <path d="M83 111C90 121 110 121 117 111" stroke="#88221B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="86" y1="115" x2="114" y2="115" stroke="#E2E8F0" strokeWidth="0.8" />
          </svg>
        </div>
      ) : doctor.photoPreset === 'female_dietitian' ? (
        /* 4. Female Dietitian */
        <div className="w-full h-full bg-gradient-to-b from-[#F2FBF5] via-[#E2F7EA] to-[#D0F0DD] flex items-center justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="80" r="85" fill="#FFFFFF" opacity="0.8" />
            <path d="M35 240C35 185 55 162 100 162C145 162 165 185 165 240H35Z" fill="#0D9488" />
            <path d="M84 162L100 188L116 162H84Z" fill="#115E59" />
            <path d="M72 170L100 210L128 170" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
            <path d="M86 128H114V165H86V128Z" fill="#FBD5C0" />
            <ellipse cx="100" cy="88" rx="30" ry="38" fill="#FDE2D0" />
            <ellipse cx="68" cy="94" rx="4" ry="8" fill="#F0C3A8" />
            <ellipse cx="132" cy="94" rx="4" ry="8" fill="#F0C3A8" />
            <path d="M66 85C66 42 134 42 134 85C134 120 126 148 122 154C114 154 86 154 78 154C74 148 66 120 66 85Z" fill="#3E2723" />
            <path d="M74 65C82 52 118 52 126 65C130 75 128 92 126 102C120 94 116 75 100 75C84 75 80 94 74 102C72 92 70 75 74 65Z" fill="#4E342E" />
            <path d="M78 82C82 80 88 80 92 82" stroke="#4B5563" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M108 82C112 80 118 80 122 82" stroke="#4B5563" strokeWidth="2.2" strokeLinecap="round" />
            <ellipse cx="85" cy="89" rx="4.5" ry="3.5" fill="#2D3748" />
            <ellipse cx="115" cy="89" rx="4.5" ry="3.5" fill="#2D3748" />
            <circle cx="86.5" cy="88" r="1.2" fill="#FFFFFF" />
            <circle cx="116.5" cy="88" r="1.2" fill="#FFFFFF" />
            <path d="M100 88V104C98 105 102 105 100 104" stroke="#DDAA88" strokeWidth="2" strokeLinecap="round" />
            <path d="M86 116C91 126 109 126 114 116" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
      ) : (
        /* 5. Female Doctor */
        <div className="w-full h-full bg-gradient-to-b from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA] flex items-center justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="80" r="85" fill="#FFFFFF" opacity="0.8" />
            <path d="M30 240C30 185 50 162 100 162C150 162 170 185 170 240H30Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <path d="M84 162L100 188L116 162H84Z" fill="#EA580C" />
            <path d="M72 170C72 195 85 205 97 205C109 205 122 195 122 170" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <circle cx="97" cy="205" r="6" fill="#0F172A" />
            <path d="M86 128H114V165H86V128Z" fill="#FBD5C0" />
            <ellipse cx="100" cy="88" rx="30" ry="38" fill="#FDE2D0" />
            <ellipse cx="68" cy="94" rx="4" ry="8" fill="#F0C3A8" />
            <ellipse cx="132" cy="94" rx="4" ry="8" fill="#F0C3A8" />
            <path d="M66 82C66 40 134 40 134 82C134 118 126 146 122 152C114 152 86 152 78 152C74 146 66 118 66 82Z" fill="#292524" />
            <path d="M74 62C82 50 118 50 126 62C130 72 128 88 126 98C120 90 116 72 100 72C84 72 80 90 74 98C72 88 70 72 74 62Z" fill="#1C1917" />
            <ellipse cx="85" cy="89" rx="4.5" ry="3.5" fill="#2D3748" />
            <ellipse cx="115" cy="89" rx="4.5" ry="3.5" fill="#2D3748" />
            <circle cx="86.5" cy="88" r="1.2" fill="#FFFFFF" />
            <circle cx="116.5" cy="88" r="1.2" fill="#FFFFFF" />
            <path d="M86 116C91 126 109 126 114 116" stroke="#C2410C" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Verified Medical Check Badge */}
      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-emerald-200/90 shadow-2xs flex items-center gap-1 z-10">
        <CheckCircle2 className="w-3 h-3 text-emerald-600 fill-emerald-100" />
        <span className="text-[9px] font-bold text-emerald-950 uppercase tracking-wider">
          Doğrulanmış
        </span>
      </div>

      {/* Hidden file input for direct photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Upload/Change Photo Button */}
      {showUploadTrigger && (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white/95 hover:bg-white text-neutral-700 hover:text-emerald-700 shadow-sm backdrop-blur-md transition-all active:scale-95 z-20 cursor-pointer flex items-center gap-1 text-[10px] font-semibold"
          title="Fotoğrafı Değiştir / Yükle"
        >
          <Camera className="w-3 h-3 text-emerald-600" />
          <span className="hidden group-hover:inline-block">Yükle</span>
        </button>
      )}
    </div>
  );
};
