import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Upload,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  FileCheck,
  Clock,
  PhoneCall,
  Info,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    language,
    t,
    cart,
    subtotal,
    discount,
    total,
    appliedCoupon,
    hasQuotationItems,
    createOrder,
    navigateTo,
    customer,
  } = useApp();

  // Customer Form State
  const [customerName, setCustomerName] = useState(customer?.name || '');
  const [whatsapp, setWhatsapp] = useState(customer?.whatsapp || '');
  const [email, setEmail] = useState(customer?.email || '');
  const [designRequirements, setDesignRequirements] = useState('');
  const [referenceFileNames, setReferenceFileNames] = useState<string[]>([]);

  // JazzCash Payment State
  const [transactionId, setTransactionId] = useState('');
  const [amountPaid, setAmountPaid] = useState<number>(total);
  const [screenshotDataUrl, setScreenshotDataUrl] = useState<string>('');
  const [screenshotFileName, setScreenshotFileName] = useState<string>('');

  const [policyAgreed, setPolicyAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If cart is empty, redirect or prompt
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4 bg-[#080808]">
        <div className="text-center p-8 bg-[#111111] border border-[#222] rounded-2xl max-w-md space-y-4">
          <p className="text-base text-[#F8F7F3] font-bold">Your cart is empty.</p>
          <p className="text-xs text-[#8E8B82]">Please select at least one design service before proceeding to checkout.</p>
          <button
            onClick={() => navigateTo('/services')}
            className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-xs font-bold text-[#080808]"
          >
            Explore Services
          </button>
        </div>
      </div>
    );
  }

  const handleReferenceFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setReferenceFileNames((prev) => [...prev, ...names]);
    }
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('Screenshot file exceeds 10MB limit. Please choose a smaller image.');
        return;
      }
      setScreenshotFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!whatsapp.trim() || whatsapp.trim().length < 10) {
      setErrorMessage('Please enter a valid WhatsApp phone number for preview delivery.');
      return;
    }

    if (!designRequirements.trim()) {
      setErrorMessage('Please enter your design requirements and exact text to include.');
      return;
    }

    if (!transactionId.trim()) {
      setErrorMessage('Please enter your JazzCash Transaction Reference / TID.');
      return;
    }

    if (!amountPaid || amountPaid <= 0) {
      setErrorMessage('Please enter the amount paid via JazzCash.');
      return;
    }

    if (!screenshotDataUrl) {
      setErrorMessage('Please upload a screenshot of your JazzCash payment confirmation.');
      return;
    }

    if (!policyAgreed) {
      setErrorMessage('Please confirm agreement with the digital service policy and manual verification terms.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = cart.map((item) => ({
        serviceId: item.serviceId,
        serviceName: item.service.name,
        serviceNameUr: item.service.nameUr,
        unitPrice: item.service.price,
        quantity: item.quantity,
        priceDisplay: item.service.priceDisplay,
        requiresQuote: item.service.requiresQuote,
      }));

      const newOrder = createOrder({
        customerName: customerName.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim() || undefined,
        items: orderItems,
        subtotal,
        discount,
        total,
        couponCode: appliedCoupon?.code,
        hasQuotationItems,
        designRequirements: designRequirements.trim(),
        referenceFiles: referenceFileNames,
        jazzCashTransactionId: transactionId.trim(),
        amountPaid: Number(amountPaid),
        paymentScreenshot: screenshotDataUrl,
        paymentSubmittedAt: new Date().toISOString(),
      });

      // Navigate to confirmation page
      navigateTo(`/order-confirmation/${newOrder.id}`, { orderId: newOrder.id });
    } catch (err) {
      setErrorMessage('Failed to submit order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10 bg-[#080808]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-[#222]">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
            Secure Digital Checkout
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8F7F3]">
            {t.checkout.title}
          </h1>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-[#261212] border border-red-700/60 text-xs text-red-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Left Form (Col 8) */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Customer Details */}
            <div className="bg-[#111111] border border-[#222] rounded-xl p-6 space-y-4">
              <h2 className="text-base font-bold text-[#F8F7F3] border-b border-[#1E1E1E] pb-3">
                {t.checkout.customerDetails}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F8F7F3] mb-1">
                    {t.checkout.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t.checkout.namePlaceholder}
                    className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs sm:text-sm text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#F8F7F3] mb-1">
                    {t.checkout.whatsappLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder={t.checkout.whatsappPlaceholder}
                    className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs sm:text-sm text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#706E66] block mt-1">
                    Completed digital designs are dispatched to this WhatsApp number.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B8B5AC] mb-1">
                  {t.checkout.emailLabel}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.checkout.emailPlaceholder}
                  className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs sm:text-sm text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            {/* 2. Design Requirements */}
            <div className="bg-[#111111] border border-[#222] rounded-xl p-6 space-y-4">
              <h2 className="text-base font-bold text-[#F8F7F3] border-b border-[#1E1E1E] pb-3">
                {t.checkout.requirementsSection}
              </h2>

              <div>
                <label className="block text-xs font-medium text-[#F8F7F3] mb-1">
                  {t.checkout.requirementsLabel}
                </label>
                <textarea
                  rows={4}
                  required
                  value={designRequirements}
                  onChange={(e) => setDesignRequirements(e.target.value)}
                  placeholder={t.checkout.requirementsPlaceholder}
                  className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs sm:text-sm text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none leading-relaxed"
                />
              </div>

              {/* Reference files upload */}
              <div>
                <label className="block text-xs font-medium text-[#B8B5AC] mb-1">
                  {t.checkout.filesLabel}
                </label>
                <div className="border-2 border-dashed border-[#333] hover:border-[#D4AF37]/50 rounded-xl p-4 text-center cursor-pointer relative bg-[#0C0C0C]">
                  <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.docx,.doc,.zip"
                    onChange={handleReferenceFilesChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-6 h-6 text-[#8E8B82] mx-auto mb-1.5" />
                  <p className="text-xs text-[#E5E2DC]">Click to browse reference images or documents</p>
                  <p className="text-[10px] text-[#706E66]">{t.checkout.filesNote}</p>
                </div>

                {referenceFileNames.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {referenceFileNames.map((name, i) => (
                      <div key={i} className="text-xs text-[#D4AF37] flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 3. JazzCash Payment Instructions & Proof */}
            <div className="bg-[#111111] border border-[#D4AF37]/40 rounded-xl p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <h2 className="text-base font-bold text-[#F8F7F3]">
                    {t.checkout.jazzCashDetailsTitle}
                  </h2>
                </div>
                <p className="text-xs text-[#8E8B82]">
                  Manual transfer reporting. No automated charge or banking PIN required.
                </p>
              </div>

              {/* Exact JazzCash details card */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#1C170A] to-[#121212] border border-[#D4AF37]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8E8B82]">{t.checkout.accountNumberLabel}</span>
                  <span className="text-lg sm:text-xl font-mono font-black text-[#F4D675] tracking-wider select-all">
                    0321 6257021
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8E8B82]">{t.checkout.accountNameLabel}</span>
                  <span className="text-sm sm:text-base font-bold text-[#F8F7F3] tracking-wide select-all">
                    Tuba Mehmood
                  </span>
                </div>

                <div className="pt-2 border-t border-[#D4AF37]/20 text-[11px] text-[#C4C1B8] space-y-1">
                  <p>{t.checkout.step1}</p>
                  <p>{t.checkout.step2}</p>
                  <p>{t.checkout.step3}</p>
                </div>
              </div>

              {/* Warning note */}
              <div className="p-3.5 rounded-lg bg-[#241F10] border border-[#D4AF37]/30 text-xs text-[#F4D675] flex items-start gap-2">
                <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t.checkout.warning}</span>
              </div>

              {/* Payment Reporting Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F8F7F3] mb-1">
                    {t.checkout.transactionIdLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder={t.checkout.transactionIdPlaceholder}
                    className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs sm:text-sm text-[#F8F7F3] font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#F8F7F3] mb-1">
                    {t.checkout.amountPaidLabel}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs sm:text-sm text-[#F8F7F3] font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Screenshot Upload */}
              <div>
                <label className="block text-xs font-medium text-[#F8F7F3] mb-1">
                  {t.checkout.screenshotLabel}
                </label>
                <div className="border-2 border-dashed border-[#333] hover:border-[#D4AF37]/50 rounded-xl p-4 text-center cursor-pointer relative bg-[#0C0C0C]">
                  <input
                    type="file"
                    required={!screenshotDataUrl}
                    accept="image/*"
                    onChange={handleScreenshotChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-6 h-6 text-[#D4AF37] mx-auto mb-1.5" />
                  <p className="text-xs text-[#E5E2DC]">Click to upload payment screenshot (JPG, PNG)</p>
                  <p className="text-[10px] text-[#706E66]">Max 10MB file size</p>
                </div>

                {screenshotFileName && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Uploaded: {screenshotFileName}</span>
                  </div>
                )}

                {/* Screenshot preview if available */}
                {screenshotDataUrl && (
                  <div className="mt-3 p-2 bg-[#0A0A0A] border border-[#222] rounded-lg max-w-xs">
                    <span className="text-[10px] text-[#888] block mb-1">Screenshot Preview:</span>
                    <img
                      src={screenshotDataUrl}
                      alt="Payment Screenshot Preview"
                      className="max-h-40 w-auto rounded object-contain border border-[#333]"
                    />
                  </div>
                )}
              </div>

              {/* Policy Agreement */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={policyAgreed}
                    onChange={(e) => setPolicyAgreed(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-[#444] text-[#D4AF37] focus:ring-[#D4AF37] bg-[#0C0C0C]"
                  />
                  <span className="text-xs text-[#B8B5AC] leading-relaxed">
                    {t.checkout.orderPolicyAgree}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#121212] border border-[#222] rounded-2xl p-6 sticky top-28 space-y-6">
              <h2 className="text-sm font-bold text-[#F8F7F3] uppercase tracking-wider border-b border-[#222] pb-3">
                Selected Services ({cart.length})
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.serviceId} className="flex justify-between text-xs py-1 border-b border-[#1E1E1E]">
                    <div>
                      <span className="font-semibold text-[#F8F7F3] block">
                        {language === 'ur' ? item.service.nameUr : item.service.name}
                      </span>
                      <span className="text-[10px] text-[#706E66]">
                        Qty: {item.quantity} {item.service.unitLabel && `(${item.service.unitLabel})`}
                      </span>
                    </div>
                    <span className="font-bold text-[#F4D675] tabular-nums">
                      Rs. {(item.service.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 text-xs border-t border-[#222]">
                <div className="flex justify-between text-[#8E8B82]">
                  <span>Subtotal:</span>
                  <span className="tabular-nums">Rs. {subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount ({appliedCoupon?.code}):</span>
                    <span className="tabular-nums">- Rs. {discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#222] flex justify-between items-baseline">
                  <span className="font-bold text-[#F8F7F3]">Total Due:</span>
                  <span className="text-2xl font-black text-[#F4D675] tabular-nums">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F4D675] via-[#D4AF37] to-[#B28B27] text-xs sm:text-sm font-bold text-[#080808] hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                <span>{isSubmitting ? t.checkout.submitting : t.checkout.submitOrder}</span>
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="text-[11px] text-[#706E66] text-center space-y-1">
                <p>• Unique Order Reference generated instantly</p>
                <p>• WhatsApp direct follow-up enabled</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
