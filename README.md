# K.Company & Designer — Digital Graphic Design Services

A complete, production-grade, responsive web platform for **K.Company & Designer**, owned by **Khawaja Khaisama Mahmood Siddiqui** in Multan, Pakistan.

---

## 1. Business Credentials & Contacts (Strict Official Records)

- **Official Business Name:** K.Company & Designer
- **Owner / CEO:** Khawaja Khaisama Mahmood Siddiqui
- **Tagline:** Your Vision, Our Designs
- **Supporting Headline:** From Simple Ideas to Stunning Designs
- **WhatsApp / Order Hotline:** 0344 6302721 (`https://wa.me/923446302721`)
- **Official Email:** `khawajasiddique125k@gmail.com`
- **Official Address:** جامعہ تعلیم و تزکیہ قرآن محل، بیرون پاک گیٹ، ملتان، پاکستان
- **JazzCash Payment Number:** `0321 6257021`
- **JazzCash Account Title:** `Tuba Mehmood`
- **Social Media:**
  - TikTok: `@khaisama.siddiqui`
  - Instagram: `@khaisama6811125k`
  - YouTube: `K.Company & Designer`
  - Blog: `https://designtechguide6811.blogspot.com/`

---

## 2. Key Features

1. **Complete 117-Service Catalog**: All 11 categories from the original rate list with exact Pakistani Rupee (`Rs.`) rates, unit pricing (`/ slide`, `/ photo`), and starting price (`+`) indicators.
2. **Bilingual Support (English & اردو)**: Seamless one-click language toggle with true RTL layout and Noto Nastaliq / Noto Sans Arabic typography.
3. **Cart & Precise Calculations**: Dynamic subtotal, per-unit quantity calculation, quotation notice, and coupon discount calculation.
4. **JazzCash Manual Reporting Workflow**: Transparent instructions for transferring to `0321 6257021` (Tuba Mehmood), transaction ID submission, and screenshot upload. Payments remain *Pending* until manually verified.
5. **Real-time Order Tracking**: Lookup orders by unique ID (e.g., `KCD-2026-XXXX`), check design progress, submit revision requests (3 free revisions), and download finished design files.
6. **Administrator Management Suite**: Password-protected private portal (`admin125` / `kcd2026`) for owner to verify payments, update service rates, toggle active items, upload deliverables, moderate reviews, and configure coupon code `KCD125`.

---

## 3. Local Development & Setup

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

---

## 4. Hostinger & Free Hosting Deployment Guide

### Option A: Static Deployment (Hostinger / Netlify / Vercel / Cloudflare Pages) — 100% Free
1. Run `npm run build`.
2. The generated output files will be in the `/dist` directory.
3. In your **Hostinger hPanel**:
   - Navigate to **File Manager** -> `public_html`.
   - Upload the contents of `/dist`.
   - Add the following `.htaccess` inside `public_html` to handle client-side SPA routing:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Option B: Full-Stack Express Server (Node.js VPS or Cloud Run)
- Start command: `node server.ts` or `tsx server.ts`
- Environment variables:
  - `PORT=3000`
  - `APP_URL=https://your-domain.com`

---

## 5. How to Manage the Website

### A. Access Admin Dashboard
1. Click the shield icon in the top header or visit `/admin`.
2. Enter the passkey: `admin125` (or `kcd2026`).
3. You now have full access to:
   - **Orders:** Verify/reject JazzCash transfers, review payment screenshots, change status to Designing/Revision/Delivered, and paste deliverable download links.
   - **Services & Rates:** Change the price of any service or temporarily disable a service.
   - **Coupons:** Configure discount type (% or Rs.), discount value, minimum order amount, and activate code `KCD125`.
   - **Reviews:** Approve genuine client feedback before it displays on the homepage.
   - **Portfolio:** Add new high-resolution sample artworks.

### B. Testing the Order & JazzCash Flow
1. Go to `/services` and click **Add to Cart** or **Order Now** on any service.
2. In the Cart, test updating quantities or enter coupon `KCD125`.
3. Proceed to Checkout:
   - Enter your name, WhatsApp number, and design requirements.
   - Transfer payment manually to JazzCash: `0321 6257021` (`Tuba Mehmood`).
   - Enter the TID / Reference number and upload a payment screenshot.
   - Check the agreement box and click **Submit Order**.
4. You receive your unique Order ID (`KCD-2026-XXXX`) with a 1-click button to confirm on WhatsApp (`https://wa.me/923446302721`).
5. Open `/admin` to verify the payment and see the status change immediately in `/track-order`.

---

## 6. Security & Privacy
- No banking passwords, PINs, or sensitive credentials are ever collected or stored.
- Admin portal access is guarded by secure session authentication.
- All customer files and screenshots are uploaded securely through standard browser file readers.
