import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { RateListPage } from './pages/RateListPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { PackagesPage } from './pages/PackagesPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { ArrowLeft } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentRoute, toastMessage, navigateTo } = useApp();

  const renderRoute = () => {
    // Normalizing pathname
    const path = currentRoute.split('?')[0];

    if (path === '/' || path === '') return <HomePage />;
    if (path === '/services') return <ServicesPage />;
    if (path === '/rate-list') return <RateListPage />;
    if (path === '/portfolio') return <PortfolioPage />;
    if (path === '/packages') return <PackagesPage />;
    if (path === '/cart') return <CartPage />;
    if (path === '/checkout') return <CheckoutPage />;
    if (path.startsWith('/order-confirmation')) return <OrderConfirmationPage />;
    if (path === '/track-order') return <TrackOrderPage />;
    if (path === '/account' || path === '/login' || path === '/register') return <AccountPage />;
    if (path.startsWith('/admin')) return <AdminPage />;
    if (path === '/about') return <AboutPage />;
    if (path === '/contact') return <ContactPage />;
    if (path === '/policies' || path === '/terms' || path === '/privacy' || path === '/refund-policy' || path === '/digital-service-policy') {
      return <PoliciesPage />;
    }

    // 404 Fallback
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#080808] p-4">
        <div className="max-w-md w-full bg-[#111111] border border-[#222] rounded-2xl p-8 text-center space-y-4">
          <span className="text-4xl font-black font-cinzel text-[#D4AF37]">404</span>
          <h2 className="text-xl font-bold text-[#F8F7F3]">Page Not Found</h2>
          <p className="text-xs text-[#8E8B82]">
            The requested page does not exist or has been moved. Explore our complete service catalog instead.
          </p>
          <button
            onClick={() => navigateTo('/')}
            className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-xs font-bold text-[#080808] hover:bg-[#F4D675] inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-[#F8F7F3] selection:bg-[#D4AF37]/30 selection:text-[#F4D675]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#141414] border border-[#D4AF37]/50 text-[#F4D675] text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Navigation */}
      <Navbar />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Service Detail Modal */}
      <ServiceDetailModal />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
