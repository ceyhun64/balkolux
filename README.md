# 🌞 BalkoLüx — Garden & Balcony Outdoor Furniture E-Commerce Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0.10-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.19.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern full-stack e-commerce platform for premium garden, terrace, and balcony furniture**

[Features](#-features) • [Tech Stack](#️-technology-stack) • [Installation](#-installation) • [API](#-api-endpoints) • [Database](#️-database-schema) • [Deployment](#-deployment)

</div>

---

## 📋 About the Project

**BalkoLüx** is a feature-complete e-commerce platform specializing in premium outdoor furniture for gardens, terraces, and balconies — from weather-resistant seating sets and dining table sets to sun loungers, garden swings, barbecue units, and patio umbrellas. The platform presents detailed product catalogs with high-resolution imagery, material specifications (aluminium/wooden frames, all-weather fabrics), and ergonomic dimension data, giving customers everything they need to furnish their outdoor living spaces.

The platform handles the full shopping lifecycle: product discovery with category filtering, coupon code discounts, multi-step checkout with iyzico payment processing, Horoz Kargo shipment tracking, and a comprehensive admin management panel — all built on a Next.js App Router application backed by MySQL via Prisma.

---

## ✨ Features

### 🛍️ Customer Features

- **Product Catalog** — Browse by 6 categories: Seating Sets, Table Sets, Sunbeds, Swings, Barbecue, and Umbrellas
- **Product Detail Pages** — Multi-image galleries with zoom (`react-medium-image-zoom`), material specs, product tabs (description + reviews), and related product recommendations
- **Advanced Search** — Full-text product search with instant results
- **Filter & Sort** — Category filters, price range, and mobile-friendly filter drawer
- **Shopping Cart** — Persistent cart with quantity management, variant tracking, and real-time totals (migration `20260102_cart_item`)
- **Wishlist / Favorites** — Save products for later
- **Coupon Codes** — Apply discount coupons at checkout with real-time validation via `/api/coupon/validate`
- **Multi-Step Checkout** — Address selection → Payment, guided by a stepper component
- **Secure Payment** — iyzico payment gateway with installment options for Turkish bank cards
- **Order Tracking** — Real-time cargo tracking via Horoz Kargo integration in user profile (`/profile/cargo_tracking`)
- **User Profile** — Manage personal info, saved addresses (with district/neighborhood auto-fill), and full order history
- **Password Recovery** — Forgot password + reset-password email flow via Nodemailer
- **Newsletter Subscription** — Email signup for campaigns and new arrivals
- **Cookie Consent** — GDPR/KVKK-compliant cookie banner (`cookieConsent.tsx`)
- **Blog** — Outdoor living tips, product guides, and interior inspiration articles
- **FAQ Page** — Common questions about delivery, payment, returns
- **Institutional Pages** — About, why us, cookie policy
- **Legal Pages** — KVKK, distance sale agreement, personal data policy, payment options
- **Contact Page** — Direct inquiry form with Nodemailer delivery
- **Responsive Design** — Mobile-first layout with mobile navigation sheet
- **Social Sidebar** — Persistent quick-access links (WhatsApp, Instagram, Facebook, phone)
- **Customer Testimonials** — Homepage testimonials section

### 🔧 Admin Features

- **Admin Dashboard** — Sales analytics with Recharts graphs, order volume, and revenue overview
- **Product Management** — Add, edit, and delete products with image upload, category assignment, and stock management
- **Order Management** — Full order list with detail dialog and status updates
- **User Management** — List all users, view roles, and manage accounts
- **Blog Management** — Create (add), edit (update), and delete blog posts with Cloudinary image upload
- **Banner Management** — Create and manage homepage promotional banners
- **Coupon Management** — Create, list, and deactivate discount coupons
- **Subscriber Management** — View and manage newsletter subscribers
- **Protected Routes** — Admin panel locked behind session authentication

### ⚙️ Technical Features

- **Next.js App Router** — SSR, SSG, ISR, and API routes in a single unified framework
- **TypeScript 5** — Full type safety across frontend and backend
- **Prisma ORM + MySQL** — Type-safe relational data access with a full migration history
- **NextAuth.js** — Email/password authentication with session management
- **Horoz Kargo Integration** — Real-time cargo tracking from the profile page (`lib/cargo-utils.ts`, `types/horoz-cargo.ts`)
- **Coupon System** — Coupon creation, validation, and application at checkout
- **Location API** — Dynamic district (`ilçe`) and neighborhood (`mahalle`) lookup from `city.json`
- **Cloudinary + next-cloudinary** — Optimized image upload and CDN delivery
- **Framer Motion** — Smooth page transitions and UI animations
- **SEO** — Open Graph meta tags and `og-image.png`

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Description |
|-----------|---------|-------------|
| Next.js | 16.0.10 | App Router, SSR/SSG, API Routes |
| React | 19.2.0 | Component-based UI |
| TypeScript | 5 | Type-safe development |
| Tailwind CSS | 4 | Utility-first styling |
| Radix UI | 1.x | Accessible UI primitives (20+ components) |
| Framer Motion | 12.23.24 | Animations and transitions |
| Lucide React | 0.553.0 | Icon library |
| Embla Carousel | 8.6.0 | Product image carousel |
| react-medium-image-zoom | 5.4.0 | Product image zoom on detail pages |
| React Hook Form | 7.66.0 | Form state management |
| Zod | 4.1.12 | Schema validation |
| Recharts | 2.15.4 | Admin analytics charts |
| Sonner | 2.0.7 | Toast notifications |
| date-fns | 4.1.0 | Date formatting |
| next-themes | 0.4.6 | Theme management |

### Backend & Database

| Technology | Version | Description |
|-----------|---------|-------------|
| Prisma | 6.19.0 | ORM & database migrations |
| MySQL | 8.0 | Relational database |
| mysql2 | 3.15.3 | MySQL Node.js driver |
| NextAuth.js | 4.24.13 | Authentication & session management |
| bcrypt | 6.0.0 | Password hashing |
| Nodemailer | 7.0.10 | Transactional email (contact, password reset) |
| Cloudinary | 2.8.0 | Image upload & CDN |
| next-cloudinary | 6.17.5 | Next.js Cloudinary integration |
| iyzipay | 2.0.64 | iyzico payment gateway SDK |

### Logistics & Infrastructure

| Technology | Description |
|-----------|-------------|
| Horoz Kargo | Cargo tracking integration (`lib/cargo-utils.ts`) |
| Vercel | Frontend deployment (recommended) |
| Docker + Nginx | VPS deployment (production) |
| Cloudinary | CDN & image optimization |
| MySQL (cloud) | Managed DB (PlanetScale / Railway / AWS RDS) |

---

## 🏗️ Architecture Overview

```
Browser / Client
       │
       ▼
  Next.js 16 (App Router)
  ┌──────────────────────────────────────────────────┐
  │  Public Pages                                    │
  │  ├── / (Homepage)                                │
  │  ├── /products (All Products)                    │
  │  ├── /products/[id] (Product Detail)             │
  │  ├── /products/[category] (Category Listings)    │
  │  │   seating_sets, table_sets, sunbed,           │
  │  │   swing, barbecue, umbrella                   │
  │  ├── /cart, /checkout, /favorites                │
  │  ├── /blog & /blog/[id]                          │
  │  ├── /search, /faq, /contact                     │
  │  ├── /profile (orders, addresses, cargo_tracking)│
  │  ├── /institutional/* (about, why_us,            │
  │  │                     cookie_policy)            │
  │  └── /contracts/* (kvkk, distance_sale,          │
  │                    personal_data, payment_options)│
  │                                                  │
  │  Auth Pages                                      │
  │  ├── /login, /register                           │
  │  └── /forgot-password, /reset-password           │
  │                                                  │
  │  Admin Pages (/admin/*)                          │
  │  ├── dashboard, products, orders                 │
  │  ├── blogs, banner, coupon                       │
  │  └── users, subscribers                          │
  │                                                  │
  │  API Routes (/api/*)                             │
  │  ├── auth, account, products, cart               │
  │  ├── order, payment, review, favorites           │
  │  ├── blog, banner, coupon, subscribe             │
  │  ├── address, upload, send-mail, user            │
  │  ├── cargo-tracking, location                    │
  └──────────────────────────────────────────────────┘
         │                      │
         ▼                      ▼
       MySQL               Cloudinary
    (via Prisma)            (Images/CDN)
         │
      iyzico          Nodemailer       Horoz Kargo
    (Payments)    (Email: contact    (Cargo tracking)
                   + reset)
```

---

## 📁 Project Structure

```
BalkoLüx/
├── app/
│   ├── page.tsx                              # Homepage
│   ├── layout.tsx                            # Root layout
│   ├── not-found.tsx                         # 404 page
│   ├── globals.css
│   │
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── forgot-password/page.tsx
│   ├── reset-password/page.tsx
│   ├── contact/page.tsx
│   ├── faq/page.tsx
│   ├── search/page.tsx
│   ├── cart/page.tsx
│   ├── favorites/page.tsx
│   ├── blog/
│   │   ├── page.tsx                          # Blog listing
│   │   └── [id]/page.tsx                     # Blog detail
│   │
│   ├── products/
│   │   ├── page.tsx                          # All products
│   │   ├── [id]/page.tsx                     # Product detail
│   │   ├── seating_sets/page.tsx             # Seating sets category
│   │   ├── table_sets/page.tsx               # Table sets category
│   │   ├── sunbed/page.tsx                   # Sun loungers category
│   │   ├── swing/page.tsx                    # Garden swings category
│   │   ├── barbecue/page.tsx                 # Barbecue units category
│   │   └── umbrella/page.tsx                 # Patio umbrellas category
│   │
│   ├── checkout/
│   │   ├── page.tsx                          # Multi-step checkout
│   │   ├── success/page.tsx                  # Payment success
│   │   └── unsuccess/page.tsx                # Payment failure
│   │
│   ├── profile/
│   │   ├── page.tsx                          # Profile overview
│   │   ├── orders/page.tsx                   # Order history
│   │   ├── addresses/page.tsx                # Saved addresses
│   │   └── cargo_tracking/page.tsx           # Horoz Kargo tracking
│   │
│   ├── institutional/
│   │   ├── about/page.tsx
│   │   ├── why_us/page.tsx
│   │   └── cookie_policy/page.tsx
│   │
│   ├── contracts/
│   │   ├── kvkk/page.tsx
│   │   ├── distance_sale/page.tsx
│   │   ├── personal_data/page.tsx
│   │   └── payment_options/page.tsx
│   │
│   ├── admin/
│   │   ├── page.tsx                          # Admin login
│   │   ├── dashboard/page.tsx                # Analytics dashboard
│   │   ├── products/page.tsx                 # Product management
│   │   ├── orders/page.tsx                   # Order management
│   │   ├── blogs/page.tsx                    # Blog management
│   │   ├── banner/page.tsx                   # Banner management
│   │   ├── coupon/page.tsx                   # Coupon management
│   │   ├── users/page.tsx                    # User management
│   │   └── subscribers/page.tsx              # Subscriber management
│   │
│   └── api/
│       ├── auth/[...nextauth]/               # NextAuth handler
│       ├── auth/logout/                      # Session destroy
│       ├── account/check/                   # Email existence check
│       ├── account/register/                # User registration
│       ├── account/forgot_password/         # Send reset email
│       ├── account/reset_password/          # Apply password reset
│       ├── products/                         # Product CRUD + listing
│       ├── products/[id]/                    # Single product
│       ├── products/category/[categoryId]/  # Filter by category
│       ├── cart/                             # Cart management
│       ├── cart/[id]/                        # Cart item operations
│       ├── order/                            # Order creation
│       ├── order/user/                       # User order list
│       ├── payment/                          # iyzico payment
│       ├── review/                           # Product reviews
│       ├── review/[id]/
│       ├── favorites/                        # Wishlist
│       ├── favorites/[id]/
│       ├── coupon/                           # Coupon list (Admin)
│       ├── coupon/validate/                  # Validate coupon code
│       ├── blog/                             # Blog CRUD
│       ├── blog/[id]/
│       ├── banner/                           # Banner management
│       ├── banner/[id]/
│       ├── address/                          # User addresses
│       ├── address/[id]/
│       ├── user/                             # Current user profile
│       ├── user/all/                         # Admin user list
│       ├── user/all/[id]/
│       ├── subscribe/                        # Newsletter subscriptions
│       ├── subscribe/[id]/
│       ├── upload/                           # Cloudinary upload
│       ├── send-mail/                        # Contact form email
│       ├── cargo-tracking/                   # Horoz Kargo status lookup
│       └── location/
│           ├── ilceler/[ilId]/               # Districts by province
│           └── mahalleler/[ilceId]/          # Neighborhoods by district
│
├── components/
│   ├── layout/
│   │   ├── ClientLayoutWrapper.tsx           # Client boundary wrapper
│   │   ├── navbar.tsx                        # Navigation bar
│   │   ├── footer.tsx                        # Site footer
│   │   ├── cartDropdown.tsx                  # Navbar cart dropdown
│   │   ├── cartItem.tsx                      # Cart item in dropdown
│   │   ├── collectionMegaMenu.tsx            # Category mega menu
│   │   ├── userMegaMenu.tsx                  # User account mega menu
│   │   ├── pagination.tsx                    # Shared pagination
│   │   ├── scrollToTop.tsx                   # Scroll-to-top button
│   │   ├── socialSidebar.tsx                 # Social media quick links
│   │   ├── cookieConsent.tsx                 # GDPR/KVKK cookie banner
│   │   ├── testimonial.tsx                   # Customer testimonials
│   │   ├── contact.tsx                       # Contact section component
│   │   └── faq.tsx                           # FAQ section component
│   │
│   ├── modules/
│   │   ├── admin/
│   │   │   ├── login/login.tsx
│   │   │   ├── sideBar.tsx
│   │   │   ├── dashboard/dashboard.tsx
│   │   │   ├── products/                     # Product table + dialog
│   │   │   │   ├── products.tsx
│   │   │   │   ├── productTable.tsx
│   │   │   │   └── productDialog.tsx
│   │   │   ├── orders/                       # Orders table + detail dialog
│   │   │   │   ├── orders.tsx
│   │   │   │   └── orderDetailDialog.tsx
│   │   │   ├── blogs/                        # Blog list, add, update
│   │   │   │   ├── blogs.tsx
│   │   │   │   ├── addBlog.tsx
│   │   │   │   └── updateBlog.tsx
│   │   │   ├── banner/banner.tsx
│   │   │   ├── coupon/coupon.tsx             # Coupon management panel
│   │   │   ├── users/users.tsx
│   │   │   └── subscribers/subscribers.tsx
│   │   ├── auth/
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   ├── forgot-password.tsx
│   │   │   └── reset-password.tsx
│   │   ├── blog/
│   │   │   ├── blog.tsx
│   │   │   └── blogDetail.tsx
│   │   ├── cart/
│   │   │   ├── cart.tsx
│   │   │   ├── cartItem.tsx
│   │   │   └── cartSummary.tsx
│   │   ├── checkout/
│   │   │   ├── checkout.tsx                  # Stepper controller
│   │   │   ├── paymentStepper.tsx            # Step progress indicator
│   │   │   ├── stepAddress.tsx               # Address step
│   │   │   ├── stepPayment.tsx               # iyzico payment step
│   │   │   ├── cartSummary.tsx               # Order summary sidebar
│   │   │   ├── success.tsx
│   │   │   └── unsuccess.tsx
│   │   ├── contracts/
│   │   │   ├── kvkk.tsx
│   │   │   ├── distanceSale.tsx
│   │   │   ├── personalData.tsx
│   │   │   └── paymentOptions.tsx
│   │   ├── favorites/
│   │   │   ├── favorites.tsx
│   │   │   └── productCard.tsx
│   │   ├── home/
│   │   │   ├── carousel.tsx                  # Hero image carousel
│   │   │   ├── banner.tsx                    # Promotional banner
│   │   │   ├── categories.tsx                # Category grid
│   │   │   ├── products.tsx                  # Featured products section
│   │   │   ├── newArrivals.tsx               # New arrivals section
│   │   │   └── services.tsx                  # Services/benefits section
│   │   ├── institutional/
│   │   │   ├── about.tsx
│   │   │   ├── why_us.tsx
│   │   │   └── security_cookie.tsx           # Cookie policy content
│   │   ├── products/
│   │   │   ├── allProducts.tsx               # All products listing
│   │   │   ├── productCard.tsx               # Product card component
│   │   │   ├── productDetail.tsx             # Full product detail
│   │   │   ├── productDetailSkeleton.tsx     # Loading skeleton
│   │   │   ├── productSkeleton.tsx
│   │   │   ├── productTopbar.tsx             # Sort & view controls
│   │   │   ├── productTabs.tsx               # Description + review tabs
│   │   │   ├── filter.tsx                    # Desktop filter panel
│   │   │   ├── mobileFilter.tsx              # Mobile filter drawer
│   │   │   ├── imageZoom.tsx                 # Product image zoom
│   │   │   ├── recommended.tsx               # Related products
│   │   │   ├── category/                     # Per-category listing components
│   │   │   │   ├── seating_sets.tsx
│   │   │   │   ├── table_sets.tsx
│   │   │   │   ├── sunbed.tsx
│   │   │   │   ├── swing.tsx
│   │   │   │   ├── barbecue.tsx
│   │   │   │   └── umbrella.tsx
│   │   │   └── subCategory/
│   │   │       └── laserCut.tsx              # Sub-category component
│   │   ├── profile/
│   │   │   ├── sideBar.tsx
│   │   │   ├── myPersonalInformation.tsx
│   │   │   ├── orders.tsx
│   │   │   ├── addresses.tsx
│   │   │   ├── addressForm.tsx
│   │   │   └── cargoTracking.tsx             # Horoz Kargo tracking UI
│   │   └── search/search.tsx
│   │
│   └── ui/                                   # 45+ Radix-based UI primitives
│       └── shadcn-io/
│           ├── gradient-text/                # Gradient text effect
│           └── image-zoom/                   # Image zoom component
│
├── contexts/
│   ├── cartContext.tsx                        # Global cart state
│   └── favoriteContext.tsx                    # Global favorites state
│
├── lib/
│   ├── auth.ts                               # NextAuth configuration
│   ├── db.ts                                 # Prisma client singleton
│   ├── session.ts                            # Session helpers
│   ├── cargo-utils.ts                        # Horoz Kargo API utilities
│   └── utils.ts                              # General utilities (cn, etc.)
│
├── hooks/
│   └── use-mobile.ts                         # Mobile breakpoint hook
│
├── data/
│   └── products.json                         # Static product reference data
│
├── types/
│   ├── product.ts                            # Product type definitions
│   ├── order.ts                              # Order type definitions
│   ├── horoz-cargo.ts                        # Horoz Kargo API response types
│   ├── next-auth.d.ts                        # NextAuth session augmentation
│   ├── iyzipay.d.ts                          # iyzico SDK types
│   ├── nodemailer.d.ts
│   ├── bcrypt.d.ts
│   └── formidable.d.ts
│
├── utils/
│   └── cart.ts                               # Cart calculation helpers
│
├── prisma/
│   ├── schema.prisma                         # Database schema
│   ├── seed.ts                               # Initial data seed
│   └── migrations/
│       ├── 20251118065807_init/
│       ├── 20251119065034_add_sub_images_and_description/
│       ├── 20251119135918_add_room_to_products/
│       ├── 20251122061547_add_tcno_to_address/
│       ├── 20251122092416_add_tcno_to_addresses/
│       └── 20260102110224_cart_item/         # Cart item schema update
│
└── public/
    ├── categories/          # Category cover images (balcony.avif, garden.avif)
    ├── heroes/              # Hero carousel images (10 AVIF: 1.0–1.4, 2.0–2.4)
    ├── products/            # Product images (22 WebP + 2 JPG)
    ├── about/               # About page images
    ├── why_us/              # Why us section images
    ├── megaMenu/            # Mega menu decorative image
    ├── cards/               # Payment card logos (Axess, Bonus, Maximum,
    │                        #   World, Paraf, BankKart — SVG)
    ├── iyzico/              # iyzico payment branding
    ├── logo/                # Site logos (5 variants: default, bg, black,
    │                        #   icon .ico, icon .webp)
    ├── socialMedia/         # Social icons (WhatsApp, Instagram, Facebook, phone)
    ├── city.json            # Turkish province/district/neighborhood data
    └── og-image.png         # Open Graph image
```

---

## 🗄️ Database Schema

All models are managed with Prisma and stored in MySQL.

### Core Tables

```
User              → Customer accounts (name, email, hashed password, phone, role)

Product           → Product catalog
                    (name, price, description, category, room/space tag,
                     images[], subImages[], stock, featured)
Category          → Product categories
                    (seating_sets, table_sets, sunbed, swing, barbecue, umbrella)

CartItem          → Active cart items
                    (userId, productId, quantity, variant — updated in
                     migration 20260102_cart_item)
Favorite          → User wishlist items (userId, productId)
Review            → Product reviews (rating, comment, userId, productId)

Order             → Customer orders (status, total, cargoCode, timestamps)
OrderItem         → Line items (productId, quantity, price, variant)
OrderAddress      → Delivery address snapshot at order time
                    (name, phone, city, district, neighborhood, address, tcNo)

Address           → Saved user addresses (with tcNo for legal compliance)
Blog              → Blog posts (title, content, image, createdAt)
Banner            → Homepage banners (image, title, link, active)
Coupon            → Discount coupons (code, discountType, value, minOrder,
                     usageLimit, usedCount, expiresAt, active)
Subscribe         → Newsletter subscribers (email, createdAt)
```

### Key Relationships

- `Product` has `subImages[]` field (added in migration `20251119`) for gallery slides
- `CartItem` carries a `variant` field for color/size selection, updated via the `20260102_cart_item` migration
- `OrderAddress` stores `tcNo` (Turkish national ID) required by Turkish Distance Selling Law for legal compliance
- `Address` also stores `tcNo` so it pre-fills automatically during checkout
- `Coupon` tracks `usedCount` vs `usageLimit` and supports both percentage and fixed-amount discount types
- `Order` stores `cargoCode` linking to Horoz Kargo's tracking system

---

## 🚀 Installation

### Prerequisites

- Node.js **18+**
- MySQL **8.0+**
- npm or yarn
- Cloudinary account *(for image uploads)*
- iyzico account *(for payment processing)*

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/balkolux.git
cd balkolux
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/balkolux"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# iyzico Payment Gateway
IYZICO_API_KEY="your-iyzico-api-key"
IYZICO_SECRET_KEY="your-iyzico-secret-key"
IYZICO_BASE_URL="https://sandbox-api.iyzipay.com"   # Switch to production URL for live

# Email (Gmail SMTP)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-gmail-app-password"
EMAIL_FROM="noreply@balkolux.com"

# Horoz Kargo
HOROZ_KARGO_API_URL="https://api.horozkargo.com.tr"
HOROZ_KARGO_USERNAME="your-kargo-username"
HOROZ_KARGO_PASSWORD="your-kargo-password"
```

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords to generate a dedicated SMTP password.

> **iyzico Sandbox:** Use `https://sandbox-api.iyzipay.com` for development. Switch to `https://api.iyzipay.com` for production.

---

### 4. Set Up the Database

```bash
# Generate Prisma client
npx prisma generate

# Apply all migrations
npx prisma migrate dev

# Seed initial data
npm run seed
```

---

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Production Build

```bash
npm run build
npm start
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/[...nextauth]` | NextAuth sign-in handler |
| POST | `/api/auth/logout` | Destroy session and sign out |
| GET | `/api/account/check` | Check if email is registered |
| POST | `/api/account/register` | Register new user |
| POST | `/api/account/forgot_password` | Send password reset email |
| POST | `/api/account/reset_password` | Apply new password with token |

### 📦 Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products (with filters) |
| POST | `/api/products` | Create product (Admin) |
| GET | `/api/products/[id]` | Get product by ID |
| PUT | `/api/products/[id]` | Update product (Admin) |
| DELETE | `/api/products/[id]` | Delete product (Admin) |
| GET | `/api/products/category/[categoryId]` | Products filtered by category |

### 🛒 Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's active cart |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/[id]` | Update cart item quantity/variant |
| DELETE | `/api/cart/[id]` | Remove item from cart |

### 📋 Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/order` | Create new order |
| GET | `/api/order/user` | Get current user's orders |

### 💳 Payment

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payment` | Initiate iyzico payment session |

### 🎟️ Coupons

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/coupon` | List all coupons (Admin) |
| POST | `/api/coupon` | Create new coupon (Admin) |
| POST | `/api/coupon/validate` | Validate coupon code at checkout |

### ❤️ Favorites

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/favorites` | Get user's wishlist |
| POST | `/api/favorites` | Add product to wishlist |
| DELETE | `/api/favorites/[id]` | Remove from wishlist |

### ⭐ Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/review` | List product reviews |
| POST | `/api/review` | Submit a review |
| DELETE | `/api/review/[id]` | Delete review (Admin/Owner) |

### 📝 Blog

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blog` | List all blog posts |
| POST | `/api/blog` | Create blog post (Admin) |
| GET | `/api/blog/[id]` | Get post by ID |
| PUT | `/api/blog/[id]` | Update blog post (Admin) |
| DELETE | `/api/blog/[id]` | Delete blog post (Admin) |

### 🖼️ Banners

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/banner` | List all banners |
| POST | `/api/banner` | Create banner (Admin) |
| PUT | `/api/banner/[id]` | Update banner (Admin) |
| DELETE | `/api/banner/[id]` | Delete banner (Admin) |

### 📍 Addresses & Location

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/address` | Get user's saved addresses |
| POST | `/api/address` | Add new address |
| PUT | `/api/address/[id]` | Update address |
| DELETE | `/api/address/[id]` | Delete address |
| GET | `/api/location/ilceler/[ilId]` | Get districts by province ID |
| GET | `/api/location/mahalleler/[ilceId]` | Get neighborhoods by district ID |

### 📦 Cargo & Utilities

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cargo-tracking` | Query cargo status from Horoz Kargo |
| POST | `/api/subscribe` | Subscribe to newsletter |
| DELETE | `/api/subscribe/[id]` | Delete subscriber (Admin) |
| POST | `/api/send-mail` | Send contact form email |
| POST | `/api/upload` | Upload image to Cloudinary |

### 👤 Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get current user profile |
| PUT | `/api/user` | Update user profile |
| GET | `/api/user/all` | List all users (Admin) |
| PUT | `/api/user/all/[id]` | Update user (Admin) |
| DELETE | `/api/user/all/[id]` | Delete user (Admin) |

---

## 💳 Payment Integration — iyzico

BalkoLüx uses [iyzico](https://iyzico.com) for secure payment processing with Turkish bank card installment support.

### Supported Cards

| Card Program | Bank |
|-------------|------|
| Axess | Akbank |
| Bonus | Garanti BBVA |
| Maximum | İş Bankası |
| World | Yapı Kredi |
| Paraf | Halkbank |
| BankKart Combo | Ziraat Bankası |

Card brand logos are stored in `public/cards/` as SVG files and displayed during checkout.

### Checkout Flow

1. Customer fills cart and navigates to `/checkout`
2. **Step 1 — Address**: Select or add a delivery address (with district/neighborhood auto-fill)
3. **Step 2 — Payment**: Card details entered via iyzico secure form; optionally apply a coupon code
4. iyzico processes payment server-side via `/api/payment`
5. On success → order created in DB → redirect to `/checkout/success`
6. On failure → redirect to `/checkout/unsuccess`

> **Sandbox Testing:** Use `https://sandbox-api.iyzipay.com` with iyzico's [test card numbers](https://dev.iyzipay.com/en/test-cards).

---

## 🎟️ Coupon System

BalkoLüx includes a fully managed discount coupon system for promotions and campaigns.

### How It Works

1. Admin creates a coupon at `/admin/coupon` with a code, discount type (percentage or fixed), value, minimum order amount, usage limit, and expiry date
2. During checkout, customers enter the code — a `POST /api/coupon/validate` call verifies the code is active, not expired, within usage limits, and meets the minimum order requirement
3. On successful validation, the discount is applied to the cart total before payment
4. After successful order creation, `usedCount` is incremented on the coupon record

### Coupon Fields

| Field | Description |
|-------|-------------|
| `code` | Unique coupon string (e.g., `SUMMER25`) |
| `discountType` | `percentage` or `fixed` |
| `value` | Discount amount (e.g., 25 for 25% or ₺50 fixed) |
| `minOrder` | Minimum cart total to apply the coupon |
| `usageLimit` | Maximum number of times the coupon can be used |
| `usedCount` | Current usage count |
| `expiresAt` | Expiry date |
| `active` | Whether the coupon is enabled |

---

## 📦 Cargo Tracking — Horoz Kargo

BalkoLüx integrates directly with [Horoz Kargo](https://www.horozkargo.com.tr) for real-time shipment tracking.

### How It Works

1. When an order is fulfilled, the admin assigns a cargo tracking code (`cargoCode`) to the order
2. The customer navigates to `/profile/cargo_tracking` and views their shipment status
3. The frontend calls `GET /api/cargo-tracking?code={cargoCode}`
4. `lib/cargo-utils.ts` calls the Horoz Kargo API using the credentials from environment variables
5. The response (parsed via `types/horoz-cargo.ts`) is returned to the customer with current shipment status, location, and timestamps

---

## 🔐 Security

- **NextAuth.js** — Session management with encrypted JWT in HttpOnly cookies
- **bcrypt** — Password hashing (salt rounds: 12)
- **Zod** — Schema validation on all API route inputs
- **Role-based access** — Admin routes protected by session role middleware
- **TC Identity Number (tcNo)** — Stored on `Address` and `OrderAddress` for legal compliance with Turkish Distance Selling Law
- **KVKK / Cookie Policy** — Dedicated `/contracts/kvkk`, `/contracts/personal_data`, and `/institutional/cookie_policy` pages
- **Cookie Consent Banner** — `cookieConsent.tsx` manages user consent before any non-essential cookies are set
- **Password reset flow** — Time-limited tokens delivered via Nodemailer, never stored in plaintext
- **Cloudinary signed uploads** — All uploads require server-side signed credentials
- **Environment isolation** — All secrets in `.env.local`, never exposed to the client bundle

---

## 🧪 Development Tools

### Database Management

```bash
# Open Prisma Studio (visual DB editor)
npx prisma studio

# Create a new migration
npx prisma migrate dev --name describe-your-change

# Seed the database
npm run seed

# Reset database (destructive)
npx prisma migrate reset
```

### Build

```bash
npm run dev       # Development server
npm run build     # Production build
npm start         # Start production server
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your repository to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.local` in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js and handles the build

```bash
npx vercel --prod
```

### Docker + Nginx (VPS)

The project is production-ready for VPS deployment with Docker and Nginx as a reverse proxy.

```bash
# Build the image
docker build -t balkolux .

# Run the container
docker run -p 3000:3000 --env-file .env balkolux
```

**Sample Nginx config:**

```nginx
server {
    listen 80;
    server_name balkolux.com www.balkolux.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Production Checklist

- Set `NODE_ENV=production`
- Update `NEXTAUTH_URL` and `NEXT_PUBLIC_BASE_URL` to your live domain
- Switch `IYZICO_BASE_URL` to `https://api.iyzipay.com`
- Use a managed MySQL instance (PlanetScale, Railway, AWS RDS)
- Configure Cloudinary for the production environment
- Enable HTTPS (automatic on Vercel; use Let's Encrypt + Certbot for VPS)
- Set up Horoz Kargo production credentials
- Verify KVKK, cookie policy, and legal pages are up to date

---

## 🤝 Contributing

1. **Fork** this repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'feat: add AmazingFeature'
   ```
4. Push your branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a **Pull Request**

### Code Standards

- Use **TypeScript** strictly — no `any` types
- Validate all API inputs with **Zod**
- Follow **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`)
- Run `npm run build` before submitting PRs to catch type and build errors

---

## 👤 Developer

**Ceyhun Türkmen**

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

*BalkoLüx — Functional outdoor living solutions for modern spaces.* 🌿

</div>