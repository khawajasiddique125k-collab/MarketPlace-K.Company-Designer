import React from 'react';
import { Service } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ArrowRight, Eye, Sparkles } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { language, t, addToCart, setSelectedService, navigateTo } = useApp();

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(service, 1);
    navigateTo('/checkout');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(service, 1);
  };

  return (
    <article
      onClick={() => setSelectedService(service)}
      className="group relative bg-[#121212] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#D4AF37]/5 cursor-pointer"
    >
      <div>
        {/* Unboxed Metadata Header (Anti-pill) */}
        <div className="flex items-center justify-between text-xs text-[#8E8B82] mb-2 font-medium">
          <span className="text-[#D4AF37]">
            {language === 'ur' ? service.categoryUr : service.category}
          </span>
          {service.featured && (
            <span className="text-[#F4D675] flex items-center gap-1 font-semibold">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              Popular
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#F8F7F3] group-hover:text-[#F4D675] transition-colors leading-snug mb-2">
          {language === 'ur' ? service.nameUr : service.name}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#9E9B93] leading-relaxed line-clamp-2 mb-4">
          {language === 'ur' ? service.descriptionUr : service.description}
        </p>
      </div>

      <div>
        {/* Price Row */}
        <div className="flex items-baseline justify-between pt-3 border-t border-[#222] mb-4">
          <div>
            <span className="text-[11px] text-[#706E66] block">
              {language === 'ur' ? 'ریٹ لسٹ قیمت' : 'Starting / Fixed Rate'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-[#F4D675] tabular-nums tracking-tight">
                {service.priceDisplay}
              </span>
              {service.requiresQuote && (
                <span className="text-[10px] text-[#D4AF37]/90 font-medium">
                  {language === 'ur' ? '(کوٹیشن درکار)' : '(Quote)'}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setSelectedService(service)}
            className="text-xs text-[#8E8B82] hover:text-[#F8F7F3] flex items-center gap-1 p-1"
            title="View full deliverables"
          >
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.servicesSection.viewDetails}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#D4AF37]/30 text-xs font-semibold text-[#F8F7F3] hover:text-[#F4D675] hover:border-[#D4AF37] hover:bg-[#1A1A1A] active:scale-95 transition-all"
            aria-label={`Add ${service.name} to Cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="whitespace-nowrap">{t.servicesSection.addToCart}</span>
          </button>

          <button
            type="button"
            onClick={handleOrderNow}
            className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-gradient-to-r from-[#F4D675] via-[#D4AF37] to-[#B28B27] text-xs font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all shadow-sm shadow-[#D4AF37]/20"
            aria-label={`Order ${service.name} Now`}
          >
            <span className="whitespace-nowrap">{t.servicesSection.orderNow}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
