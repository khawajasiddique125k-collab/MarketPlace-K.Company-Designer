import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, AlertCircle, CheckCircle } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    language,
    t,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    subtotal,
    discount,
    total,
    hasQuotationItems,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#080808]">
        <div className="max-w-md w-full bg-[#111111] border border-[#222] rounded-2xl p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#F8F7F3]">
            {t.cart.empty}
          </h2>
          <p className="text-xs text-[#8E8B82] leading-relaxed">
            Browse our complete rate list of 117+ graphic design services or budget bundles.
          </p>
          <button
            onClick={() => navigateTo('/services')}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#F4D675] to-[#D4AF37] text-xs font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            {t.cart.exploreCTA}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#222]">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8F7F3]">
            {t.cart.title} ({cart.length} {t.cart.itemsCount})
          </h1>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.cart.clearCart}</span>
          </button>
        </div>

        {/* Clear confirmation dialog */}
        {showClearConfirm && (
          <div className="mb-6 p-4 rounded-xl bg-[#261515] border border-red-800/60 flex items-center justify-between text-xs text-red-200">
            <span>{t.cart.confirmClear}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
                className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded font-bold"
              >
                Yes, Clear
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#CCC] rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List (Col 8) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => {
              const itemTotal = item.service.price * item.quantity;
              return (
                <div
                  key={item.serviceId}
                  className="bg-[#121212] border border-[#222] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#D4AF37]/30 transition-colors"
                >
                  <div className="flex-1">
                    <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider">
                      {language === 'ur' ? item.service.categoryUr : item.service.category}
                    </span>
                    <h3 className="text-base font-bold text-[#F8F7F3] mt-0.5">
                      {language === 'ur' ? item.service.nameUr : item.service.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-[#8E8B82]">
                      <span className="font-semibold text-[#F4D675]">
                        {item.service.priceDisplay}
                      </span>
                      {item.service.unitLabel && (
                        <span>({item.service.unitLabel})</span>
                      )}
                    </div>
                    {item.service.requiresQuote && (
                      <p className="text-[11px] text-[#D4AF37] mt-1">
                        * Starting quote. Final amount confirmed after brief evaluation.
                      </p>
                    )}
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#222]">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#333] rounded-lg bg-[#0C0C0C]">
                      <button
                        onClick={() => updateCartQuantity(item.serviceId, item.quantity - 1)}
                        className="p-1.5 text-[#AAA] hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#F8F7F3] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.serviceId, item.quantity + 1)}
                        className="p-1.5 text-[#AAA] hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Line total */}
                    <div className="text-right min-w-[90px]">
                      <span className="text-base font-extrabold text-[#F8F7F3] tabular-nums block">
                        Rs. {itemTotal.toLocaleString()}
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.serviceId)}
                      className="p-2 text-[#777] hover:text-red-400 rounded-lg hover:bg-[#1A1A1A] transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <button
                onClick={() => navigateTo('/services')}
                className="text-xs text-[#D4AF37] hover:underline inline-flex items-center gap-1.5"
              >
                <span>← {t.cart.continueShopping}</span>
              </button>
            </div>
          </div>

          {/* Order Summary & Coupon (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Summary card */}
            <div className="bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-6 space-y-6">
              <h2 className="text-base font-bold text-[#F8F7F3] border-b border-[#222] pb-3 uppercase tracking-wider text-xs">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-[#B8B5AC]">
                  <span>{t.cart.subtotal}</span>
                  <span className="text-[#F8F7F3] font-semibold tabular-nums">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{t.cart.discount} ({appliedCoupon?.code})</span>
                    </span>
                    <span className="font-semibold tabular-nums">
                      - Rs. {discount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#222] flex justify-between items-baseline">
                  <span className="font-bold text-[#F8F7F3]">{t.cart.total}</span>
                  <span className="text-2xl font-black text-[#F4D675] tabular-nums">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Quotation Note */}
              {hasQuotationItems && (
                <div className="p-3 rounded-lg bg-[#241F10] border border-[#D4AF37]/30 text-xs text-[#F4D675] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{t.cart.quotationNote}</span>
                </div>
              )}

              {/* Coupon Form */}
              <div className="pt-2">
                {appliedCoupon ? (
                  <div className="p-3 rounded-lg bg-[#182618] border border-green-700/50 flex items-center justify-between text-xs text-green-300">
                    <div>
                      <span className="font-bold">Code applied: {appliedCoupon.code}</span>
                      <p className="text-[11px] text-green-400">{appliedCoupon.description}</p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-300 hover:text-red-200 underline font-semibold ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder={t.cart.couponPlaceholder}
                        className="flex-1 px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] uppercase placeholder-none focus:border-[#D4AF37] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-[#1E1E1E] hover:bg-[#D4AF37] hover:text-[#080808] border border-[#333] hover:border-[#D4AF37] rounded-lg text-xs font-bold text-[#F4D675] transition-colors"
                      >
                        {t.cart.applyCoupon}
                      </button>
                    </div>

                    {couponFeedback && (
                      <p
                        className={`text-xs ${
                          couponFeedback.success ? 'text-green-400' : 'text-amber-400'
                        } flex items-center gap-1`}
                      >
                        {couponFeedback.success ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5" />
                        )}
                        <span>{couponFeedback.message}</span>
                      </p>
                    )}
                  </form>
                )}
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigateTo('/checkout')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F4D675] via-[#D4AF37] to-[#B28B27] text-xs sm:text-sm font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                <span>{t.cart.checkoutButton}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-[#706E66] text-center space-y-1">
                <p>• Manual JazzCash Payment (0321 6257021)</p>
                <p>• 100% Digital Delivery through WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
