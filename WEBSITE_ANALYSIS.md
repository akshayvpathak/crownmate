# Frizty Website Analysis Report

> Source of truth: Live site at https://friztyretail.com/ (inspected June 9, 2026)
> Platform: Shopify (Minimog theme)

---

## 1. Site Map

```
/ (Home)
├── /products (Shop All)
│   └── /products/[slug] (15 products)
├── /collections
│   └── /collections/[slug] (18 collections)
├── /cart
├── /checkout
├── /about
├── /contact
├── /faq
├── /track-order
├── /warranty-registration
├── /privacy-policy
├── /refund-policy
└── /terms-and-conditions
```

**Live URL mapping:**
| Next.js Route | Live Shopify URL |
|---------------|------------------|
| `/products` | `/collections/all` |
| `/collections/[slug]` | `/collections/[handle]` |
| `/products/[slug]` | `/products/[handle]` |
| `/about` | `/pages/about-us` |
| `/contact` | `/pages/contact` |
| `/privacy-policy` | `/policies/privacy-policy` |

---

## 2. Page Inventory

| Page           | Sections                                                                                                                                      | Data Source               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Home           | Announcement, Header, Hero Carousel, Categories, Best Sellers, Brand Story, Combos, Press, Why Choose Us, Benefits, Testimonials, FAQ, Footer | Static + Shopify API      |
| Products       | Filters, Sort, Product Grid, Pagination                                                                                                       | Shopify products.json     |
| Product Detail | Gallery, Variants, Qty, Add to Cart, Accordion FAQ, Reviews, Press                                                                            | Shopify product data      |
| Collections    | Collection header, Filters, Product grid                                                                                                      | Shopify collections.json  |
| Cart           | Line items, Discount tiers, Coupon, Summary                                                                                                   | Zustand (client)          |
| Checkout       | Contact, Shipping, Payment, Order summary                                                                                                     | Zustand + React Hook Form |
| About          | Mission, Vision, Values, Founders, Journey, Team                                                                                              | Static content            |
| Contact        | Form, Address, Support info                                                                                                                   | React Hook Form           |
| FAQ            | Accordion items                                                                                                                               | Static content            |
| Policies       | Legal text                                                                                                                                    | Static content            |

---

## 3. Component Inventory

### Layout

- `AnnouncementBar` — Marquee promo messages + warranty/track links
- `Header` — Logo, desktop nav with dropdowns, mobile drawer, search, cart icon
- `Footer` — Newsletter, social links, 4-column link groups
- `AgeGate` — 18+ verification dialog
- `SiteLayout` — Wraps all pages

### Home

- `HeroBanner` — Embla carousel, purple/blue slides, benefit icons, CTA
- `CategorySection` — 6 circular category cards with item counts
- `BestSellers` — 8-product grid
- `BrandStory` — Split image + "Everyone should express themselves" CTA
- `CombosSection` — Combo product grid
- `PressSection` — 3 press logos (Interviewer, IBT, Media Hindustan)
- `WhyChooseUs` — 4 feature pills on purple background
- `BenefitsSection` — 4 trust badges (Quality, Secure, Delivery, Warranty)
- `TestimonialsSection` — Carousel of customer reviews
- `FAQSection` — Accordion

### Product

- `ProductCard` — Image, badge, rating, price, Quick Add / Select options
- `ProductDetail` — Gallery, variants, quantity, accordion, sticky CTA
- `ProductFilters` — Mobile filter drawer, sort select

### Cart

- `CartDrawer` — Desktop slide-over panel
- `MobileCartDrawer` — Vaul bottom drawer
- `StickyCheckoutCta` — Mobile fixed bottom bar
- `CartDrawerContent` — Shared cart content

### Shared UI (shadcn/Radix)

- Button, Input, Textarea, Select, Card, Badge
- Accordion, Tabs, Dialog, Drawer, Carousel
- ProductCard, TestimonialCard, FAQComponent, FeatureCard

---

## 4. Design System Inventory

### Typography

| Role           | Font                         | Weight        | Size (mobile → desktop) |
| -------------- | ---------------------------- | ------------- | ----------------------- |
| Body           | Inter Tight (Inter fallback) | 400-500       | 14px → 16px             |
| Display/Italic | Franie Variable              | 400           | 14px → 18px             |
| H1 (Hero)      | Inter Tight                  | 700           | 30px → 60px             |
| H2 (Section)   | Inter Tight                  | 700           | 24px → 36px             |
| H3 (Card)      | Inter Tight                  | 600           | 14px → 16px             |
| Button         | Inter Tight                  | 600 uppercase | 12px → 14px             |

### Color Palette

| Token                      | Hex       | Usage                |
| -------------------------- | --------- | -------------------- |
| `--color-foreground`       | `#000000` | Text, buttons        |
| `--color-background`       | `#FFFFFF` | Page background      |
| `--color-primary`          | `#7A7AF3` | Hero purple, accents |
| `--color-hero-blue`        | `#5B8DEF` | Secondary hero slide |
| `--color-secondary`        | `#F5F5F5` | Section backgrounds  |
| `--color-muted-foreground` | `#666666` | Secondary text       |
| `--color-border`           | `#DDDDDD` | Borders              |
| `--color-destructive`      | `#DA3F3F` | Sale badges, errors  |
| `--color-sale`             | `#DA3F3F` | Discount badges      |

