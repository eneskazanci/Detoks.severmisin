import React from 'react';
import { ContentProvider } from './context/ContentContext';
import { KesginDetoxLanding } from './components/KesginDetoxLanding';
import { AdminPanel } from './components/AdminPanel';
import { AdminPasswordModal } from './components/AdminPasswordModal';

function MainApp() {
  return (
    <div className="min-h-screen text-[#251a40] flex flex-col font-sans overflow-x-hidden">
      {/* Exact replica of detox.drabdullahkesgin.com */}
      <KesginDetoxLanding />

      {/* Admin Panel (Tarih, WhatsApp Linki, Hostinger Senkronizasyonu) */}
      <AdminPanel />

      {/* Admin Password Gate Modal */}
      <AdminPasswordModal />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <MainApp />
    </ContentProvider>
  );
}
