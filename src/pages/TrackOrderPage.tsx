import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import {
  Search,
  CheckCircle,
  Clock,
  Download,
  AlertCircle,
  RefreshCw,
  MessageCircle,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const {
    language,
    t,
    orders,
    getOrderById,
    submitRevisionRequest,
  } = useApp();

  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => {
    // Default preview the demo or first order so user can test tracking immediately
    return orders[0] || null;
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Revision state
  const [revisionNotes, setRevisionNotes] = useState('');
  const [revisionSuccess, setRevisionSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setRevisionSuccess(false);

    if (!searchOrderId.trim()) {
      setErrorMessage('Please enter an Order ID.');
      return;
    }

    const found = getOrderById(searchOrderId.trim());
    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchedOrder(null);
      setErrorMessage(t.trackOrder.notFound);
    }
  };

  const handleRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchedOrder || !revisionNotes.trim()) return;

    const ok = submitRevisionRequest(searchedOrder.id, revisionNotes.trim());
    if (ok) {
      setRevisionSuccess(true);
      setRevisionNotes('');
      // Refresh current searched order from updated store
      const updated = getOrderById(searchedOrder.id);
      if (updated) setSearchedOrder(updated);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
      case 'Completed':
      case 'Payment Verified':
        return 'text-green-400 bg-green-950/40 border-green-800/40';
      case 'Designing':
        return 'text-blue-400 bg-blue-950/40 border-blue-800/40';
      case 'Revision':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/40';
      case 'Payment Pending':
      case 'Order Received':
      default:
        return 'text-[#F4D675] bg-[#221B0B] border-[#D4AF37]/30';
    }
  };

  const whatsappMessage = searchedOrder
    ? encodeURIComponent(
        `Assalam-o-Alaikum, I am inquiring regarding the status of my Order ID: ${searchedOrder.id}.`
      )
    : '';
  const whatsappUrl = `https://wa.me/923446302721?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen py-10 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
            Real-Time Design Status
          </span>
          <h1 className="text-3xl font-extrabold text-[#F8F7F3]">
            {t.trackOrder.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#8E8B82] mt-2">
            {t.trackOrder.subtitle}
          </p>
        </div>

        {/* Search input box */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              placeholder="e.g. KCD-2026-1001"
              className="flex-1 px-4 py-2.5 bg-[#121212] border border-[#333] rounded-lg text-xs sm:text-sm text-[#F8F7F3] font-mono focus:border-[#D4AF37] focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#F4D675] to-[#D4AF37] text-xs font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t.trackOrder.searchButton}</span>
            </button>
          </div>
          {errorMessage && (
            <p className="text-xs text-red-400 mt-2 text-center">{errorMessage}</p>
          )}
        </form>

        {/* Order Details View */}
        {searchedOrder && (
          <div className="bg-[#111111] border border-[#222] rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
            {/* Top Bar: Order ID & Status Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222]">
              <div>
                <span className="text-[11px] text-[#706E66] block uppercase tracking-wider">
                  Order Reference
                </span>
                <span className="text-2xl font-mono font-black text-[#F4D675] tracking-wider">
                  {searchedOrder.id}
                </span>
                <span className="text-xs text-[#8E8B82] block mt-0.5">
                  Placed on: {new Date(searchedOrder.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${getStatusColor(searchedOrder.orderStatus)}`}>
                  {t.trackOrder.orderStatusLabel} {searchedOrder.orderStatus}
                </span>
                <span className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${getStatusColor(searchedOrder.paymentStatus)}`}>
                  {t.trackOrder.paymentStatusLabel} {searchedOrder.paymentStatus}
                </span>
              </div>
            </div>

            {/* Workflow Progress Bar */}
            <div className="bg-[#0C0C0C] p-4 rounded-xl border border-[#1E1E1E]">
              <span className="text-[11px] text-[#8E8B82] uppercase font-bold tracking-wider block mb-3">
                Design Pipeline
              </span>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs">
                {[
                  { label: 'Received', active: true },
                  { label: 'Payment Verified', active: searchedOrder.paymentStatus === 'Payment Verified' || searchedOrder.orderStatus !== 'Order Received' },
                  { label: 'Designing', active: ['Designing', 'Revision', 'Completed', 'Delivered'].includes(searchedOrder.orderStatus) },
                  { label: 'Delivered', active: ['Completed', 'Delivered'].includes(searchedOrder.orderStatus) },
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 ${
                        step.active
                          ? 'bg-[#D4AF37] text-[#080808]'
                          : 'bg-[#1C1C1C] text-[#666] border border-[#333]'
                      }`}
                    >
                      {step.active ? '✓' : idx + 1}
                    </div>
                    <span className={step.active ? 'text-[#F8F7F3] font-medium' : 'text-[#666]'}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Items & Customer Brief */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0C0C0C] border border-[#1E1E1E] rounded-xl p-4 space-y-3">
                <span className="text-xs font-bold text-[#F8F7F3] uppercase tracking-wider block border-b border-[#222] pb-2">
                  Ordered Services
                </span>
                <div className="space-y-2">
                  {searchedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-xs py-1">
                      <span className="text-[#D1CEC7]">
                        {it.quantity}x {language === 'ur' ? it.serviceNameUr : it.serviceName}
                      </span>
                      <span className="font-semibold text-[#F4D675] tabular-nums">
                        {it.priceDisplay}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#222] flex justify-between text-xs font-bold">
                  <span className="text-[#888]">Total Paid:</span>
                  <span className="text-[#F4D675]">Rs. {searchedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-[#0C0C0C] border border-[#1E1E1E] rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-[#F8F7F3] uppercase tracking-wider block border-b border-[#222] pb-2">
                  Design Requirements
                </span>
                <p className="text-xs text-[#9E9B93] leading-relaxed max-h-32 overflow-y-auto">
                  {searchedOrder.designRequirements}
                </p>
                {searchedOrder.jazzCashTransactionId && (
                  <div className="pt-2 border-t border-[#1C1C1C] text-[11px] text-[#706E66]">
                    JazzCash TID: <span className="font-mono text-[#D4AF37]">{searchedOrder.jazzCashTransactionId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Deliverable File Access */}
            <div className="p-5 rounded-xl bg-[#141414] border border-[#2A2A2A] space-y-3">
              <span className="text-xs font-bold text-[#F8F7F3] uppercase tracking-wider block">
                Deliverable Artwork File
              </span>
              {searchedOrder.deliverableFileUrl ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-[#0A0A0A] rounded-lg border border-green-800/40">
                  <div className="flex items-center gap-2 text-xs text-green-300">
                    <FileCheck className="w-4 h-4 text-green-400" />
                    <span>Your completed digital artwork is ready for download!</span>
                  </div>
                  <a
                    href={searchedOrder.deliverableFileUrl}
                    download={`Design_${searchedOrder.id}.png`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.trackOrder.downloadDeliverable}</span>
                  </a>
                </div>
              ) : (
                <div className="p-3 bg-[#0C0C0C] rounded-lg border border-[#222] text-xs text-[#8E8B82] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{t.trackOrder.noDeliverableYet}</span>
                </div>
              )}
            </div>

            {/* Revision Request Form */}
            <div className="p-5 rounded-xl bg-[#141414] border border-[#2A2A2A] space-y-4">
              <div>
                <span className="text-xs font-bold text-[#F8F7F3] uppercase tracking-wider block">
                  {t.trackOrder.requestRevision} (3 Free Revisions Included)
                </span>
                <p className="text-[11px] text-[#8E8B82] mt-0.5">
                  Submit specific feedback or adjustments (colors, wording, positioning) based on your original brief.
                </p>
              </div>

              {revisionSuccess ? (
                <div className="p-3 rounded-lg bg-[#182618] border border-green-700/50 text-xs text-green-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>{t.trackOrder.revisionSuccess} Designer has been notified.</span>
                </div>
              ) : (
                <form onSubmit={handleRevisionSubmit} className="space-y-3">
                  <textarea
                    rows={3}
                    required
                    value={revisionNotes}
                    onChange={(e) => setRevisionNotes(e.target.value)}
                    placeholder={t.trackOrder.revisionPlaceholder}
                    className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                  />
                  <div className="flex justify-between items-center">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#25D366] hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Message on WhatsApp</span>
                    </a>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#1E1E1E] hover:bg-[#D4AF37] hover:text-[#080808] border border-[#333] hover:border-[#D4AF37] text-xs font-bold text-[#F4D675] transition-colors"
                    >
                      {t.trackOrder.submitRevision}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
