import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus, PaymentStatus } from '../types';
import {
  Shield,
  Lock,
  Search,
  CheckCircle,
  XCircle,
  DollarSign,
  Tag,
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  Eye,
  FileCheck,
  Edit2,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { resolveImageUrl, handleImageError } from '../utils/imageHelper';

export const AdminPage: React.FC = () => {
  const {
    isAdmin,
    adminLogin,
    adminLogout,
    orders,
    updateOrderStatus,
    services,
    updateServicePrice,
    toggleServiceActive,
    coupons,
    updateCoupon,
    portfolio,
    addPortfolioItem,
    deletePortfolioItem,
    reviews,
    approveReview,
    deleteReview,
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'services' | 'coupons' | 'portfolio' | 'reviews'>('orders');

  // Orders filters
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<any | null>(null);

  // Deliverable update modal state
  const [deliverableUrlInput, setDeliverableUrlInput] = useState('');
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Service price edit state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editPriceInput, setEditPriceInput] = useState<number>(0);

  // New portfolio item state
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortCategory, setNewPortCategory] = useState('Logo & Branding');
  const [newPortDesc, setNewPortDesc] = useState('');
  const [newPortImage, setNewPortImage] = useState('/images/portfolio_branding.jpg');

  // Coupon configuration state for KCD125
  const kcd125 = coupons.find((c) => c.code === 'KCD125');
  const [couponType, setCouponType] = useState<'percentage' | 'fixed'>(kcd125?.discountType || 'percentage');
  const [couponValue, setCouponValue] = useState<number>(kcd125?.discountValue || 10);
  const [couponMinOrder, setCouponMinOrder] = useState<number>(kcd125?.minOrderAmount || 500);
  const [couponActive, setCouponActive] = useState<boolean>(kcd125?.isActive || false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(passwordInput);
    setPasswordInput('');
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    updateCoupon('KCD125', {
      discountType: couponType,
      discountValue: Number(couponValue),
      minOrderAmount: Number(couponMinOrder),
      isActive: couponActive,
      description: `${couponValue}${couponType === 'percentage' ? '%' : ' Rs.'} official discount for K.Company & Designer customers`,
    });
  };

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle || !newPortDesc) return;
    addPortfolioItem({
      title: newPortTitle,
      titleUr: newPortTitle,
      category: newPortCategory,
      categoryUr: newPortCategory,
      description: newPortDesc,
      imageUrl: newPortImage,
    });
    setNewPortTitle('');
    setNewPortDesc('');
  };

  const handleUpdateDeliverable = (orderId: string) => {
    updateOrderStatus(
      orderId,
      'Delivered',
      undefined,
      adminNoteInput || undefined,
      deliverableUrlInput || undefined
    );
    setSelectedOrderForModal(null);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center bg-[#080808] px-4">
        <div className="max-w-md w-full bg-[#111111] border border-[#D4AF37]/40 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/50 flex items-center justify-center mx-auto text-[#F4D675]">
            <Lock className="w-7 h-7" />
          </div>

          <div className="text-center">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
              Owner Administration
            </span>
            <h1 className="text-2xl font-extrabold text-[#F8F7F3]">
              K.Company & Designer Admin
            </h1>
            <p className="text-xs text-[#8E8B82] mt-1">
              Private portal for Khawaja Khaisama Mahmood Siddiqui to manage orders, payments, rate lists, and offers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#F8F7F3] mb-1">
                Admin Passkey *
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin password (e.g. admin125)"
                className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs sm:text-sm text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#F4D675] to-[#D4AF37] text-xs font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all shadow"
            >
              Sign In to Admin Dashboard
            </button>

            <p className="text-[11px] text-[#706E66] text-center">
              Default password for system owner is <span className="font-mono text-[#D4AF37]">admin125</span>
            </p>
          </form>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'All' && o.orderStatus !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.whatsapp.includes(q) ||
        (o.jazzCashTransactionId && o.jazzCashTransactionId.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen py-8 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#222] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#181818] border border-[#D4AF37]/50 flex items-center justify-center text-[#F4D675]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#F8F7F3]">
                Admin Management Suite
              </h1>
              <p className="text-xs text-[#8E8B82]">
                Khawaja Khaisama Mahmood Siddiqui • K.Company & Designer (Multan)
              </p>
            </div>
          </div>

          <button
            onClick={adminLogout}
            className="self-start sm:self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#333] hover:border-red-500/50 text-xs text-[#AAA] hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Admin</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-[#222] pb-2 scrollbar-none">
          {[
            { id: 'orders', label: `Orders (${orders.length})`, icon: FileCheck },
            { id: 'services', label: `Services & Rates (${services.length})`, icon: DollarSign },
            { id: 'coupons', label: 'Coupon KCD125', icon: Tag },
            { id: 'portfolio', label: `Portfolio (${portfolio.length})`, icon: ImageIcon },
            { id: 'reviews', label: `Reviews (${reviews.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#080808] shadow'
                    : 'bg-[#141414] text-[#B8B5AC] hover:bg-[#1E1E1E] hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-[#111111] border border-[#222] rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8E8B82] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by Order ID, Customer name, Phone, or JazzCash TID..."
                  className="w-full pl-10 pr-4 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8E8B82] whitespace-nowrap">Filter Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Order Received">Order Received</option>
                  <option value="Payment Pending">Payment Pending</option>
                  <option value="Designing">Designing</option>
                  <option value="Revision">Revision</option>
                  <option value="Completed">Completed</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#111111] border border-[#222] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#161616] border-b border-[#222] text-[#8E8B82] uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Order Ref</th>
                      <th className="py-3 px-4">Customer & Phone</th>
                      <th className="py-3 px-4">Total (PKR)</th>
                      <th className="py-3 px-4">JazzCash TID</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Order Status</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1D1D1D]">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#141414] transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#F4D675] whitespace-nowrap">
                          {ord.id}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-[#F8F7F3] block">{ord.customerName}</span>
                          <a
                            href={`https://wa.me/92${ord.whatsapp.replace(/^0+/, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#25D366] hover:underline flex items-center gap-1 font-mono text-[11px]"
                          >
                            <span>{ord.whatsapp}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="py-3 px-4 font-bold text-[#F8F7F3] tabular-nums whitespace-nowrap">
                          Rs. {ord.total.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-mono text-[#D4AF37]">
                          {ord.jazzCashTransactionId || '—'}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ord.paymentStatus === 'Payment Verified'
                                ? 'bg-green-950 text-green-300 border border-green-800'
                                : ord.paymentStatus === 'Payment Rejected'
                                ? 'bg-red-950 text-red-300 border border-red-800'
                                : 'bg-[#292211] text-[#F4D675] border border-[#D4AF37]/30'
                            }`}
                          >
                            {ord.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) =>
                              updateOrderStatus(ord.id, e.target.value as OrderStatus)
                            }
                            className="bg-[#0C0C0C] border border-[#333] rounded px-2 py-1 text-[11px] text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                          >
                            <option value="Order Received">Order Received</option>
                            <option value="Designing">Designing</option>
                            <option value="Revision">Revision</option>
                            <option value="Completed">Completed</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedOrderForModal(ord);
                                setDeliverableUrlInput(ord.deliverableFileUrl || '');
                                setAdminNoteInput(ord.adminNotes || '');
                              }}
                              className="px-2.5 py-1 rounded bg-[#1C1C1C] hover:bg-[#D4AF37] hover:text-[#080808] text-[#F4D675] font-semibold transition-colors text-[11px]"
                            >
                              Manage
                            </button>

                            {ord.paymentStatus !== 'Payment Verified' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, ord.orderStatus, 'Payment Verified')}
                                className="p-1 rounded bg-green-900/60 hover:bg-green-800 text-green-300"
                                title="Verify Payment"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}

                            {ord.paymentStatus !== 'Payment Rejected' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, ord.orderStatus, 'Payment Rejected')}
                                className="p-1 rounded bg-red-900/60 hover:bg-red-800 text-red-300"
                                title="Reject Payment"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES & PRICING */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <div className="bg-[#111111] border border-[#222] rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#F8F7F3]">Service Catalog & Rate List Management</h3>
                <p className="text-xs text-[#8E8B82]">All 117 services across 11 categories. Update price or toggle active status.</p>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#222] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#161616] border-b border-[#222] text-[#8E8B82] uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Service Name</th>
                      <th className="py-3 px-4">Listed Price</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center">Edit Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1D1D1D]">
                    {services.map((svc) => (
                      <tr key={svc.id} className="hover:bg-[#141414]">
                        <td className="py-2.5 px-4 text-[#8E8B82]">{svc.category}</td>
                        <td className="py-2.5 px-4 font-semibold text-[#F8F7F3]">{svc.name}</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-[#F4D675] tabular-nums">
                          {editingServiceId === svc.id ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={editPriceInput}
                                onChange={(e) => setEditPriceInput(Number(e.target.value))}
                                className="w-20 px-2 py-1 bg-[#0A0A0A] border border-[#D4AF37] rounded text-xs text-[#FFF]"
                              />
                              <button
                                onClick={() => {
                                  updateServicePrice(svc.id, editPriceInput);
                                  setEditingServiceId(null);
                                }}
                                className="px-2 py-1 bg-[#D4AF37] text-[#080808] font-bold rounded text-[10px]"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <span>{svc.priceDisplay}</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4">
                          <button
                            onClick={() => toggleServiceActive(svc.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              svc.isActive
                                ? 'bg-green-950 text-green-300 border border-green-800'
                                : 'bg-red-950 text-red-300 border border-red-800'
                            }`}
                          >
                            {svc.isActive ? 'Active' : 'Disabled'}
                          </button>
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <button
                            onClick={() => {
                              setEditingServiceId(svc.id);
                              setEditPriceInput(svc.price);
                            }}
                            className="p-1 text-[#8E8B82] hover:text-[#F4D675]"
                            title="Edit Price"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COUPON KCD125 */}
        {activeTab === 'coupons' && (
          <div className="max-w-xl bg-[#111111] border border-[#D4AF37]/40 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                Official Business Coupon Code
              </span>
              <h2 className="text-xl font-bold text-[#F8F7F3]">Configure Coupon: KCD125</h2>
              <p className="text-xs text-[#8E8B82] mt-1 leading-relaxed">
                Configure discount rules and toggle active status. The coupon code will only reduce customer totals when active.
              </p>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#F8F7F3] font-medium mb-1">Coupon Code</label>
                <input
                  type="text"
                  disabled
                  value="KCD125"
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-xs font-mono font-bold text-[#F4D675]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#F8F7F3] font-medium mb-1">Discount Type</label>
                  <select
                    value={couponType}
                    onChange={(e) => setCouponType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3]"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Rupees (Rs.)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#F8F7F3] font-medium mb-1">Discount Value</label>
                  <input
                    type="number"
                    min={1}
                    value={couponValue}
                    onChange={(e) => setCouponValue(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#F8F7F3] font-medium mb-1">Minimum Order Amount (Rs.)</label>
                <input
                  type="number"
                  min={0}
                  value={couponMinOrder}
                  onChange={(e) => setCouponMinOrder(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={couponActive}
                    onChange={(e) => setCouponActive(e.target.checked)}
                    className="w-4 h-4 text-[#D4AF37] rounded"
                  />
                  <span className="text-xs font-semibold text-[#F8F7F3]">
                    Enable Coupon KCD125 (Active for Customers)
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#F4D675] to-[#D4AF37] text-xs font-bold text-[#080808] rounded-lg hover:brightness-110 active:scale-95 transition-all shadow"
              >
                Save Coupon Configuration
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: PORTFOLIO MANAGEMENT */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-[#111111] border border-[#222] rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-[#F8F7F3]">Add New Showcase Artwork</h3>
              <form onSubmit={handleAddPortfolio} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#F8F7F3] mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={newPortTitle}
                    onChange={(e) => setNewPortTitle(e.target.value)}
                    placeholder="e.g. Modern Boutique Brand Kit"
                    className="w-full px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3]"
                  />
                </div>

                <div>
                  <label className="block text-[#F8F7F3] mb-1">Category</label>
                  <select
                    value={newPortCategory}
                    onChange={(e) => setNewPortCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3]"
                  >
                    <option value="Logo & Branding">Logo & Branding</option>
                    <option value="Social Media Design">Social Media Design</option>
                    <option value="YouTube Design">YouTube Design</option>
                    <option value="Posters & Advertisements">Posters & Advertisements</option>
                    <option value="Digital Cards">Digital Cards</option>
                    <option value="Islamic Designs">Islamic Designs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#F8F7F3] mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    required
                    value={newPortImage}
                    onChange={(e) => setNewPortImage(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3]"
                  />
                </div>

                <div>
                  <label className="block text-[#F8F7F3] mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={newPortDesc}
                    onChange={(e) => setNewPortDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#D4AF37] text-xs font-bold text-[#080808] rounded-lg hover:bg-[#F4D675]"
                >
                  Add Showcase Item
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-base font-bold text-[#F8F7F3]">Current Portfolio Items ({portfolio.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolio.map((item) => (
                  <div key={item.id} className="bg-[#121212] border border-[#222] rounded-xl overflow-hidden p-3 flex gap-3">
                    <img
                      src={resolveImageUrl(item.imageUrl)}
                      alt={item.title}
                      onError={(e) => handleImageError(e, '/images/portfolio_branding.jpg')}
                      className="w-20 h-20 object-cover rounded-lg bg-black shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-[#D4AF37] block font-bold">{item.category}</span>
                        <h4 className="text-xs font-bold text-[#F8F7F3] line-clamp-1">{item.title}</h4>
                      </div>
                      <button
                        onClick={() => deletePortfolioItem(item.id)}
                        className="self-end text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#F8F7F3]">Customer Reviews Moderation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-[#121212] border border-[#222] rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#F8F7F3] text-xs block">{rev.customerName}</span>
                      <span className="text-[11px] text-[#8E8B82]">{rev.serviceName} • {rev.date}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rev.isApproved
                          ? 'bg-green-950 text-green-300 border border-green-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {rev.isApproved ? 'Approved' : 'Pending Moderation'}
                    </span>
                  </div>

                  <p className="text-xs text-[#D1CEC7] italic">"{rev.comment}"</p>

                  <div className="pt-2 border-t border-[#1C1C1C] flex justify-end gap-2">
                    {!rev.isApproved && (
                      <button
                        onClick={() => approveReview(rev.id)}
                        className="px-3 py-1 bg-green-700 hover:bg-green-600 text-white rounded text-xs font-bold"
                      >
                        Approve & Publish
                      </button>
                    )}
                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="px-3 py-1 bg-red-950 hover:bg-red-900 text-red-300 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Details & Deliverable Upload Modal */}
        {selectedOrderForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#111111] border border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex justify-between items-center border-b border-[#222] pb-3">
                <div>
                  <span className="text-xs text-[#D4AF37] font-bold">Order Management</span>
                  <h3 className="text-xl font-bold text-[#F8F7F3]">{selectedOrderForModal.id}</h3>
                </div>
                <button
                  onClick={() => setSelectedOrderForModal(null)}
                  className="p-1 text-[#888] hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Customer requirements */}
              <div className="bg-[#0A0A0A] p-4 rounded-xl border border-[#222] space-y-2 text-xs">
                <span className="font-bold text-[#F8F7F3] block">Design Requirements Brief:</span>
                <p className="text-[#B8B5AC] leading-relaxed whitespace-pre-wrap">
                  {selectedOrderForModal.designRequirements}
                </p>
                {selectedOrderForModal.referenceFiles && selectedOrderForModal.referenceFiles.length > 0 && (
                  <div className="pt-2 border-t border-[#1C1C1C]">
                    <span className="text-[#888]">Reference files: </span>
                    <span className="text-[#D4AF37]">
                      {selectedOrderForModal.referenceFiles.join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Payment Screenshot review */}
              {selectedOrderForModal.paymentScreenshot && (
                <div className="bg-[#0A0A0A] p-4 rounded-xl border border-[#222] space-y-2">
                  <span className="text-xs font-bold text-[#F8F7F3] block">Payment Screenshot:</span>
                  <img
                    src={selectedOrderForModal.paymentScreenshot}
                    alt="Payment Screenshot"
                    className="max-h-60 rounded object-contain border border-[#333]"
                  />
                </div>
              )}

              {/* Deliverable upload / URL */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#F8F7F3]">
                  Completed Deliverable Artwork File Link / URL
                </label>
                <input
                  type="text"
                  value={deliverableUrlInput}
                  onChange={(e) => setDeliverableUrlInput(e.target.value)}
                  placeholder="https://drive.google.com/... or data URL"
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#333] rounded-lg text-xs text-[#F8F7F3]"
                />
              </div>

              {/* Internal Admin Note */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#F8F7F3]">Internal Designer Notes</label>
                <textarea
                  rows={2}
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="Notes for order progress or revision log..."
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#333] rounded-lg text-xs text-[#F8F7F3]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#222]">
                <button
                  onClick={() => setSelectedOrderForModal(null)}
                  className="px-4 py-2 bg-[#222] hover:bg-[#333] text-xs font-semibold rounded-lg text-[#CCC]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateDeliverable(selectedOrderForModal.id)}
                  className="px-5 py-2 bg-[#D4AF37] hover:bg-[#F4D675] text-xs font-bold text-[#080808] rounded-lg"
                >
                  Save Deliverable & Mark Delivered
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
