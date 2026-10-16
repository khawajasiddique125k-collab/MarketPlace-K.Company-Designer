import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Search, Globe, User, Shield, Menu, X, PhoneCall } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    currentRoute,
    navigateTo,
    cartCount,
    isAdmin,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home, route: '/' },
    { label: t.nav.services, route: '/services' },
    { label: t.nav.rateList, route: '/rate-list' },
    { label: t.nav.portfolio, route: '/portfolio' },
    { label: t.nav.packages, route: '/packages' },
    { label: t.nav.about, route: '/about' },
    { label: t.nav.contact, route: '/contact' },
  ];

  const handleNavClick = (route: string) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-[#D4AF37]/20 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          {/* Zone 1: Single element brand wordmark */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 text-left shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            aria-label="K.Company & Designer Home"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1E1E1E] to-[#0A0A0A] border border-[#D4AF37]/40 flex items-center justify-center shadow-sm group-hover:border-[#D4AF37] transition-colors">
              <span className="font-cinzel font-bold text-lg text-[#F4D675]">K</span>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-[#F8F7F3] group-hover:text-[#F4D675] transition-colors whitespace-nowrap">
                K.COMPANY & DESIGNER
              </span>
              <span className="text-[10px] sm:text-xs text-[#D4AF37]/80 tracking-widest uppercase font-medium">
                {language === 'ur' ? 'گرافک ڈیزائن سروسز' : 'Digital Graphic Design'}
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-[#B8B5AC]">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#F4D675] font-semibold'
                      : 'hover:text-[#F8F7F3]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#F4D675]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + utility controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#D4AF37]/25 text-xs font-medium text-[#F8F7F3] hover:border-[#D4AF37] hover:bg-[#151515] transition-all"
              title="Toggle English / اردو"
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-semibold text-[#F4D675]">
                {language === 'en' ? 'اردو' : 'EN'}
              </span>
            </button>

            {/* Track Order link */}
            <button
              onClick={() => handleNavClick('/track-order')}
              className="hidden md:flex items-center gap-1 px-3 py-1.5 text-xs text-[#B8B5AC] hover:text-[#F4D675] hover:bg-[#151515] rounded-md transition-colors"
            >
              <span>{t.nav.trackOrder}</span>
            </button>

            {/* Account / Admin icon */}
            <button
              onClick={() => handleNavClick(isAdmin ? '/admin' : '/account')}
              className="p-2 rounded-md text-[#B8B5AC] hover:text-[#F4D675] hover:bg-[#151515] transition-colors relative"
              title={isAdmin ? 'Admin Dashboard' : t.nav.account}
              aria-label="User Account or Admin"
            >
              {isAdmin ? (
                <Shield className="w-4 h-4 text-[#F4D675]" />
              ) : (
                <User className="w-4 h-4" />
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => handleNavClick('/cart')}
              className="relative p-2 rounded-md text-[#F8F7F3] hover:text-[#F4D675] hover:bg-[#151515] transition-colors"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#080808] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button: Order Now */}
            <button
              onClick={() => handleNavClick('/services')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#080808] bg-gradient-to-r from-[#F4D675] via-[#D4AF37] to-[#AA8222] rounded-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-[#D4AF37]/15 whitespace-nowrap"
            >
              {t.nav.orderNow}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-[#B8B5AC] hover:text-[#F4D675] hover:bg-[#151515]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0D0D0D] border-b border-[#D4AF37]/30 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#222]">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentRoute === link.route
                    ? 'bg-[#1A1A1A] text-[#F4D675] font-semibold'
                    : 'text-[#B8B5AC] hover:bg-[#151515] hover:text-[#F8F7F3]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('/track-order')}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-[#B8B5AC] hover:bg-[#151515] hover:text-[#F4D675]"
            >
              🔍 {t.nav.trackOrder}
            </button>
            <button
              onClick={() => handleNavClick('/account')}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-[#B8B5AC] hover:bg-[#151515] hover:text-[#F4D675]"
            >
              👤 {t.nav.account}
            </button>
            <button
              onClick={() => handleNavClick('/admin')}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-[#D4AF37] hover:bg-[#151515]"
            >
              🛡️ {t.nav.admin}
            </button>
            <button
              onClick={() => handleNavClick('/services')}
              className="w-full mt-2 py-2.5 text-center text-xs font-bold text-[#080808] bg-gradient-to-r from-[#F4D675] to-[#D4AF37] rounded-lg shadow"
            >
              {t.nav.orderNow}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
