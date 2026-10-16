import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUp, Mail, MapPin, MessageCircle, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t, navigateTo } = useApp();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#D4AF37]/20 text-[#B8B5AC] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#222]">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#141414] border border-[#D4AF37]/40 flex items-center justify-center">
                <span className="font-cinzel font-bold text-base text-[#F4D675]">K</span>
              </div>
              <span className="font-cinzel font-bold text-lg text-[#F8F7F3] tracking-wider">
                K.COMPANY & DESIGNER
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#8E8B82]">
              {language === 'ur'
                ? 'آپ کی سوچ، ہمارا ڈیزائن۔ ملتان، پاکستان میں خواجہ خیسامہ محمود صدیقی کی زیرِ نگرانی معیاری ڈیجیٹل گرافک ڈیزائننگ۔'
                : 'Your Vision, Our Designs. Professional digital graphic design services owned by Khawaja Khaisama Mahmood Siddiqui in Multan, Pakistan.'}
            </p>
            <div className="pt-2 text-xs text-[#F4D675] font-medium space-y-1">
              <p>• Creative Designs • Professional Quality</p>
              <p>• Fast Delivery • Affordable Prices</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-cinzel text-sm font-semibold text-[#F8F7F3] uppercase tracking-wider mb-4 border-b border-[#D4AF37]/20 pb-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => navigateTo('/')} className="hover:text-[#F4D675] transition-colors">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services')} className="hover:text-[#F4D675] transition-colors">
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/rate-list')} className="hover:text-[#F4D675] transition-colors">
                  {t.nav.rateList}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/portfolio')} className="hover:text-[#F4D675] transition-colors">
                  {t.nav.portfolio}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/packages')} className="hover:text-[#F4D675] transition-colors">
                  {t.nav.packages}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/track-order')} className="hover:text-[#F4D675] transition-colors">
                  {t.nav.trackOrder}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/about')} className="hover:text-[#F4D675] transition-colors">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/contact')} className="hover:text-[#F4D675] transition-colors">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Service Categories */}
          <div>
            <h4 className="font-cinzel text-sm font-semibold text-[#F8F7F3] uppercase tracking-wider mb-4 border-b border-[#D4AF37]/20 pb-2">
              {t.footer.serviceCategories}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => navigateTo('/services')} className="hover:text-[#F4D675] transition-colors">
                  Logo & Branding
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services')} className="hover:text-[#F4D675] transition-colors">
                  Social Media Design
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services')} className="hover:text-[#F4D675] transition-colors">
                  YouTube Artwork & Thumbnails
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services')} className="hover:text-[#F4D675] transition-colors">
                  Posters & Advertisements
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services')} className="hover:text-[#F4D675] transition-colors">
                  Digital Wedding & Birthday Cards
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services')} className="hover:text-[#F4D675] transition-colors">
                  Islamic Posts & Ayat Calligraphy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services')} className="hover:text-[#F4D675] transition-colors">
                  Photo Retouching & Removal
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services')} className="hover:text-[#F4D675] transition-colors">
                  Special Budget Packages
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Verified Info */}
          <div>
            <h4 className="font-cinzel text-sm font-semibold text-[#F8F7F3] uppercase tracking-wider mb-4 border-b border-[#D4AF37]/20 pb-2">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <a
                href="https://wa.me/923446302721"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 hover:text-[#25D366] transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F8F7F3] block font-medium">WhatsApp / Orders:</strong>
                  0344 6302721
                </span>
              </a>

              <a
                href="mailto:khawajasiddique125k@gmail.com"
                className="flex items-start gap-2.5 hover:text-[#F4D675] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F8F7F3] block font-medium">Email:</strong>
                  khawajasiddique125k@gmail.com
                </span>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F8F7F3] block font-medium">Office Address:</strong>
                  جامعہ تعلیم و تزکیہ قرآن محل، بیرون پاک گیٹ، ملتان، پاکستان
                </span>
              </div>

              {/* Social Channels List */}
              <div className="pt-2 text-[11px] text-[#8E8B82] space-y-1">
                <p><strong>TikTok:</strong> @khaisama.siddiqui</p>
                <p><strong>Instagram:</strong> @khaisama6811125k</p>
                <p><strong>YouTube:</strong> K.Company & Designer</p>
                <a
                  href="https://designtechguide6811.blogspot.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline pt-1"
                >
                  <span>Blogspot Guide</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links Bar */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#1E1E1E] text-xs">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={() => navigateTo('/policies')} className="hover:text-[#F4D675] transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => navigateTo('/policies')} className="hover:text-[#F4D675] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigateTo('/policies')} className="hover:text-[#F4D675] transition-colors">
              Refund & Cancellation Policy
            </button>
            <button onClick={() => navigateTo('/policies')} className="hover:text-[#F4D675] transition-colors">
              Digital-Only Service Policy
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#D4AF37]/30 text-xs text-[#F4D675] hover:bg-[#141414] hover:border-[#D4AF37] transition-all"
            aria-label="Back to top"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#706E66] gap-2">
          <p>© {currentYear} K.Company & Designer. {t.footer.rights}</p>
          <p>Founder & Owner: Khawaja Khaisama Mahmood Siddiqui (Multan, PK)</p>
        </div>
      </div>
    </footer>
  );
};
