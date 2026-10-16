import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Printer, ShoppingBag, ArrowRight, Search, FileText } from 'lucide-react';

export const RateListPage: React.FC = () => {
  const { language, t, services, addToCart, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const categories = [
    'Logo & Branding',
    'Social Media Design',
    'YouTube Design',
    'Posters & Advertisements',
    'Product & Business Design',
    'Digital Cards',
    'Islamic Designs',
    'Digital Documents',
    'Photo Editing',
    'Digital Sketching',
    'Special Budget Packages',
  ];

  return (
    <div className="min-h-screen py-10 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Print Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#D4AF37]/20 print:border-black">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
              <span>K.Company & Designer</span>
              <span>·</span>
              <span>Official Rate List</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7F3] print:text-black">
              {language === 'ur' ? 'مکمل اور مصدقہ ریٹ لسٹ' : 'Complete Verified Rate List'}
            </h1>
            <p className="text-xs sm:text-sm text-[#8E8B82] mt-1 print:text-gray-700">
              All prices in Pakistani Rupees (PKR). Transparent rates, 100% digital WhatsApp delivery, and 3 free revisions.
            </p>
          </div>

          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D4AF37]/50 text-xs font-semibold text-[#F4D675] hover:bg-[#D4AF37]/10 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => navigateTo('/services')}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#F4D675] to-[#D4AF37] text-xs font-bold text-[#080808] hover:brightness-110"
            >
              {t.servicesSection.orderNow}
            </button>
          </div>
        </div>

        {/* Search bar (hidden when printing) */}
        <div className="mb-8 print:hidden max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8E8B82] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search rate list (e.g. Logo, Poster, Cover)..."
              className="w-full pl-10 pr-4 py-2 bg-[#121212] border border-[#333] rounded-lg text-xs sm:text-sm text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
        </div>

        {/* Rate list tables by Category */}
        <div className="space-y-10">
          {categories.map((cat, idx) => {
            const catServices = services.filter((s) => {
              if (s.category !== cat) return false;
              if (searchTerm.trim()) {
                const q = searchTerm.toLowerCase();
                return s.name.toLowerCase().includes(q) || s.nameUr.toLowerCase().includes(q);
              }
              return true;
            });

            if (catServices.length === 0) return null;

            return (
              <section
                key={cat}
                className="bg-[#111111] print:bg-white border border-[#222] print:border-gray-300 rounded-xl overflow-hidden"
              >
                {/* Category Header */}
                <div className="bg-[#181818] print:bg-gray-100 px-6 py-4 border-b border-[#262626] print:border-gray-300 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-[#D4AF37]/20 text-[#F4D675] print:text-black font-cinzel font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-[#F8F7F3] print:text-black">
                      {cat}
                    </h2>
                  </div>
                  <span className="text-xs text-[#8E8B82] print:text-gray-600 font-medium">
                    {catServices.length} {language === 'ur' ? 'آئٹمز' : 'items'}
                  </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#222] print:border-gray-300 text-[#8E8B82] print:text-gray-700 bg-[#141414] print:bg-gray-50 text-[11px] uppercase tracking-wider">
                        <th className="py-3 px-6">Service Name</th>
                        <th className="py-3 px-6">Urdu Title</th>
                        <th className="py-3 px-6 text-right">Listed Rate</th>
                        <th className="py-3 px-6 text-center print:hidden">Order</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1D1D1D] print:divide-gray-200">
                      {catServices.map((service) => (
                        <tr
                          key={service.id}
                          className="hover:bg-[#161616] print:hover:bg-transparent transition-colors"
                        >
                          <td className="py-3.5 px-6 font-semibold text-[#F8F7F3] print:text-black">
                            {service.name}
                            {service.requiresQuote && (
                              <span className="block text-[10px] text-[#D4AF37] font-normal">
                                * Starting baseline quote
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-6 text-[#A8A59C] print:text-gray-700 font-urdu">
                            {service.nameUr}
                          </td>
                          <td className="py-3.5 px-6 text-right font-black text-[#F4D675] print:text-black tabular-nums whitespace-nowrap">
                            {service.priceDisplay}
                          </td>
                          <td className="py-3.5 px-6 text-center print:hidden">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => addToCart(service, 1)}
                                className="p-1.5 rounded bg-[#1C1C1C] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#080808] transition-colors"
                                title="Add to Cart"
                              >
                                <ShoppingBag className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  addToCart(service, 1);
                                  navigateTo('/checkout');
                                }}
                                className="px-2.5 py-1 rounded bg-[#D4AF37] text-[11px] font-bold text-[#080808] hover:bg-[#F4D675] transition-colors"
                              >
                                Order
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer Notes on Rate List */}
        <div className="mt-12 p-6 rounded-xl bg-[#121212] border border-[#222] text-xs text-[#8E8B82] space-y-2">
          <p className="text-[#F8F7F3] font-bold">Important Rate List Policy & Instructions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>All rates are listed in Pakistani Rupees (PKR) and are transparent.</li>
            <li>Services marked with (+) like Company Profile, Packaging, and E-book are starting rates; final quotes depend on volume or complexity.</li>
            <li>Per-unit items (Presentation Slide @ Rs. 100/slide, Background Removal @ Rs. 50/photo) are billed proportionally.</li>
            <li>Official Payment Method: JazzCash 0321 6257021 (Account Title: Tuba Mehmood).</li>
            <li>Official WhatsApp Order Line: 0344 6302721 (Khawaja Khaisama Mahmood Siddiqui).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
