import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ShoppingBag, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';

export const PackagesPage: React.FC = () => {
  const { language, t, services, addToCart, navigateTo } = useApp();

  const packages = services.filter((s) => s.category === 'Special Budget Packages');

  const handleOrder = (pkg: any) => {
    addToCart(pkg, 1);
    navigateTo('/checkout');
  };

  return (
    <div className="min-h-screen py-10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F4D675]" />
            <span>High-Value Fixed Price Deals</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8F7F3] tracking-tight">
            {t.packages.title}
          </h1>
          <p className="text-sm text-[#B8B5AC] mt-3 leading-relaxed">
            Transparent fixed-rate design bundles created specifically for startups, online shops, content creators, and seasonal celebrations with 100% digital WhatsApp delivery.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[#121212] border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#D4AF37]/5 relative overflow-hidden"
            >
              {pkg.featured && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#F4D675] to-[#D4AF37] text-[#080808] font-bold text-[10px] uppercase tracking-wider py-1 px-4 rounded-bl-lg shadow">
                  Top Recommended
                </div>
              )}

              <div>
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Budget Package
                </span>
                <h3 className="text-xl font-bold text-[#F8F7F3] mb-2 leading-snug">
                  {language === 'ur' ? pkg.nameUr : pkg.name}
                </h3>
                <p className="text-xs text-[#8E8B82] leading-relaxed mb-6">
                  {language === 'ur' ? pkg.descriptionUr : pkg.description}
                </p>

                {/* Deliverables checklist */}
                <div className="space-y-2.5 pt-4 border-t border-[#222] mb-8">
                  <span className="text-[11px] font-bold text-[#A8A59C] uppercase tracking-wider block">
                    What's Included:
                  </span>
                  {pkg.deliverables?.map((deliv, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-[#E5E2DC]">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2.5 text-xs text-[#D1CEC7]">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>3 Free Revisions Included</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#D1CEC7]">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>WhatsApp Preview & Master Delivery</span>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-6 border-t border-[#222]">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs text-[#8E8B82]">All-inclusive:</span>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-[#F4D675] tabular-nums">
                      {pkg.priceDisplay}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => addToCart(pkg, 1)}
                    className="py-2.5 px-3 rounded-lg border border-[#D4AF37]/40 text-xs font-semibold text-[#F8F7F3] hover:text-[#F4D675] hover:border-[#D4AF37] hover:bg-[#1A1A1A] transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{t.servicesSection.addToCart}</span>
                  </button>

                  <button
                    onClick={() => handleOrder(pkg)}
                    className="py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#F4D675] via-[#D4AF37] to-[#B28B27] text-xs font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1 shadow-md shadow-[#D4AF37]/20"
                  >
                    <span>{t.servicesSection.orderNow}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom inquiry strip */}
        <div className="mt-16 bg-[#111111] border border-[#222] rounded-2xl p-8 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-lg font-bold text-[#F8F7F3]">
            Need a Custom Custom-Tailored Agency Package?
          </h3>
          <p className="text-xs text-[#8E8B82] leading-relaxed">
            If you need bulk monthly graphics, custom e-commerce packaging, or complete corporate brand identity, message Khawaja Siddiqui directly on WhatsApp.
          </p>
          <a
            href="https://wa.me/923446302721?text=Assalam-o-Alaikum!%20I%20need%20a%20custom%20monthly%20or%20bulk%20design%20package."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-xs font-bold text-white hover:brightness-110"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Inquire on WhatsApp (0344 6302721)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
