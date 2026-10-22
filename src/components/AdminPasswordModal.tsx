import React, { useState, useEffect, useRef } from 'react';
import { Lock, KeyRound, Eye, EyeOff, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

export const AdminPasswordModal: React.FC = () => {
  const { isPasswordModalOpen, setIsPasswordModalOpen, loginAdmin, openAdminWithAuth } = useSiteContent();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut Alt + A or Ctrl + Shift + A to open admin login
      if ((e.altKey && (e.key === 'a' || e.key === 'A')) || (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A'))) {
        e.preventDefault();
        openAdminWithAuth();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openAdminWithAuth]);

  useEffect(() => {
    if (isPasswordModalOpen) {
      setPassword('');
      setError(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isPasswordModalOpen]);

  if (!isPasswordModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setError(true);
      setTimeout(() => inputRef.current?.select(), 50);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsPasswordModalOpen(false)}
    >
      <div 
        className="w-full max-w-sm rounded-3xl bg-white border border-neutral-200 p-6 shadow-2xl text-left relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500" />

        {/* Close Button */}
        <button
          onClick={() => setIsPasswordModalOpen(false)}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-4 mt-1">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 font-display">
              Yönetici Girişi
            </h3>
            <p className="text-xs text-neutral-500">
              Site içeriğini düzenlemek için parola girin.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Yönetici Parolası
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Parolayı girin..."
                className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? 'border-red-400 focus:ring-red-400 bg-red-50/40 text-red-900'
                    : 'border-neutral-300 focus:ring-emerald-500 bg-white text-neutral-900'
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1.5 font-medium animate-shake">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Hatalı parola! Lütfen tekrar deneyin.</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Giriş Yap & Düzenle</span>
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Yetkisiz erişimlere karşı korumalıdır</span>
        </div>
      </div>
    </div>
  );
};
