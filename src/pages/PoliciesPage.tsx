import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Clock, RefreshCw, FileText, AlertCircle, Ban } from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  const { language, t } = useApp();
  const [activeTab, setActiveTab] = useState<'digital' | 'delivery' | 'revisions' | 'formats' | 'refunds' | 'terms'>('digital');

  const tabs = [
    { id: 'digital', label: 'Digital-Only Policy', icon: Ban },
    { id: 'delivery', label: '24h Delivery Standard', icon: Clock },
    { id: 'revisions', label: '3 Free Revisions', icon: RefreshCw },
    { id: 'formats', label: 'Deliverable Formats', icon: FileText },
    { id: 'refunds', label: 'Refund & Cancellation', icon: AlertCircle },
    { id: 'terms', label: 'Terms & Conditions', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen py-12 bg-[#080808]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
            Governance & Transparency
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7F3]">
            Policies & Service Terms
          </h1>
          <p className="text-xs sm:text-sm text-[#8E8B82] mt-2">
            Clear, honest policies defining our digital delivery, revision limits, turnarounds, and manual JazzCash payment verification.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#222] scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#080808] font-bold shadow'
                    : 'bg-[#141414] text-[#B8B5AC] hover:bg-[#1E1E1E] hover:text-[#F8F7F3] border border-[#262626]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Policy Content Card */}
        <div className="bg-[#111111] border border-[#222] rounded-2xl p-6 sm:p-10 text-xs sm:text-sm text-[#D1CEC7] leading-relaxed space-y-6">
          {activeTab === 'digital' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#F8F7F3] flex items-center gap-2">
                <Ban className="w-5 h-5 text-[#D4AF37]" />
                <span>{t.policies.digitalOnlyTitle}</span>
              </h2>
              <p>{t.policies.digitalOnlyDesc}</p>
              <div className="p-4 rounded-xl bg-[#17140B] border border-[#D4AF37]/30 text-xs text-[#F4D675] space-y-2">
                <p className="font-bold">Summary of Digital Delivery:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>No physical printing, paper, vinyl, or shipping parcels are handled.</li>
                  <li>All deliverables are sent directly to customer WhatsApp (0344 6302721) or provided via download link.</li>
                  <li>Customer can print digital PDF and JPG files at any local print shop of their choice.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#F8F7F3] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                <span>{t.policies.deliveryTimeTitle}</span>
              </h2>
              <p>{t.policies.deliveryTimeDesc}</p>
              <p>
                Estimated delivery is approximately 24 hours for standard social media posts, thumbnails, single posters, and cards. More extensive projects such as Company Profiles, Multi-page E-books, or 3D Luxury Logos may take 48–72 hours based on workload and detailed requirements.
              </p>
              <p>
                <strong>Urgent Orders:</strong> Subject to availability and confirmation directly with owner Khawaja Siddiqui on WhatsApp.
              </p>
            </div>
          )}

          {activeTab === 'revisions' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#F8F7F3] flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#D4AF37]" />
                <span>{t.policies.revisionsTitle}</span>
              </h2>
              <p>{t.policies.revisionsDesc}</p>
              <div className="p-4 rounded-xl bg-[#141414] border border-[#222] space-y-2 text-xs">
                <p className="font-bold text-[#F8F7F3]">What constitutes a free revision?</p>
                <ul className="list-disc list-inside space-y-1 text-[#8E8B82]">
                  <li>Adjusting font styles, weights, or sizes</li>
                  <li>Tweaking color palettes or background tints</li>
                  <li>Fixing spelling errors or repositioning logos/headings</li>
                </ul>
                <p className="pt-2 text-amber-400 font-semibold">
                  * Completely changing the brand concept, introducing new design briefs, or requesting alternative design directions after initial approval requires an additional quotation.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'formats' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#F8F7F3] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
                <span>{t.policies.formatsTitle}</span>
              </h2>
              <p>{t.policies.formatsDesc}</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><strong>JPG:</strong> Ultra high-resolution 300 DPI for digital display, WhatsApp sharing, and web viewing.</li>
                <li><strong>PNG:</strong> Transparent background for logos and isolated stickers/cutouts.</li>
                <li><strong>PDF:</strong> Vector-sharp print-ready format suitable for sending to printing presses.</li>
                <li><strong>Source Files (PSD/AI):</strong> Available upon separate request or when specified in selected premium packages.</li>
              </ul>
            </div>
          )}

          {activeTab === 'refunds' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#F8F7F3] flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#D4AF37]" />
                <span>{t.policies.refundTitle}</span>
              </h2>
              <p>{t.policies.refundDesc}</p>
              <div className="p-4 rounded-xl bg-[#261515] border border-red-800/50 text-xs text-red-200 space-y-1.5">
                <p className="font-bold">Cancellation Policy Summary:</p>
                <p>Because graphic design entails custom creative labor and non-recoverable digital time, payments cannot be refunded once initial sketches or draft compositions have been created and dispatched for review.</p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#F8F7F3] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <span>Terms of Service & JazzCash Verification</span>
              </h2>
              <p>
                By placing an order on K.Company & Designer, customers agree to provide lawful, accurate text and imagery. Customers retain all intellectual property rights to their respective brand names and trademarks.
              </p>
              <p>
                <strong>Payment Verification Rule:</strong> Submitting a transaction ID and payment screenshot records the order as <em>Payment Submitted / Pending</em>. Payment is verified manually by the owner checking the transaction against the official JazzCash statement. We do not claim instant automated payment processing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
