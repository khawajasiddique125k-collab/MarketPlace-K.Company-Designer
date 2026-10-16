export type Language = 'en' | 'ur';

export type PricingType = 'fixed' | 'per_unit' | 'starting';

export interface Service {
  id: string;
  name: string;
  nameUr: string;
  category: string;
  categoryUr: string;
  price: number;
  priceDisplay: string;
  pricingType: PricingType;
  unitLabel?: string;
  requiresQuote?: boolean;
  description: string;
  descriptionUr: string;
  deliverables?: string[];
  featured?: boolean;
  isActive: boolean;
}

export interface CartItem {
  serviceId: string;
  service: Service;
  quantity: number; // e.g. number of slides or photos or standard items
  unitNote?: string;
}

export type OrderStatus =
  | 'Order Received'
  | 'Payment Pending'
  | 'Payment Verified'
  | 'Designing'
  | 'Revision'
  | 'Completed'
  | 'Delivered'
  | 'Cancelled';

export type PaymentStatus =
  | 'Payment Pending'
  | 'Payment Submitted'
  | 'Payment Verified'
  | 'Payment Rejected';

export interface OrderItem {
  serviceId: string;
  serviceName: string;
  serviceNameUr: string;
  unitPrice: number;
  quantity: number;
  priceDisplay: string;
  requiresQuote?: boolean;
}

export interface Order {
  id: string; // e.g. KCD-2026-4819
  createdAt: string;
  customerName: string;
  whatsapp: string;
  email?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  hasQuotationItems: boolean;
  designRequirements: string;
  referenceFiles?: string[]; // file names or data URLs
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  jazzCashTransactionId?: string;
  amountPaid?: number;
  paymentScreenshot?: string; // data URL or mock file url
  paymentSubmittedAt?: string;
  adminNotes?: string;
  deliverableFileUrl?: string;
  revisionRequests?: {
    id: string;
    requestedAt: string;
    notes: string;
    status: 'Pending' | 'In Progress' | 'Resolved';
  }[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  isActive: boolean;
  description: string;
}

export interface Review {
  id: string;
  customerName: string;
  serviceName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  isApproved: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  titleUr: string;
  category: string;
  categoryUr: string;
  description: string;
  imageUrl: string;
  associatedServiceId?: string;
  featured?: boolean;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  createdAt: string;
}
