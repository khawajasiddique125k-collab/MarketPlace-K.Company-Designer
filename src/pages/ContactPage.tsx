import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageCircle,
  Mail,
  MapPin,
  ExternalLink,
  Send,
  CheckCircle,
  PhoneCall,
  Clock,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, t } = useApp();

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    // Build encoded whatsapp inquiry
    const formatted = encodeURIComponent(
      `Assalam-o-Alaikum! My name is ${name} (${whatsapp || 'N/A'}). Inquiry regarding: ${subject || 'Graphic Design'}. Message: ${message}`
    );
    window.open(`https://wa.me/923446302721?text=${formatted}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-12 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7F3]">
            {t.contact.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#8E8B82] mt-2 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card (Col 5) */}
          <div className="lg:col-span-5 bg-[#111111] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-[#F8F7F3] border-b border-[#222] pb-3">
              Official Contact Information
            </h3>

            {/* WhatsApp */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#182618] border border-green-700/50 flex items-center justify-center text-green-400 shrink-0">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-xs text-[#8E8B82] block font-medium">
                  {t.contact.whatsapp}
                </span>
                <a
                  href="https://wa.me/923446302721"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm sm:text-base font-mono font-bold text-[#F8F7F3] hover:text-[#25D366] transition-colors"
                >
                  0344 6302721
                </a>
                <span className="text-[10px] text-[#706E66] block">
                  Click to chat directly with Khawaja Siddiqui
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1E190E] border border-[#D4AF37]/40 flex items-center justify-center text-[#F4D675] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#8E8B82] block font-medium">
                  {t.contact.email}
                </span>
                <a
                  href="mailto:khawajasiddique125k@gmail.com"
                  className="text-xs sm:text-sm font-semibold text-[#F8F7F3] hover:text-[#D4AF37] transition-colors break-all"
                >
                  khawajasiddique125k@gmail.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#141414] border border-[#333] flex items-center justify-center text-[#D4AF37] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#8E8B82] block font-medium">
                  {t.contact.addressTitle}
                </span>
                <p className="text-xs font-medium text-[#D1CEC7] leading-relaxed">
                  {t.contact.address}
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#141414] border border-[#333] flex items-center justify-center text-[#8E8B82] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#8E8B82] block font-medium">
                  Operating Hours
                </span>
                <p className="text-xs text-[#D1CEC7]">
                  Monday - Sunday: 10:00 AM – 11:00 PM (PKT)
                </p>
                <span className="text-[10px] text-[#706E66]">WhatsApp orders accepted 24/7</span>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4 border-t border-[#222]">
              <span className="text-xs font-bold text-[#F8F7F3] block mb-2">
                {t.contact.socialTitle}:
              </span>
              <div className="space-y-1.5 text-xs text-[#B8B5AC]">
                <p><strong>TikTok:</strong> @khaisama.siddiqui</p>
                <p><strong>Instagram:</strong> @khaisama6811125k</p>
                <p><strong>YouTube:</strong> K.Company & Designer</p>
                <p>
                  <strong>Blog:</strong>{' '}
                  <a
                    href="https://designtechguide6811.blogspot.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#D4AF37] hover:underline inline-flex items-center gap-1"
                  >
                    <span>designtechguide6811.blogspot.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Contact & WhatsApp Form (Col 7) */}
          <div className="lg:col-span-7 bg-[#111111] border border-[#222] rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-[#F8F7F3] border-b border-[#222] pb-3">
              Send a Message or Project Inquiry
            </h3>

            {submitted ? (
              <div className="p-6 bg-[#182618] border border-green-700/50 rounded-xl text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-green-400 mx-auto" />
                <h4 className="text-sm font-bold text-green-300">Inquiry Dispatched to WhatsApp!</h4>
                <p className="text-xs text-green-200">
                  Your message has opened on WhatsApp. Khawaja Siddiqui will respond shortly to guide you.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-[#1A1A1A] text-xs text-[#CCC] rounded-lg hover:text-white"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#F8F7F3] font-medium mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ali Raza"
                      className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
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
                      className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#F8F7F3] font-medium mb-1">Subject / Project Type</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Logo Design, YouTube Channel Package, Urgent Poster..."
                    className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#F8F7F3] font-medium mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your design needs, preferred deadline, or any questions..."
                    className="w-full px-3.5 py-2.5 bg-[#0C0C0C] border border-[#333] rounded-lg text-xs text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-[#F4D675] to-[#D4AF37] text-xs font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Inquiry to WhatsApp (0344 6302721)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
