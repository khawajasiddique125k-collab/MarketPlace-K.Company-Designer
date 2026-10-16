import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Service,
  CartItem,
  Order,
  OrderStatus,
  PaymentStatus,
  Coupon,
  Review,
  PortfolioItem,
  CustomerUser,
} from '../types';
import { INITIAL_SERVICES } from '../data/servicesData';
import { INITIAL_PORTFOLIO } from '../data/portfolioData';
import { translations } from '../data/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  currentRoute: string;
  navigateTo: (route: string, state?: any) => void;
  routeParams: Record<string, string>;
  // Services
  services: Service[];
  updateServicePrice: (id: string, newPrice: number) => void;
  toggleServiceActive: (id: string) => void;
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  // Cart
  cart: CartItem[];
  addToCart: (service: Service, quantity?: number) => void;
  removeFromCart: (serviceId: string) => void;
  updateCartQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  total: number;
  hasQuotationItems: boolean;
  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  updateCoupon: (code: string, updates: Partial<Coupon>) => void;
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'orderStatus' | 'paymentStatus'>) => Order;
  updateOrderStatus: (
    orderId: string,
    orderStatus: OrderStatus,
    paymentStatus?: PaymentStatus,
    notes?: string,
    deliverableUrl?: string
  ) => void;
  submitRevisionRequest: (orderId: string, notes: string) => boolean;
  submitPaymentDetails: (
    orderId: string,
    transactionId: string,
    amount: number,
    screenshot?: string
  ) => boolean;
  getOrderById: (id: string) => Order | undefined;
  // Portfolio
  portfolio: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  deletePortfolioItem: (id: string) => void;
  // Reviews
  reviews: Review[];
  submitReview: (review: Omit<Review, 'id' | 'date' | 'isApproved'>) => void;
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;
  // Auth
  customer: CustomerUser | null;
  customerLogin: (emailOrPhone: string, name?: string) => void;
  customerRegister: (name: string, email: string, whatsapp: string) => void;
  customerLogout: () => void;
  isAdmin: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  // Notification toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'KCD125',
    discountType: 'percentage',
    discountValue: 0,
    minOrderAmount: 0,
    isActive: false, // Per prompt: Inactive until administrator configures discount
    description: 'Special official promotional coupon code for K.Company & Designer customers.',
  },
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Muhammad Rizwan',
    serviceName: 'Business Logo',
    rating: 5,
    comment: 'Khawaja Siddiqui did exceptional work on our company logo. Delivered within 24 hours on WhatsApp with transparent PNG and vector files. Highly recommended!',
    date: '2026-09-14',
    isApproved: true,
  },
  {
    id: 'rev-2',
    customerName: 'Ayesha Tariq',
    serviceName: 'YouTube Starter (2 Thumbnails + 1 Cover)',
    rating: 5,
    comment: 'Very professional YouTube artwork. The colors and typography really stand out on mobile screens. JazzCash payment was seamless.',
    date: '2026-09-28',
    isApproved: true,
  },
  {
    id: 'rev-3',
    customerName: 'Usman Ali',
    serviceName: 'Wedding Card',
    rating: 5,
    comment: 'SubhanAllah, the digital wedding card with gold Islamic geometry was loved by all our relatives. Fast and courteous service.',
    date: '2026-10-05',
    isApproved: true,
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'KCD-2026-1001',
    createdAt: '2026-10-12T14:30:00Z',
    customerName: 'Hamza Farooq',
    whatsapp: '03001234567',
    email: 'hamza@example.com',
    items: [
      {
        serviceId: 'logo-business',
        serviceName: 'Business Logo',
        serviceNameUr: 'بزنس لوگو',
        unitPrice: 500,
        quantity: 1,
        priceDisplay: 'Rs. 500',
      },
      {
        serviceId: 'social-fb-cover',
        serviceName: 'Facebook Cover',
        serviceNameUr: 'فیس بک کور',
        unitPrice: 300,
        quantity: 1,
        priceDisplay: 'Rs. 300',
      },
    ],
    subtotal: 800,
    discount: 0,
    total: 800,
    hasQuotationItems: false,
    designRequirements: 'Brand name is "Farooq Logistics". Preferred colors dark blue and gold. Need modern minimalist logo and matching Facebook banner.',
    paymentStatus: 'Payment Verified',
    orderStatus: 'Designing',
    jazzCashTransactionId: 'JC981023419',
    amountPaid: 800,
    paymentSubmittedAt: '2026-10-12T14:45:00Z',
    adminNotes: 'JazzCash payment confirmed by owner. Initial sketches sent to customer.',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('kcd_lang') as Language) || 'en';
  });

  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [routeParams, setRouteParams] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kcd_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
  }, [language]);

  // Handle browser back/forward and routing
  const navigateTo = (route: string, params?: Record<string, string>) => {
    if (params) setRouteParams(params);
    setCurrentRoute(route);
    window.history.pushState(params || {}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Services State
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('kcd_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const updateServicePrice = (id: string, newPrice: number) => {
    setServices((prev) => {
      const updated = prev.map((s) =>
        s.id === id ? { ...s, price: newPrice, priceDisplay: `Rs. ${newPrice.toLocaleString()}` } : s
      );
      localStorage.setItem('kcd_services', JSON.stringify(updated));
      return updated;
    });
    showToast('Service price updated successfully.');
  };

  const toggleServiceActive = (id: string) => {
    setServices((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s));
      localStorage.setItem('kcd_services', JSON.stringify(updated));
      return updated;
    });
    showToast('Service status toggled.');
  };

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('kcd_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('kcd_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (service: Service, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.serviceId === service.id);
      if (existing) {
        return prev.map((item) =>
          item.serviceId === service.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { serviceId: service.id, service, quantity }];
    });
    showToast(language === 'ur' ? 'سروس کارٹ میں شامل کر دی گئی ہے۔' : 'Service added to cart.');
  };

  const removeFromCart = (serviceId: string) => {
    setCart((prev) => prev.filter((item) => item.serviceId !== serviceId));
    showToast(language === 'ur' ? 'آئٹم کارٹ سے ہٹا دی گئی۔' : 'Item removed from cart.');
  };

  const updateCartQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.serviceId === serviceId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    showToast(language === 'ur' ? 'کارٹ خالی کر دیا گیا ہے۔' : 'Cart cleared.');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => {
    return sum + item.service.price * item.quantity;
  }, 0);

  const hasQuotationItems = cart.some((item) => item.service.requiresQuote);

  // Coupons State
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('kcd_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('kcd_applied_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code.toUpperCase() === trimmed);

    if (!coupon) {
      return {
        success: false,
        message: language === 'ur' ? 'غلط کوپن کوڈ ہے۔' : 'Invalid coupon code.',
      };
    }

    if (!coupon.isActive || coupon.discountValue <= 0) {
      return {
        success: false,
        message:
          language === 'ur'
            ? `کوپن ${coupon.code} ابھی غیر فعال ہے اور ایڈمن کی ترتیب کا منتظر ہے۔`
            : `Coupon ${coupon.code} is currently inactive or awaiting administrator configuration.`,
      };
    }

    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
      return {
        success: false,
        message:
          language === 'ur'
            ? `اس کوپن کے لیے کم از کم آرڈر کی رقم Rs. ${coupon.minOrderAmount} ہونی چاہیے۔`
            : `Minimum order amount for this coupon is Rs. ${coupon.minOrderAmount}.`,
      };
    }

    setAppliedCoupon(coupon);
    localStorage.setItem('kcd_applied_coupon', JSON.stringify(coupon));
    showToast(language === 'ur' ? 'کوپن کامیابی سے لاگو ہو گیا!' : 'Coupon applied successfully!');
    return {
      success: true,
      message: language === 'ur' ? 'کوپن لاگو ہو گیا!' : 'Coupon applied successfully!',
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('kcd_applied_coupon');
    showToast(language === 'ur' ? 'کوپن ہٹا دیا گیا۔' : 'Coupon removed.');
  };

  const updateCoupon = (code: string, updates: Partial<Coupon>) => {
    setCoupons((prev) => {
      const updated = prev.map((c) => (c.code === code ? { ...c, ...updates } : c));
      localStorage.setItem('kcd_coupons', JSON.stringify(updated));
      return updated;
    });
    showToast('Coupon settings updated.');
  };

  let discount = 0;
  if (appliedCoupon && appliedCoupon.isActive) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    } else {
      discount = Math.min(appliedCoupon.discountValue, subtotal);
    }
  }

  const total = Math.max(0, subtotal - discount);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('kcd_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('kcd_orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'orderStatus' | 'paymentStatus'>) => {
    // Generate safe unique format KCD-2026-XXXX
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `KCD-2026-${randomNum}`;

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: new Date().toISOString(),
      orderStatus: 'Order Received',
      paymentStatus: 'Payment Pending',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    orderStatus: OrderStatus,
    paymentStatus?: PaymentStatus,
    notes?: string,
    deliverableUrl?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            orderStatus,
            paymentStatus: paymentStatus || o.paymentStatus,
            adminNotes: notes !== undefined ? notes : o.adminNotes,
            deliverableFileUrl: deliverableUrl !== undefined ? deliverableUrl : o.deliverableFileUrl,
          };
        }
        return o;
      })
    );
    showToast(`Order ${orderId} updated.`);
  };

  const submitRevisionRequest = (orderId: string, notes: string): boolean => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;

    const revisionId = `REV-${Date.now().toString().slice(-4)}`;
    const newRevision = {
      id: revisionId,
      requestedAt: new Date().toISOString(),
      notes,
      status: 'Pending' as const,
    };

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              orderStatus: 'Revision',
              revisionRequests: [...(o.revisionRequests || []), newRevision],
            }
          : o
      )
    );
    showToast('Revision request submitted to designer.');
    return true;
  };

  const submitPaymentDetails = (
    orderId: string,
    transactionId: string,
    amount: number,
    screenshot?: string
  ): boolean => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              jazzCashTransactionId: transactionId,
              amountPaid: amount,
              paymentScreenshot: screenshot || o.paymentScreenshot,
              paymentStatus: 'Payment Submitted',
              paymentSubmittedAt: new Date().toISOString(),
            }
          : o
      )
    );
    showToast('Payment details submitted for manual admin verification.');
    return true;
  };

  const getOrderById = (id: string) => {
    const cleanId = id.trim().toUpperCase();
    return orders.find((o) => o.id.toUpperCase() === cleanId);
  };

  // Portfolio State
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('kcd_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: `port-${Date.now()}`,
    };
    setPortfolio((prev) => {
      const updated = [newItem, ...prev];
      localStorage.setItem('kcd_portfolio', JSON.stringify(updated));
      return updated;
    });
    showToast('Portfolio item added.');
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolio((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem('kcd_portfolio', JSON.stringify(updated));
      return updated;
    });
    showToast('Portfolio item deleted.');
  };

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('kcd_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const submitReview = (rev: Omit<Review, 'id' | 'date' | 'isApproved'>) => {
    const newRev: Review = {
      ...rev,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isApproved: false, // Per prompt: Subject to admin moderation
    };
    setReviews((prev) => {
      const updated = [newRev, ...prev];
      localStorage.setItem('kcd_reviews', JSON.stringify(updated));
      return updated;
    });
    showToast(
      language === 'ur'
        ? 'شکریہ! آپ کا ریویو ایڈمن کی منظوری کے بعد شائع کیا جائے گا۔'
        : 'Thank you! Your review has been submitted for moderation.'
    );
  };

  const approveReview = (id: string) => {
    setReviews((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, isApproved: true } : r));
      localStorage.setItem('kcd_reviews', JSON.stringify(updated));
      return updated;
    });
    showToast('Review approved and published.');
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      localStorage.setItem('kcd_reviews', JSON.stringify(updated));
      return updated;
    });
    showToast('Review removed.');
  };

  // Auth State
  const [customer, setCustomer] = useState<CustomerUser | null>(() => {
    const saved = localStorage.getItem('kcd_customer');
    return saved ? JSON.parse(saved) : null;
  });

  const customerLogin = (emailOrPhone: string, name = 'Valued Customer') => {
    const user: CustomerUser = {
      id: `cust-${Date.now()}`,
      name,
      email: emailOrPhone.includes('@') ? emailOrPhone : 'customer@kcompany.com',
      whatsapp: emailOrPhone.startsWith('03') ? emailOrPhone : '03440000000',
      createdAt: new Date().toISOString(),
    };
    setCustomer(user);
    localStorage.setItem('kcd_customer', JSON.stringify(user));
    showToast(`Welcome back, ${user.name}!`);
  };

  const customerRegister = (name: string, email: string, whatsapp: string) => {
    const user: CustomerUser = {
      id: `cust-${Date.now()}`,
      name,
      email,
      whatsapp,
      createdAt: new Date().toISOString(),
    };
    setCustomer(user);
    localStorage.setItem('kcd_customer', JSON.stringify(user));
    showToast(`Account created for ${user.name}!`);
  };

  const customerLogout = () => {
    setCustomer(null);
    localStorage.removeItem('kcd_customer');
    showToast('Logged out of customer account.');
  };

  // Admin Auth State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('kcd_admin_auth') === 'true';
  });

  const adminLogin = (password: string): boolean => {
    // Official admin access passkey for owner Khawaja Siddiqui
    if (password === 'admin125' || password === 'kcd2026') {
      setIsAdmin(true);
      sessionStorage.setItem('kcd_admin_auth', 'true');
      showToast('Admin authenticated successfully.');
      return true;
    }
    showToast('Invalid admin credentials.');
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('kcd_admin_auth');
    showToast('Admin logged out.');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        currentRoute,
        navigateTo,
        routeParams,
        services,
        updateServicePrice,
        toggleServiceActive,
        selectedService,
        setSelectedService,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount,
        total,
        hasQuotationItems,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        updateCoupon,
        orders,
        createOrder,
        updateOrderStatus,
        submitRevisionRequest,
        submitPaymentDetails,
        getOrderById,
        portfolio,
        addPortfolioItem,
        deletePortfolioItem,
        reviews,
        submitReview,
        approveReview,
        deleteReview,
        customer,
        customerLogin,
        customerRegister,
        customerLogout,
        isAdmin,
        adminLogin,
        adminLogout,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
