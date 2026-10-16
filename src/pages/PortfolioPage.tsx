import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PortfolioItem } from '../types';
import { ArrowRight, Eye, Sparkles, X, MessageCircle } from 'lucide-react';
import { resolveImageUrl, handleImageError } from '../utils/imageHelper';

export const PortfolioPage: React.FC = () => {
  const { language, t, portfolio, services, addToCart, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const categories = [
    'All',
    'Logo & Branding',
    'Social Media Design',
    'YouTube Design',
    'Posters & Advertisements',
    'Digital Cards',
    'Islamic Designs',
  ];

  const filteredPortfolio = selectedCategory === 'All'
    ? portfolio
    : portfolio.filter((item) => item.category === selectedCategory);

  const handleOrderSimilar = (associatedServiceId?: string) => {
    if (associatedServiceId) {
      const match = services.find((s) => s.id === associatedServiceId);
      if (match) {
        addToCart(match, 1);
        navigateTo('/checkout');
        return;
      }
    }
    navigateTo('/services');
  };

  return (
    <div className="min-h-screen py-10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-1">
            <span>{language === 'ur' ? 'ڈیزائن گیلری' : 'Creative Portfolio'}</span>
            <span>·</span>
            <span>{t.hero.showcaseBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7F3] tracking-tight">
            {language === 'ur' ? 'کے۔کمپنی اینڈ ڈیزائنر شوکیس' : 'Selected Works & Design Showcase'}
          </h1>
          <p className="text-sm text-[#B8B5AC] mt-2">
            Explore our original sample design concepts and high-impact digital artworks across branding, social media, invitations, and promotional graphics.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-[#080808] font-bold shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#141414] text-[#A8A59C] hover:bg-[#1E1E1E] hover:text-[#F8F7F3] border border-[#262626]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolio.map((item) => (
            <article
              key={item.id}
              className="bg-[#121212] border border-[#D4AF37]/20 rounded-xl overflow-hidden group hover:border-[#D4AF37] transition-all flex flex-col justify-between"
            >
              <div
                className="relative aspect-[4/3] bg-black cursor-pointer overflow-hidden"
                onClick={() => setActiveModalItem(item)}
              >
                <img
                  src={resolveImageUrl(item.imageUrl)}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, '/images/hero_design_showcase.jpg')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#F8F7F3] bg-black/75 backdrop-blur-md px-2.5 py-1 rounded border border-[#D4AF37]/30">
                    {language === 'ur' ? item.categoryUr : item.category}
                  </span>
                  {item.featured && (
                    <span className="text-[10px] font-bold text-[#080808] bg-[#F4D675] px-2 py-0.5 rounded flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3
                    onClick={() => setActiveModalItem(item)}
                    className="text-lg font-bold text-[#F8F7F3] group-hover:text-[#F4D675] transition-colors mb-2 cursor-pointer"
                  >
                    {language === 'ur' ? item.titleUr : item.title}
                  </h3>
                  <p className="text-xs text-[#8E8B82] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#222] flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="p-2 rounded-lg border border-[#333] text-[#A8A59C] hover:text-[#FFF] hover:border-[#D4AF37] transition-colors"
                    title="View Project Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleOrderSimilar(item.associatedServiceId)}
                    className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-[#F4D675] to-[#D4AF37] text-xs font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>{t.servicesSection.orderSimilar}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal for viewing project details */}
        {activeModalItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-full max-w-3xl bg-[#111111] border border-[#D4AF37]/50 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-[#222] bg-[#161616]">
                <div>
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider">
                    {activeModalItem.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#F8F7F3]">
                    {language === 'ur' ? activeModalItem.titleUr : activeModalItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="p-1.5 text-[#888] hover:text-white rounded-lg hover:bg-[#222]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={resolveImageUrl(activeModalItem.imageUrl)}
                  alt={activeModalItem.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, '/images/hero_design_showcase.jpg')}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 bg-[#141414] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#B8B5AC] leading-relaxed max-w-lg">
                  {activeModalItem.description}
                </p>
                <button
                  onClick={() => {
                    handleOrderSimilar(activeModalItem.associatedServiceId);
                    setActiveModalItem(null);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-xs font-bold text-[#080808] hover:bg-[#F4D675] whitespace-nowrap"
                >
                  {t.servicesSection.orderSimilar}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
