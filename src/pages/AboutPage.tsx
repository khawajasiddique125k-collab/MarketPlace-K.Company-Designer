import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Sparkles, CheckCircle, Award, Palette, HeartHandshake, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, t, navigateTo } = useApp();

  return (
    <div className="min-h-screen py-12 bg-[#080808]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
            Founder & Studio Story
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7F3]">
            {t.about.title}
          </h1>
          <p className="text-sm text-[#F4D675] font-semibold mt-2">
            {t.about.promiseTitle}: "{t.about.promise}"
          </p>
        </div>

        {/* Founder Bio Card */}
        <div className="bg-[#111111] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#1F1B0F] to-[#0A0A0A] border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-2xl mb-4 overflow-hidden">
              <img
                src="/images/logo.svg"
                alt="K.Company & Designer Emblem"
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.about-logo-fallback');
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                }}
              />
              <span className="about-logo-fallback hidden font-cinzel font-black text-4xl text-[#F4D675]">KCD</span>
            </div>
            <h3 className="text-lg font-bold text-[#F8F7F3]">
              {t.about.ownerName}
            </h3>
            <span className="text-xs text-[#D4AF37] font-semibold block">
              {t.about.role}
            </span>
            <span className="text-[11px] text-[#8E8B82] block mt-1">
              Multan, Punjab, Pakistan
            </span>
          </div>

          <div className="md:col-span-8 space-y-4 text-xs sm:text-sm text-[#D1CEC7] leading-relaxed">
            <p>
              {t.about.bio}
            </p>
            <p>
              We pride ourselves on transparent pricing with our verified rate list starting from Rs. 50, fast 24-hour turnaround, 3 complimentary revisions on all projects, and direct delivery straight to your WhatsApp.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-bold text-[#F8F7F3]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>100% Digital Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>117+ Listed Services</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Transparent PKR Rates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121212] border border-[#222] p-6 rounded-xl space-y-3">
            <Palette className="w-6 h-6 text-[#D4AF37]" />
            <h4 className="text-base font-bold text-[#F8F7F3]">Creative Designs</h4>
            <p className="text-xs text-[#8E8B82] leading-relaxed">
              Every logo, banner, and invitation is crafted with intentional visual balance, elegant typography, and modern color theory.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#222] p-6 rounded-xl space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            <h4 className="text-base font-bold text-[#F8F7F3]">Affordable & Honest</h4>
            <p className="text-xs text-[#8E8B82] leading-relaxed">
              No hidden fees or unexpected charges. Every single service is openly listed with its official price in Pakistani Rupees.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#222] p-6 rounded-xl space-y-3">
            <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />
            <h4 className="text-base font-bold text-[#F8F7F3]">Direct WhatsApp Care</h4>
            <p className="text-xs text-[#8E8B82] leading-relaxed">
              Speak directly with the designer, review revisions on your phone, and receive master JPG and PNG files without complicated downloads.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <button
            onClick={() => navigateTo('/services')}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#F4D675] to-[#D4AF37] text-xs sm:text-sm font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
