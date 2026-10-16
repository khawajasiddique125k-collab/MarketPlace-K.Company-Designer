import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/ServiceCard';
import { CATEGORIES, CATEGORIES_UR } from '../data/servicesData';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { language, t, services } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [sortBy, setSortBy] = useState<'default' | 'asc' | 'desc'>('default');

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Must be active
      if (!service.isActive) return false;

      // Category filter
      if (selectedCategory !== 'All Services' && service.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = service.name.toLowerCase().includes(q);
        const matchesNameUr = service.nameUr.toLowerCase().includes(q);
        const matchesDesc = service.description.toLowerCase().includes(q);
        const matchesCategory = service.category.toLowerCase().includes(q);
        if (!matchesName && !matchesNameUr && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'asc') return a.price - b.price;
      if (sortBy === 'desc') return b.price - a.price;
      return 0;
    });
  }, [services, selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Services');
    setSortBy('default');
  };

  return (
    <div className="min-h-screen py-10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-1">
            <span>{language === 'ur' ? 'مکمل کیٹلاگ' : 'Comprehensive Catalog'}</span>
            <span>·</span>
            <span>{filteredServices.length} {language === 'ur' ? 'سروسز دستیاب ہیں' : 'Services Available'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7F3] tracking-tight">
            {t.servicesSection.title}
          </h1>
          <p className="text-sm text-[#B8B5AC] mt-2">
            {t.servicesSection.subtitle}
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-[#111111] border border-[#262626] rounded-xl p-4 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8E8B82] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.servicesSection.searchPlaceholder}
                className="w-full pl-10 pr-10 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs sm:text-sm text-[#F8F7F3] placeholder-[#666] focus:border-[#D4AF37] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#FFF]"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-4 h-4 text-[#D4AF37]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs sm:text-sm text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="default">{t.servicesSection.sortDefault}</option>
                <option value="asc">{t.servicesSection.sortPriceAsc}</option>
                <option value="desc">{t.servicesSection.sortPriceDesc}</option>
              </select>
            </div>
          </div>

          {/* Category Chips Horizontal Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#D4AF37] text-[#080808] font-bold shadow-sm'
                      : 'bg-[#181818] text-[#A8A59C] hover:bg-[#222] hover:text-[#F8F7F3] border border-[#2B2B2B]'
                  }`}
                >
                  {language === 'ur' ? (CATEGORIES_UR[cat] || cat) : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid or Empty State */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#111111] rounded-2xl border border-[#222] max-w-lg mx-auto p-8">
            <Search className="w-10 h-10 text-[#D4AF37]/50 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#F8F7F3] mb-1">
              {t.servicesSection.noResults}
            </h3>
            <p className="text-xs text-[#8E8B82] mb-6">
              Try searching with different terms or reset your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-xs font-bold text-[#080808] hover:bg-[#F4D675] transition-colors"
            >
              {t.servicesSection.resetFilters}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
