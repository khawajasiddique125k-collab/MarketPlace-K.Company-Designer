import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, MessageCircle, ArrowRight, ShieldAlert, FileText, Search } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { language, t, routeParams, getOrderById, navigateTo } = useApp();
  
  // Extract order ID from params or URL path
  const pathParts = window.location.pathname.split('/');
  const orderIdFromPath = pathParts[pathParts.length - 1];
  const orderId = routeParams?.orderId || orderIdFromPath;

  const order = getOrderById(orderId);

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum, I have submitted my design order. My Order ID is ${order?.id || orderId}. Please guide me about payment verification and the next steps.`
  );
  const whatsappUrl = `https://wa.me/923446302721?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen py-12 bg-[#080808] flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">
        <div className="bg-[#111111] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-10 text-center space-y-6 shadow-2xl">
          {/* Success Check Icon */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E2E1E] to-[#0A140A] border border-green-500/40 flex items-center justify-center mx-auto text-green-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
              Submission Recorded
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8F7F3]">
              {t.orderConfirmation.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#8E8B82] mt-2">
              {t.orderConfirmation.thankYou}
            </p>
          </div>

          {/* Unique Order ID Card */}
          <div className="p-4 rounded-xl bg-[#161616] border border-[#333] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left">
              <span className="text-[11px] text-[#706E66] block uppercase tracking-wider">
                {t.orderConfirmation.orderId}
              </span>
              <span className="text-xl sm:text-2xl font-mono font-black text-[#F4D675] tracking-wider select-all">
                {order?.id || orderId}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#2B2312] border border-[#D4AF37]/30 text-xs font-semibold text-[#F4D675]">
                {order?.paymentStatus || 'Payment Pending'}
              </span>
            </div>
          </div>

          {/* Summary Details */}
          {order && (
            <div className="text-left bg-[#0C0C0C] border border-[#222] rounded-xl p-4 text-xs space-y-2">
              <div className="flex justify-between text-[#8E8B82]">
                <span>Customer:</span>
                <span className="text-[#F8F7F3] font-medium">{order.customerName}</span>
              </div>
              <div className="flex justify-between text-[#8E8B82]">
                <span>WhatsApp:</span>
                <span className="text-[#F8F7F3] font-medium">{order.whatsapp}</span>
              </div>
              <div className="flex justify-between text-[#8E8B82]">
                <span>Transaction Ref:</span>
                <span className="text-[#F4D675] font-mono">{order.jazzCashTransactionId}</span>
              </div>
              <div className="flex justify-between text-[#8E8B82] pt-2 border-t border-[#1C1C1C]">
                <span>Total Amount Reported:</span>
                <span className="text-sm font-bold text-[#F4D675] tabular-nums">
                  Rs. {order.total.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Admin Verification Notice */}
          <div className="p-4 rounded-xl bg-[#1F1B0F] border border-[#D4AF37]/30 text-xs text-[#E5D7A0] text-left flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-[#F8F7F3] block">Manual Verification Notice:</span>
              <p className="leading-relaxed">
                {t.orderConfirmation.statusNotice} To fast-track verification, send your Order Reference ID directly to our WhatsApp support line below.
              </p>
            </div>
          </div>

          {/* WhatsApp Action Button */}
          <div className="space-y-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] text-white text-xs sm:text-sm font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#25D366]/15"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{t.orderConfirmation.whatsappCTA}</span>
            </a>

            <button
              onClick={() => navigateTo('/track-order')}
              className="w-full py-3 rounded-xl border border-[#333] hover:border-[#D4AF37] text-xs font-semibold text-[#B8B5AC] hover:text-[#F8F7F3] transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.orderConfirmation.trackOrderCTA}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
