import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/ServiceCard';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2,
  Clock,
  Layers,
  Search,
  MessageCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Award,
} from 'lucide-react';
import { resolveImageUrl, handleImageError } from '../utils/imageHelper';

export const HomePage: React.FC = () => {
  const {
    language,
    t,
    navigateTo,
    services,
    portfolio,
    reviews,
    submitReview,
    addToCart,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('Logo & Branding');
  const [homeSearchQuery, setHomeSearchQuery] = useState<string>('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Review submission state
  const [reviewName, setReviewName] = useState('');
  const [reviewService, setReviewService] = useState('Business Logo');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    submitReview({
      customerName: reviewName,
      serviceName: reviewService,
      rating: reviewRating,
      comment: reviewComment,
    });
    setReviewSubmitted(true);
    setReviewName('');
    setReviewComment('');
  };

  const handleOrderSimilar = (associatedServiceId?: string) => {
    if (associatedServiceId) {
      const match = services.find((s) => s.id === associatedServiceId);
      if (match) {
        addToCart(match, 1);
        navigateTo('/checkout');
        return;
      }
    }
    navigateTo('/services');
  };

  const featuredServices = services.filter((s) => s.featured).slice(0, 6);
  const categoryServices = services
    .filter((s) => s.category === activeCategory)
    .slice(0, 4);

  const budgetPackages = services
    .filter((s) => s.category === 'Special Budget Packages')
    .slice(0, 4);

  const approvedReviews = reviews.filter((r) => r.isApproved);

  const faqs = [
    {
      q: language === 'ur' ? 'ڈیزائن آرڈر کی ڈلیوری کیسے اور کہاں کی جاتی ہے؟' : 'How and where will I receive my finished design?',
      a: language === 'ur'
        ? 'کے۔کمپنی اینڈ ڈیزائنر کی تمام سروسز 100% ڈیجیٹل ہیں۔ تیار شدہ ڈیزائن آپ کے واٹس ایپ نمبر (0344 6302721) پر ہائی ریزولوشن JPG، شفاف PNG اور پرنٹ ریڈی PDF میں بھیجا جائے گا۔'
        : 'All our graphic design services are strictly digital. Your completed high-resolution JPG, transparent PNG, and print-ready PDF files are delivered directly to your WhatsApp number (0344 6302721).',
    },
    {
      q: language === 'ur' ? 'جاز کیش (JazzCash) کے ذریعے ادائیگی کا طریقہ کیا ہے؟' : 'How does the JazzCash manual payment process work?',
      a: language === 'ur'
        ? 'آرڈر جمع کروانے کے بعد آپ ہمارے تصدیق شدہ اکاؤنٹ 0321 6257021 (نام: TUBA MEHMOOD) پر مطلوبہ رقم منتقل کریں۔ اس کے بعد ٹرانزیکشن آئی ڈی (TID) اور اسکرین شاٹ فارم میں درج کریں۔ ہمارا ایڈمن دستی تصدیق کر کے کام شروع کرے گا۔'
        : 'After placing your order, transfer the order total to JazzCash Number: 0321 6257021 (Account Name: TUBA MEHMOOD). Enter your transaction ID and upload the payment screenshot. The administrator manually verifies the transfer before design begins.',
    },
    {
      q: language === 'ur' ? 'ایک آرڈر میں کتنی مفت ترامیم (Revisions) شامل ہیں؟' : 'How many free revisions are included in my order?',
      a: language === 'ur'
        ? 'ہر آرڈر میں بنیادی بریف کے مطابق 3 مفت ترامیم شامل ہیں۔ اگر آپ کو رنگ، فونٹ یا لے آؤٹ میں کوئی معمولی تبدیلی چاہیے تو ہم بلا معاوضہ کریں گے۔'
        : 'Three complimentary revisions are included with every project according to your original design brief for adjustments in fonts, colors, or positioning.',
    },
    {
      q: language === 'ur' ? 'کیا جن سروسز کے ساتھ (+) کا نشان ہے ان کی حتمی قیمت الگ ہوگی؟' : 'What does the (+) sign next to certain service prices mean?',
      a: language === 'ur'
        ? 'جن سروسز کے ساتھ (+) ہے (مثلاً کمپنی پروفائل، پیکجنگ، ای بک) وہ ابتدائی قیمتیں ہیں۔ حتمی کوٹیشن آپ کے صفحات اور تفصیلات دیکھ کر بتائی جائے گی۔'
        : 'Services marked with (+) like Company Profile or E-book design are baseline starting prices. A custom final quotation is confirmed upon reviewing your specific page count or creative scope.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden border-b border-[#D4AF37]/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1C170A] via-[#080808] to-[#080808] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#D4AF37]" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
                  {t.hero.eyebrow}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8F7F3] leading-[1.12]">
                {t.hero.headline}{' '}
                <span className="gold-gradient-text block mt-1">
                  {t.hero.subheadline}
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#B8B5AC] leading-relaxed max-w-xl">
                {t.hero.description}
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('/services')}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#F4D675] via-[#D4AF37] to-[#B28B27] text-xs sm:text-sm font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2"
                >
                  <span>{t.hero.exploreServices}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('/portfolio')}
                  className="px-6 py-3 rounded-lg border border-[#D4AF37]/40 text-xs sm:text-sm font-semibold text-[#F8F7F3] hover:border-[#D4AF37] hover:bg-[#161616] active:scale-95 transition-all"
                >
                  {t.hero.viewPortfolio}
                </button>

                <button
                  onClick={() => navigateTo('/packages')}
                  className="px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold text-[#F4D675] hover:text-white transition-colors"
                >
                  {t.nav.packages} →
                </button>
              </div>

              {/* Supporting Value Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#222]">
                <div>
                  <span className="text-xs font-bold text-[#F8F7F3] block">117+</span>
                  <span className="text-[11px] text-[#8E8B82]">{t.hero.benefits.creative}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-[#F8F7F3] block">100%</span>
                  <span className="text-[11px] text-[#8E8B82]">{t.hero.benefits.quality}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-[#F8F7F3] block">Rs. 50+</span>
                  <span className="text-[11px] text-[#8E8B82]">{t.hero.benefits.pricing}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-[#F8F7F3] block">WhatsApp</span>
                  <span className="text-[11px] text-[#8E8B82]">{t.hero.benefits.delivery}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto rounded-2xl p-1 bg-gradient-to-b from-[#D4AF37]/40 to-transparent shadow-2xl">
                <div className="relative rounded-xl overflow-hidden bg-[#111111] border border-[#222]">
                  <img
                    src="/images/hero_design_showcase.jpg"
                    alt="K.Company & Designer Luxury Design Portfolio Showcase"
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, '/images/hero_design_showcase.jpg')}
                    className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#0C0C0C]/85 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#F8F7F3]">
                        {t.hero.showcaseBadge}
                      </p>
                      <p className="text-[10px] text-[#D4AF37]">
                        Executive Black & Gold Identity Series
                      </p>
                    </div>
                    <button
                      onClick={() => navigateTo('/services')}
                      className="px-3 py-1.5 rounded bg-[#D4AF37] text-[10px] font-bold text-[#080808] hover:bg-[#F4D675] transition-colors"
                    >
                      {t.servicesSection.orderNow}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST AND VALUE STRIP */}
      <section className="bg-[#0D0D0D] py-6 border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center gap-2.5">
              <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
              <span className="text-xs font-semibold text-[#D1CEC7] text-left">
                {t.valueStrip.badge1}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Zap className="w-5 h-5 text-[#F4D675] shrink-0" />
              <span className="text-xs font-semibold text-[#D1CEC7] text-left">
                {t.valueStrip.badge2}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <span className="text-xs font-semibold text-[#D1CEC7] text-left">
                {t.valueStrip.badge3}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Clock className="w-5 h-5 text-[#F4D675] shrink-0" />
              <span className="text-xs font-semibold text-[#D1CEC7] text-left">
                {t.valueStrip.badge4}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED DESIGN CATEGORIES */}
      <section className="py-16 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                {language === 'ur' ? 'ڈیزائن کیٹیگریز' : 'Design Disciplines'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F7F3] mt-1">
                {language === 'ur' ? 'مقبول ڈیزائن کیٹیگریز دریافت کریں' : 'Explore Featured Categories'}
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/services')}
              className="text-xs font-semibold text-[#F4D675] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>{t.packages.viewAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
            {[
              'Logo & Branding',
              'Social Media Design',
              'YouTube Design',
              'Posters & Advertisements',
              'Product & Business Design',
              'Digital Cards',
              'Islamic Designs',
              'Photo Editing',
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-[#080808] font-bold shadow-md shadow-[#D4AF37]/20'
                    : 'bg-[#141414] text-[#B8B5AC] hover:bg-[#1E1E1E] hover:text-[#F8F7F3] border border-[#262626]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Category Service Cards Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {categoryServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. POPULAR SERVICES SPOTLIGHT */}
      <section className="py-16 bg-[#0E0E0E] border-y border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
              {language === 'ur' ? 'سب سے زیادہ مانگے جانے والے ڈیزائن' : 'Most Popular Requests'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F7F3] mt-1">
              {language === 'ur' ? 'گاہکوں کے پسندیدہ ترین ڈیزائنز' : 'Client Favorites & Best Sellers'}
            </h2>
            <p className="text-xs sm:text-sm text-[#8E8B82] mt-2">
              From corporate business logos to high-engagement YouTube thumbnails and social packs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigateTo('/services')}
              className="px-6 py-3 rounded-lg border border-[#D4AF37]/40 text-xs sm:text-sm font-semibold text-[#F4D675] hover:bg-[#D4AF37]/10 transition-colors inline-flex items-center gap-2"
            >
              <span>{language === 'ur' ? 'تمام 117 سروسز کیٹلاگ دیکھیں' : 'View Full 117-Service Catalog'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. SPECIAL BUDGET PACKAGES */}
      <section className="py-16 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                {t.packages.title}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F7F3] mt-1">
                {language === 'ur' ? 'مخصوص بجٹ میں مکمل برانڈنگ پیکجز' : 'High-Value Fixed Deals'}
              </h2>
              <p className="text-xs sm:text-sm text-[#8E8B82] mt-1">
                {t.packages.subtitle}
              </p>
            </div>
            <button
              onClick={() => navigateTo('/packages')}
              className="text-xs font-semibold text-[#F4D675] hover:underline flex items-center gap-1"
            >
              <span>{t.packages.viewAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {budgetPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#121212] border border-[#D4AF37]/30 rounded-xl p-6 flex flex-col justify-between hover:border-[#D4AF37] transition-all hover:-translate-y-1"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-2">
                    {language === 'ur' ? pkg.categoryUr : pkg.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#F8F7F3] mb-2">
                    {language === 'ur' ? pkg.nameUr : pkg.name}
                  </h3>
                  <p className="text-xs text-[#8E8B82] leading-relaxed mb-4">
                    {language === 'ur' ? pkg.descriptionUr : pkg.description}
                  </p>
                  
                  {pkg.deliverables && (
                    <div className="space-y-1.5 mb-6 pt-3 border-t border-[#222]">
                      {pkg.deliverables.map((d, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#D1CEC7]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#222]">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs text-[#706E66]">Fixed Price:</span>
                    <span className="text-2xl font-black text-[#F4D675]">
                      {pkg.priceDisplay}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(pkg, 1);
                      navigateTo('/checkout');
                    }}
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#F4D675] to-[#D4AF37] text-xs font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all text-center"
                  >
                    {t.servicesSection.orderNow}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PORTFOLIO SHOWCASE */}
      <section className="py-16 bg-[#0E0E0E] border-y border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                {t.nav.portfolio}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F7F3] mt-1">
                {language === 'ur' ? 'تخلیقی ڈیزائن شوکیس' : 'Creative Design Showcase'}
              </h2>
              <p className="text-xs sm:text-sm text-[#8E8B82] mt-1">
                {t.hero.showcaseBadge} — Original compositions created for K.Company & Designer clients.
              </p>
            </div>
            <button
              onClick={() => navigateTo('/portfolio')}
              className="text-xs font-semibold text-[#F4D675] hover:underline flex items-center gap-1"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-[#141414] border border-[#D4AF37]/20 rounded-xl overflow-hidden group hover:border-[#D4AF37] transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={resolveImageUrl(item.imageUrl)}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, '/images/hero_design_showcase.jpg')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-[#F8F7F3] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-[#D4AF37]/30">
                    {language === 'ur' ? item.categoryUr : item.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#F8F7F3] group-hover:text-[#F4D675] transition-colors mb-1.5">
                      {language === 'ur' ? item.titleUr : item.title}
                    </h3>
                    <p className="text-xs text-[#8E8B82] leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleOrderSimilar(item.associatedServiceId)}
                    className="w-full py-2 px-3 rounded-lg border border-[#D4AF37]/30 text-xs font-semibold text-[#F4D675] hover:bg-[#D4AF37] hover:text-[#080808] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{t.servicesSection.orderSimilar}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS (4 STEPS) */}
      <section className="py-16 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
              {language === 'ur' ? 'آرڈر کا طریقہ کار' : 'Simple Order Workflow'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F7F3] mt-1">
              {language === 'ur' ? 'آرڈر سے واٹس ایپ ڈلیوری تک کے مراحل' : 'How It Works in 4 Easy Steps'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: language === 'ur' ? 'سروس کا انتخاب کریں' : 'Select Design Service',
                desc: language === 'ur' ? 'ہماری ریٹ لسٹ سے اپنی پسندیدہ سروس منتخب کریں یا کارٹ میں شامل کریں۔' : 'Pick from our complete catalog of 117 services or budget bundles.',
              },
              {
                num: '02',
                title: language === 'ur' ? 'تفصیلات اور جاز کیش' : 'Enter Brief & JazzCash',
                desc: language === 'ur' ? 'اپنا متن اور مطلوبہ تفصیلات لکھیں، اور جاز کیش (0321 6257021 طوبیٰ محمود) پر رقم بھیجیں۔' : 'Provide your text & references, then transfer payment to 0321 6257021 (Tuba Mehmood).',
              },
              {
                num: '03',
                title: language === 'ur' ? 'دستی تصدیق اور ڈیزائننگ' : 'Admin Verifies & Designs',
                desc: language === 'ur' ? 'ایڈمن ٹرانزیکشن چیک کرے گا اور خواجہ صدیقی آپ کے ڈیزائن پر کام شروع کریں گے۔' : 'Owner verifies transaction screenshot and starts crafting your high-end design.',
              },
              {
                num: '04',
                title: language === 'ur' ? 'واٹس ایپ پر ڈلیوری' : 'WhatsApp Delivery',
                desc: language === 'ur' ? 'تیار شدہ فائلز 24 گھنٹوں میں آپ کے واٹس ایپ پر موصول ہو جائیں گی۔ 3 ترامیم مفت ہیں۔' : 'Receive master JPG, PNG & PDF on WhatsApp (0344 6302721) with 3 free revisions.',
              },
            ].map((step) => (
              <div key={step.num} className="bg-[#121212] border border-[#222] p-6 rounded-xl relative">
                <span className="text-2xl font-black text-[#D4AF37]/40 block mb-2 font-cinzel">
                  {step.num}
                </span>
                <h3 className="text-base font-bold text-[#F8F7F3] mb-2">{step.title}</h3>
                <p className="text-xs text-[#8E8B82] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS & FORM */}
      <section className="py-16 bg-[#0E0E0E] border-t border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
              {language === 'ur' ? 'گاہکوں کے تاثرات' : 'Client Feedback'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F7F3] mt-1">
              {language === 'ur' ? 'گاہک ہمارے کام کے متعلق کیا کہتے ہیں؟' : 'Genuine Client Reviews'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {approvedReviews.map((rev) => (
              <div key={rev.id} className="bg-[#121212] border border-[#222] p-6 rounded-xl">
                <div className="flex items-center gap-1 text-[#F4D675] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#D1CEC7] leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
                <div className="pt-3 border-t border-[#1E1E1E] flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#F8F7F3] block">{rev.customerName}</span>
                    <span className="text-[#8E8B82] text-[11px]">{rev.serviceName}</span>
                  </div>
                  <span className="text-[10px] text-[#706E66]">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Leave a review box */}
          <div className="max-w-xl mx-auto bg-[#141414] border border-[#D4AF37]/30 rounded-xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#F8F7F3] mb-1">
              {language === 'ur' ? 'اپنا ریویو جمع کروائیں' : 'Leave Your Feedback'}
            </h3>
            <p className="text-xs text-[#8E8B82] mb-4">
              All reviews undergo manual review by the owner before publication.
            </p>

            {reviewSubmitted ? (
              <div className="p-4 rounded-lg bg-[#182618] border border-green-700/50 text-xs text-green-300">
                {language === 'ur'
                  ? 'شکریہ! آپ کا ریویو موصول ہو چکا ہے اور ایڈمن کی منظوری کے بعد یہاں ظاہر ہوگا۔'
                  : 'Thank you! Your review has been submitted for moderation and will appear once verified.'}
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#F8F7F3] font-medium mb-1">
                    {language === 'ur' ? 'آپ کا نام' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-md text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#F8F7F3] font-medium mb-1">Service Ordered</label>
                    <select
                      value={reviewService}
                      onChange={(e) => setReviewService(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-md text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="Business Logo">Business Logo</option>
                      <option value="YouTube Thumbnail">YouTube Thumbnail</option>
                      <option value="Facebook Cover">Facebook Cover</option>
                      <option value="Wedding Card">Wedding Card</option>
                      <option value="Budget Package">Budget Package</option>
                      <option value="Photo Retouching">Photo Retouching</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#F8F7F3] font-medium mb-1">Rating</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-md text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value={5}>★★★★★ (5 Stars)</option>
                      <option value={4}>★★★★☆ (4 Stars)</option>
                      <option value={3}>★★★☆☆ (3 Stars)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#F8F7F3] font-medium mb-1">
                    {language === 'ur' ? 'آپ کا تبصرہ' : 'Review Comments *'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your experience regarding delivery speed, quality, and communication..."
                    className="w-full px-3 py-2 bg-[#0C0C0C] border border-[#333] rounded-md text-[#F8F7F3] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#F4D675] to-[#D4AF37] text-xs font-bold text-[#080808] hover:brightness-110 active:scale-95 transition-all"
                >
                  Submit Review for Approval
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 bg-[#080808]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
              {language === 'ur' ? 'عام سوالات' : 'Help & Answers'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F7F3] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#121212] border border-[#222] rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-[#F8F7F3] hover:text-[#F4D675] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#8E8B82] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#9E9B93] leading-relaxed border-t border-[#1C1C1C] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. WHATSAPP & CONTACT CTA STRIP */}
      <section className="py-16 bg-gradient-to-b from-[#14120B] to-[#0A0A0A] border-t border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
            LET'S CREATE SOMETHING AMAZING!
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7F3] max-w-2xl mx-auto">
            Ready to Transform Your Simple Ideas Into Stunning Designs?
          </h2>
          <p className="text-xs sm:text-sm text-[#B8B5AC] max-w-xl mx-auto leading-relaxed">
            Message owner Khawaja Khaisama Mahmood Siddiqui directly on WhatsApp (0344 6302721) or explore our complete catalog.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/923446302721?text=Assalam-o-Alaikum!%20I%20am%20ready%20to%20order%20a%20design%20from%20K.Company%20%26%20Designer."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-lg bg-[#25D366] text-xs sm:text-sm font-bold text-white hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp: 0344 6302721</span>
            </a>

            <button
              onClick={() => navigateTo('/services')}
              className="px-6 py-3 rounded-lg border border-[#D4AF37]/50 text-xs sm:text-sm font-semibold text-[#F4D675] hover:bg-[#D4AF37]/10 active:scale-95 transition-all"
            >
              {t.hero.exploreServices}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
