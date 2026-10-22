import React, { useState } from 'react';
import { Doctor } from '../data/doctors';

interface DoctorAvatarProps {
  doctor: Doctor;
  className?: string;
}

export const DoctorAvatar: React.FC<DoctorAvatarProps> = ({ doctor, className = 'w-10 h-10' }) => {
  const [imgError, setImgError] = useState(false);
  const imageSrc = doctor.customImage || (!imgError ? doctor.imageFallbackUrl : undefined);

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={doctor.name}
        onError={() => setImgError(true)}
        className={`${className} rounded-full object-cover object-top border-2 border-white shadow-xs`}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Uzm. Dr. Eyyüb YILMAZ (1. resim - Fit) Mini Avatar
  if (doctor.photoPreset === 'eyyub') {
    return (
      <div className={`${className} relative rounded-full overflow-hidden bg-[#E2EBE5] border-2 border-white shadow-xs flex items-center justify-center shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#F5F8F6" />
          <path d="M18 96C18 76 28 66 50 66C72 66 82 76 82 96H18Z" fill="#263147" />
          <path d="M44 66C44 72 56 72 56 66H44Z" fill="#1B2232" />
          <path d="M44 54H56V68H44V54Z" fill="#E2B799" />
          <ellipse cx="50" cy="42" rx="14" ry="17" fill="#F2C5A7" />
          <path d="M34 36C34 20 66 20 66 36C66 42 63 48 61 50C60 42 56 30 50 30C44 30 40 42 39 50C37 48 34 42 34 36Z" fill="#64748B" />
          <path d="M44 50C46 53 54 53 56 50" stroke="#88221B" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="43" cy="40" r="1.5" fill="#2E241E" />
          <circle cx="57" cy="40" r="1.5" fill="#2E241E" />
        </svg>
      </div>
    );
  }

  // Emekli Başhekim Dr. Abdullah KESGİN (2. resim - Keskin) Mini Avatar
  if (doctor.photoPreset === 'keskin') {
    return (
      <div className={`${className} relative rounded-full overflow-hidden bg-[#DCEAF8] border-2 border-white shadow-xs flex items-center justify-center shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#F0F7FF" />
          <path d="M18 96C18 78 30 68 50 68C70 68 82 78 82 96H18Z" fill="#5294E2" />
          <path d="M42 68L50 80L58 68H42Z" fill="#3D7BC4" />
          <rect x="52" y="74" width="3" height="5" rx="1" fill="#18181B" />
          <path d="M44 54H56V68H44V54Z" fill="#ECC3A6" />
          <ellipse cx="50" cy="42" rx="14" ry="17" fill="#F7D3BC" />
          <path d="M34 38C34 22 66 22 66 38C66 44 64 50 62 52C60 44 56 32 50 32C44 32 40 44 38 52C36 50 34 44 34 38Z" fill="#271C16" />
          <path d="M44 50C46 53 54 53 56 50" stroke="#9E322A" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="43" cy="40" r="1.5" fill="#2E241E" />
          <circle cx="57" cy="40" r="1.5" fill="#2E241E" />
        </svg>
      </div>
    );
  }

  // Default Female Specialist
  return (
    <div className={`${className} relative rounded-full overflow-hidden bg-[#E0F2FE] border-2 border-white shadow-xs flex items-center justify-center shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#F0FDF4" />
        <path d="M18 96C18 78 28 68 50 68C72 68 82 78 82 96H18Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <path d="M42 68L50 82L58 68H42Z" fill="#0D9488" />
        <path d="M44 54H56V69H44V54Z" fill="#FBD5C0" />
        <ellipse cx="50" cy="42" rx="14" ry="17" fill="#FDE2D0" />
        <path d="M36 28C40 22 60 22 64 28C67 33 66 42 65 48C62 44 60 35 50 35C40 35 38 44 35 48C34 42 33 33 36 28Z" fill="#4E342E" />
        <path d="M45 49C47 52 53 52 55 49" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="43" cy="39" r="1.5" fill="#2D3748" />
        <circle cx="57" cy="39" r="1.5" fill="#2D3748" />
      </svg>
    </div>
  );
};
