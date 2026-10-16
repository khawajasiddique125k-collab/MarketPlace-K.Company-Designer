import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, LogIn, LogOut, Package, Mail, Phone, Key, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    language,
    t,
    customer,
    customerLogin,
    customerRegister,
    customerLogout,
    orders,
    navigateTo,
  } = useApp();

  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;
    customerLogin(emailOrPhone.trim());
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !emailOrPhone.trim() || !whatsapp.trim()) return;
    customerRegister(name.trim(), emailOrPhone.trim(), whatsapp.trim());
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;
    setResetSent(true);
  };

  // Filter orders for current logged-in customer or show matching whatsapp/email
  const customerOrders = customer
    ? orders.filter(
        (o) =>
          o.whatsapp === customer.whatsapp ||
          (customer.email && o.email === customer.email) ||
          o.customerName.toLowerCase().includes(customer.name.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen py-10 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#222]">
          <div>
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
              Customer Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8F7F3]">
              {customer ? `Welcome, ${customer.name}` : 'Customer Login & Orders'}
            </h1>
          </div>

          {customer && (
            <button
              onClick={customerLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#333] hover:border-red-500/50 text-xs text-[#AAA] hover:text-red-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.nav.logout}</span>
            </button>
          )}
        </div>

        {!customer ? (
          /* Authentication Screen */
          <div className="max-w-md mx-auto bg-[#111111] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {isForgotPassword ? (
              /* Forgot password flow */
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-[#F8F7F3]">Reset Your Password</h2>
                <p className="text-xs text-[#8E8B82]">
                  Enter your registered email address or phone number to receive a verification reset link.
                </p>

                {resetSent ? (
                  <div className="p-4 rounded-lg bg-[#182618] border border-green-700/50 text-xs text-green-300 space-y-2">
                    <p className="font-bold">Reset Instructions Dispatched</p>
                    <p>A password reset link or SMS code has been sent to {emailOrPhone}. Please check your inbox or WhatsApp.</p>
                    <button
                      onClick={() => {
                        setIsForgotPassword(false);
                        setResetSent(false);
                      }}
                      className="text-xs text-[#F4D675] underline font-semibold pt-1"
                    >
                      Return to Login
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[#F8F7F3] font-medium mb-1">
                        Email or WhatsApp Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder="e.g. 03446302721 or user@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-[#D4AF37] text-xs font-bold text-[#080808] hover:bg-[#F4D675] transition-colors"
                    >
                      Send Password Reset Link
                    </button>
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(false)}
                        className="text-xs text-[#8E8B82] hover:text-[#F8F7F3]"
                      >
                        Back to Login
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : isRegistering ? (
              /* Registration flow */
              <form onSubmit={handleRegister} className="space-y-4 text-xs">
                <h2 className="text-lg font-bold text-[#F8F7F3] mb-1">Create Customer Account</h2>
                <p className="text-xs text-[#8E8B82] mb-3">
                  Register to view your ongoing graphic design orders and access finished deliverables.
                </p>

                <div>
                  <label className="block text-[#F8F7F3] font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Khawaja Siddiqui"
                    className="w-full px-3.5 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#F8F7F3] font-medium mb-1">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0344 6302721"
                    className="w-full px-3.5 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#F8F7F3] font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-3.5 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#F8F7F3] font-medium mb-1">Create Password *</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#F4D675] to-[#D4AF37] text-xs font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all shadow"
                >
                  Register Account
                </button>

                <div className="text-center pt-2">
                  <span className="text-xs text-[#8E8B82]">Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => setIsRegistering(false)}
                    className="text-xs font-semibold text-[#F4D675] hover:underline"
                  >
                    Login here
                  </button>
                </div>
              </form>
            ) : (
              /* Login flow */
              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <h2 className="text-lg font-bold text-[#F8F7F3] mb-1">Sign In</h2>
                <p className="text-xs text-[#8E8B82] mb-3">
                  Log in using your registered WhatsApp number or email address.
                </p>

                <div>
                  <label className="block text-[#F8F7F3] font-medium mb-1">
                    Email or WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="e.g. 03446302721 or user@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[#F8F7F3] font-medium">Password *</label>
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-[11px] text-[#D4AF37] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#F4D675] to-[#D4AF37] text-xs font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all shadow"
                >
                  Sign In to Account
                </button>

                <div className="text-center pt-2">
                  <span className="text-xs text-[#8E8B82]">Don't have an account yet? </span>
                  <button
                    type="button"
                    onClick={() => setIsRegistering(true)}
                    className="text-xs font-semibold text-[#F4D675] hover:underline"
                  >
                    Register free
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Logged In Customer Dashboard */
          <div className="space-y-8">
            {/* Profile summary */}
            <div className="bg-[#111111] border border-[#222] rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1C1C1C] border border-[#D4AF37]/40 flex items-center justify-center text-[#F4D675]">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F8F7F3]">{customer.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-[#8E8B82]">
                    <span>📱 {customer.whatsapp}</span>
                    <span>·</span>
                    <span>✉️ {customer.email}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigateTo('/services')}
                className="px-4 py-2 rounded-lg bg-[#D4AF37] text-xs font-bold text-[#080808] hover:bg-[#F4D675]"
              >
                Order New Design
              </button>
            </div>

            {/* Customer Orders */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#F8F7F3]">Your Orders History</h3>
                <span className="text-xs text-[#8E8B82]">{customerOrders.length} order(s) found</span>
              </div>

              {customerOrders.length > 0 ? (
                <div className="space-y-4">
                  {customerOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-[#111111] border border-[#222] rounded-xl p-5 hover:border-[#D4AF37]/40 transition-colors space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1E1E1E]">
                        <div>
                          <span className="text-sm font-mono font-bold text-[#F4D675]">
                            {ord.id}
                          </span>
                          <span className="text-xs text-[#706E66] block">
                            Date: {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded bg-[#1C1C1C] border border-[#333] text-xs font-semibold text-[#D4AF37]">
                            {ord.orderStatus}
                          </span>
                          <span className="px-2.5 py-1 rounded bg-[#1C1C1C] border border-[#333] text-xs text-[#8E8B82]">
                            {ord.paymentStatus}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs text-[#B8B5AC]">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>
                              {it.quantity}x {language === 'ur' ? it.serviceNameUr : it.serviceName}
                            </span>
                            <span className="font-semibold tabular-nums text-[#F8F7F3]">
                              {it.priceDisplay}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[#1E1E1E] flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[#8E8B82]">Total: </span>
                          <span className="font-bold text-[#F4D675]">Rs. {ord.total.toLocaleString()}</span>
                        </div>

                        <button
                          onClick={() => navigateTo('/track-order')}
                          className="px-3 py-1.5 rounded bg-[#1C1C1C] hover:bg-[#252525] text-xs text-[#D4AF37] border border-[#333] hover:border-[#D4AF37]"
                        >
                          View Live Tracking & Deliverables →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-[#111111] rounded-xl border border-[#222]">
                  <Package className="w-8 h-8 text-[#D4AF37]/40 mx-auto mb-2" />
                  <p className="text-xs text-[#8E8B82]">No orders placed under this customer profile yet.</p>
                  <button
                    onClick={() => navigateTo('/services')}
                    className="mt-3 px-4 py-2 bg-[#D4AF37] text-xs font-bold text-[#080808] rounded-lg"
                  >
                    Browse Design Catalog
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
