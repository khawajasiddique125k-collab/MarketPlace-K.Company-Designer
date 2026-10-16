import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export const ServiceDetailModal: React.FC = () => {
  const {
    language,
    t,
    selectedService,
    setSelectedService,
    addToCart,
    navigateTo,
  } = useApp();

  if (!selectedService) return null;

  const handleAddToCart = () => {
    addToCart(selectedService, 1);
  };

  const handleOrderNow = () => {
    addToCart(selectedService, 1);
    setSelectedService(null);
    navigateTo('/checkout');
  };

  const inquiryMsg = encodeURIComponent(
    `Assalam-o-Alaikum! I am interested in ordering "${selectedService.name}" (${selectedService.priceDisplay}). Please share details.`
  );
  const whatsappUrl = `https://wa.me/923446302721?text=${inquiryMsg}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-[#111111] border border-[#D4AF37]/40 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#222] bg-[#161616]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] mb-1 font-medium">
              <span>{language === 'ur' ? selectedService.categoryUr : selectedService.category}</span>
              {selectedService.requiresQuote && (
                <>
                  <span>·</span>
                  <span className="text-[#F4D675] font-semibold">{t.servicesSection.requiresQuoteBadge}</span>
                </>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F8F7F3]">
              {language === 'ur' ? selectedService.nameUr : selectedService.name}
            </h3>
          </div>
          <button
            onClick={() => setSelectedService(null)}
            className="p-2 text-[#888] hover:text-[#FFF] hover:bg-[#222] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#B8B5AC]">
          {/* Price display banner */}
          <div className="p-4 rounded-lg bg-[#181818] border border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs text-[#888] block">
                {language === 'ur' ? 'سرکاری ریٹ لسٹ کی قیمت:' : 'Official Rate List Price:'}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#F4D675] tracking-tight">
                {selectedService.priceDisplay}
              </span>
              {selectedService.unitLabel && (
                <span className="text-xs text-[#B8B5AC] ml-2">({selectedService.unitLabel})</span>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-[#9E9B93]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>24h Turnaround</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>3 Revisions</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#F8F7F3] font-semibold mb-2">
              {language === 'ur' ? 'سروس کا تعارف:' : 'Service Overview:'}
            </h4>
            <p className="leading-relaxed text-sm text-[#D1CEC7]">
              {language === 'ur' ? selectedService.descriptionUr : selectedService.description}
            </p>
          </div>

          {/* Quotation Notice if starting price */}
          {selectedService.requiresQuote && (
            <div className="p-3.5 rounded-lg bg-[#2A2312] border border-[#D4AF37]/40 text-xs text-[#F4D675] leading-relaxed">
              <strong>Notice:</strong> This service is marked with (+). The listed amount is an entry starting rate. Your final quotation will be confirmed upon reviewing project volume, page count, or complexity before design begins.
            </div>
          )}

          {/* Deliverables */}
          {selectedService.deliverables && selectedService.deliverables.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#F8F7F3] font-semibold mb-2.5">
                {t.servicesSection.deliverablesTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedService.deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#E5E2DC]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What to provide */}
          <div className="p-4 rounded-lg bg-[#141414] border border-[#222]">
            <h4 className="text-xs uppercase tracking-wider text-[#F4D675] font-semibold mb-2">
              {language === 'ur' ? 'آرڈر کے لیے ضروری معلومات:' : 'Information Required from Customer:'}
            </h4>
            <ul className="text-xs space-y-1 text-[#8E8B82] list-disc list-inside">
              <li>Exact wording and headings to place on the artwork</li>
              <li>Brand logo file (if already available) or clear sketch</li>
              <li>Color preferences and desired dimensions / orientation</li>
              <li>Valid WhatsApp number for preview delivery & revisions</li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[#222] bg-[#161616] flex flex-wrap items-center justify-between gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#25D366]/40 text-xs text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === 'ur' ? 'واٹس ایپ پر پوچھیں' : 'Ask on WhatsApp'}</span>
          </a>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#D4AF37]/40 text-xs font-semibold text-[#F4D675] hover:bg-[#D4AF37]/10 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.servicesSection.addToCart}</span>
            </button>
            <button
              onClick={handleOrderNow}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#F4D675] to-[#D4AF37] text-xs font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all shadow-md"
            >
              <span>{t.servicesSection.orderNow}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