### Spacing Scale

- Section padding: `clamp(2.5rem, 6vw, 5rem)` vertical
- Container: `max-width: 1440px`, `padding-inline: clamp(1rem, 4vw, 2.5rem)`
- Card gap: 16px mobile → 24px desktop
- Touch targets: minimum 44×44px

### Border Radius

- Buttons: `rounded-full` (pill)
- Cards: `rounded-xl` (12px)
- Images: `rounded-2xl` (16px) or `rounded-full` (categories)

---

## 5. Responsive Strategy

**Mobile-first breakpoints:**
| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| 320px | Base | Single column, stacked hero, 2-col product grid |
| 375px | iPhone SE | Same, slightly more padding |
| 390px | iPhone 14 | Optimized touch targets |
| 414px | iPhone Plus | 2-col grids maintained |
| 768px (md) | Tablet | 3-col products, desktop nav hidden until lg |
| 1024px (lg) | Laptop | Full desktop nav, 4-col products, side cart |
| 1280px (xl) | Desktop | Max container width |
| 1440px (2xl) | Wide | Container capped at 1440px |

**Key responsive behaviors:**

- Mobile: hamburger menu, Vaul cart drawer, sticky checkout CTA
- Desktop: hover dropdowns, right-side cart drawer
- Hero: full-bleed, stacked benefits on mobile
- Product grid: 2 → 3 → 4 columns
- No horizontal overflow (`overflow-x: hidden` on html/body)

---

## 6. Folder Structure

```
src/
├── app/                    # Next.js 15 App Router pages
├── components/
│   ├── ui/                 # shadcn primitives
│   ├── shared/             # ProductCard, FAQ, etc.
│   ├── layout/             # Header, Footer, Announcement
│   ├── home/               # Homepage sections
│   ├── product/            # Product-specific
│   ├── collection/         # Collection-specific
│   ├── cart/               # Cart drawer, sticky CTA
│   └── forms/              # Contact, newsletter
├── hooks/                  # useMediaQuery
├── providers/              # TanStack Query, Theme, Sonner
├── store/                  # Zustand: cart, UI, theme, product selection
├── services/               # Product, collection, review services
├── lib/                    # utils, seo helpers
├── types/                  # TypeScript interfaces
├── schemas/                # Zod validation
├── constants/              # assets, navigation
├── data/                   # images.ts, home-content, products.json
├── styles/                 # globals.css
└── utils/                  # (via lib/utils.ts)
```

---

## 7. State Management Strategy

### Zustand Stores

| Store                     | Purpose                            | Persisted          |
| ------------------------- | ---------------------------------- | ------------------ |
| `cart-store`              | Cart items, coupon, discount tiers | Yes (localStorage) |
| `ui-store`                | Cart/menu/search open, age gate    | No                 |
| `theme-store`             | Light/dark preference              | Yes                |
| `product-selection-store` | Variant, image index, quantity     | No                 |

### TanStack Query

- Products list (staleTime: 60s)
- Collections list
- Reviews by product slug
- Future: API integration layer

---

## 8. SEO Strategy

- **Metadata**: `generatePageMetadata()` per route with title, description, canonical, OG, Twitter
- **Structured Data**: Organization JSON-LD (layout), Product JSON-LD (product pages)
- **Static Generation**: All product/collection pages via `generateStaticParams`
- **Sitemap**: Auto-generated from static routes
- **Performance**: Server Components default, client only for interactivity
- **Image SEO**: `alt` text, `next/image` optimization, lazy loading

---

## 9. Cart Experience

### Desktop

- Right-side slide-over drawer (400px max-width)
- Discount tier progress bar (₹1099/₹2099/₹3099)
- Coupon input (FRIZTY5, FRIZTY10, WELCOME)
- Free shipping estimate
- Checkout + View Cart CTAs

### Mobile

- Vaul bottom drawer (92vh max)
- Sticky bottom checkout CTA when cart has items
- Same discount/coupon functionality

---

## 10. Products (from Shopify API)

15 products including:

- Electric Gua Sha Face Massager (₹1,499)
- Electric Scalp Massager (₹1,099)
- 4-In-1 Slixy Trimmer (₹1,099)
- Wellness Combo (₹3,499)
- Pill Organizer (₹599)
- Rosemary Essential Oil (₹299)
- And 9 more combo/specialty products

---

## 11. Animations & Interactions

- Hero carousel auto-loop with dot indicators
- Announcement bar CSS marquee
- Product card hover scale (1.05)
- Accordion expand/collapse (Radix)
- Cart drawer slide-in
- Age gate modal on first visit
- Toast notifications (Sonner)

---

## 12. Accessibility

- Semantic HTML (`header`, `main`, `footer`, `nav`, `article`)
- ARIA labels on icon buttons
- 44px minimum touch targets
- Focus visible rings on interactive elements
- Screen reader text for cart count
- Keyboard navigable accordion/tabs/dialogs
