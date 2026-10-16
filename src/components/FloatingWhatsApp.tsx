import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingWhatsApp: React.FC = () => {
  const { language } = useApp();
  const whatsappUrl = 'https://wa.me/923446302721?text=' + encodeURIComponent(
    language === 'ur'
      ? 'السلام علیکم! میں کے۔کمپنی اینڈ ڈیزائنر سے گرافک ڈیزائن سروسز کے متعلق رہنمائی حاصل کرنا چاہتا ہوں۔'
      : 'Assalam-o-Alaikum! I want to inquire about graphic design services from K.Company & Designer.'
  );

  return (
    <aside aria-label="WhatsApp quick contact" className="fixed bottom-6 right-6 z-40 flex items-center group">
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-full bg-[#111111]/90 backdrop-blur-md border border-[#D4AF37]/30 text-xs font-medium text-[#F8F7F3] shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {language === 'ur' ? 'واٹس ایپ پر رابطہ کریں' : 'Chat on WhatsApp: 0344 6302721'}
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/20"
        aria-label="Direct WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </aside>
  );
};
