# Fast Track Food Stuff LLC — Website Build Plan

**Purpose of this document:** This is a step-by-step implementation plan for Claude Code to execute inside a fresh repo. It covers project setup, database schema, page structure, content, and deployment. Follow the steps in order — each phase builds on the previous one.

---

## 0. Project Overview

**Client:** Fast Track Food Stuff LLC
**Industry:** Fast food / frozen food wholesale & distribution, Oman
**Inspiration reference:** https://www.primetrading.co.om/ (competitor — similar segment structure: Horeca / Retail / Wholesale)
**Differentiator:** Brazilian-based company with an official franchise/distribution operation in Oman, plus a dedicated Frozen Products line.

**Contact info to use throughout the site:**
- Company: Fast Track Food Stuff LLC
- Email: fasttrackfoodstuffllc@gmail.com
- Phone / WhatsApp: +968 95219203

**Current phase:** Phase 1 — public marketing website with product data already living in a real database (Supabase), so Phase 2 (admin CRUD panel) can be added later with no re-architecture.

**Explicitly out of scope for Phase 1:** Admin panel/login, client-logo wall, brand-partner carousel. Code should be structured so these can be added later without refactoring.

---

## 1. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Database | Supabase (Postgres) |
| Image storage | Supabase Storage (bucket: `product-images`) |
| Contact form email delivery | Resend (via Next.js API route) |
| Hosting | Vercel |
| Icons | lucide-react |

**Why this stack:** No server to manage, free tiers across the board, product data lives in a real DB from day one so an admin CRUD panel can be bolted on later without rebuilding anything, and deployment is push-to-deploy on Vercel.

---

## 2. Project Setup

1. Scaffold the project:
   ```bash
   npx create-next-app@latest fast-track-foods --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```
2. Install dependencies:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr resend lucide-react
   ```
3. Create `.env.local` (and a matching `.env.example` with blank values, committed to repo):
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   RESEND_API_KEY=
   CONTACT_FORM_TO_EMAIL=fasttrackfoodstuffllc@gmail.com
   NEXT_PUBLIC_WHATSAPP_NUMBER=96895219203
   NEXT_PUBLIC_SITE_URL=
   ```
4. Add `.env.local` to `.gitignore` (should already be there by default with create-next-app).
5. Initialize git, create repo, push initial scaffold.

---

## 3. Supabase Setup

### 3.1 Create Supabase project
1. Create a new project at supabase.com.
2. Copy the Project URL, anon public key, and service role key into `.env.local`.

### 3.2 Database schema

Run this SQL in the Supabase SQL editor:

```sql
-- Categories (Frozen, Beverages, etc. — lets you expand beyond just frozen later)
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  display_order int default 0,
  created_at timestamptz default now()
);

-- Products
create table products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  unit text,              -- e.g. "1kg pack", "2.5kg box"
  is_featured boolean default false,
  is_active boolean default true,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Contact form submissions (stored as a backup/log, even though email is the primary delivery)
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  created_at timestamptz default now()
);
```

### 3.3 Seed data

```sql
insert into categories (name, slug, display_order) values
  ('Frozen Products', 'frozen-products', 1);

insert into products (category_id, name, slug, description, unit, is_featured, display_order)
select id, 'Chicken Breast', 'chicken-breast',
  'Premium quality frozen chicken breast, carefully processed and flash-frozen to preserve freshness, texture, and nutritional value. Ideal for restaurants, catering, and retail.',
  '1kg / 2.5kg pack', true, 1
from categories where slug = 'frozen-products';

insert into products (category_id, name, slug, description, unit, is_featured, display_order)
select id, 'Beef Mince', 'beef-mince',
  'High-quality frozen beef mince, ground fresh and flash-frozen to lock in flavor and quality. Perfect for burgers, kebabs, and a wide range of culinary applications.',
  '1kg / 2.5kg pack', true, 2
from categories where slug = 'frozen-products';

insert into products (category_id, name, slug, description, unit, is_featured, display_order)
select id, 'Crinkle Cut Fries', 'crinkle-fries',
  'Crispy, golden crinkle-cut fries made from premium potatoes. Pre-cut and flash-frozen for convenience, consistency, and great taste every time.',
  '2.5kg bag', true, 3
from categories where slug = 'frozen-products';

insert into products (category_id, name, slug, description, unit, is_featured, display_order)
select id, 'French Regular Fries', 'french-regular-fries',
  'Classic straight-cut french fries, made from premium potatoes for a crispy outside and fluffy inside. A staple for any kitchen, restaurant, or catering business.',
  '2.5kg bag', true, 4
from categories where slug = 'frozen-products';
```

### 3.4 Row Level Security (RLS)

```sql
alter table categories enable row level security;
alter table products enable row level security;
alter table contact_submissions enable row level security;

-- Public can read categories & active products
create policy "Public read categories" on categories for select using (true);
create policy "Public read active products" on products for select using (is_active = true);

-- Public can insert contact submissions (but not read them — only via service role/admin later)
create policy "Public insert contact submissions" on contact_submissions for insert with check (true);
```

### 3.5 Storage bucket
1. Create a public bucket named `product-images` in Supabase Storage.
2. Upload 4 placeholder images for now (clean stock-style food photography — chicken breast, beef mince, crinkle fries, french fries). These can be swapped later via the future admin panel.
3. Note the public URL pattern: `https://<project>.supabase.co/storage/v1/object/public/product-images/<filename>`

---

## 4. Site Structure & Pages

```
/                    Home
/about               About Us
/what-we-do          What We Do (Horeca / Retail / Wholesale overview)
/frozen-products     Frozen Products (dedicated page, pulls from Supabase)
/frozen-products/[slug]   Individual product detail page (optional, nice-to-have)
/products            Brands & Products (general overview)
/contact             Contact Us (form)
```

### 4.1 Home (`/`)
- Hero section with rotating/banner imagery (placeholder banners for now), tagline reflecting Brazilian heritage + Oman presence, and a primary CTA ("Explore Our Products" → `/frozen-products`).
- "About us" teaser block (2-3 sentences + "Know More" link to `/about`).
- "What We Do" 3-card section: Horeca / Retail / Wholesale, each linking to `/what-we-do`.
- Featured Frozen Products section: pull 4 featured products from Supabase, show as cards (image, name, short description, "View Details" link).
- Contact CTA banner near the footer ("Have a question? Get in touch" → `/contact`).
- Floating WhatsApp button (see section 6).

### 4.2 About Us (`/about`)
Content to include (real business fact, write naturally — do NOT name a specific Brazilian parent company, just state Brazilian origin):
- Fast Track Food Stuff LLC is a Brazilian-based company with an official franchise presence in the Sultanate of Oman.
- Brings international food quality standards and Brazilian-rooted expertise in frozen food processing to the Omani market.
- Mission: deliver high-quality, reliable frozen and food wholesale products to HORECA, retail, and wholesale customers across Oman.
- Optional stats block (placeholder/aspirational, mark as easily editable later): years of combined expertise, product range, commitment to quality & cold-chain handling.

### 4.3 What We Do (`/what-we-do`)
Three segment blocks, similar structure to Prime Trading but original copy:
- **HORECA** — supplying hotels, restaurants, and catering businesses with consistent, high-quality frozen products.
- **Retail** — supporting supermarkets and retail outlets with reliable stock and packaging suited for shelf display.
- **Wholesale** — bulk distribution backed by efficient cold-chain logistics and storage.

### 4.4 Frozen Products (`/frozen-products`)
- Page header/banner.
- Grid of product cards, dynamically fetched from Supabase `products` table where `category = frozen-products` and `is_active = true`, ordered by `display_order`.
- Each card: image, name, unit/pack size, short description, "View Details" (optional link to `/frozen-products/[slug]`).
- This page (and its data fetching) should be built generically — i.e., NOT hardcoded to exactly 4 products — so that adding a 5th frozen item later via Supabase automatically makes it appear here with zero code changes.

### 4.5 Product Detail Page (`/frozen-products/[slug]`) — optional but recommended
- Fetches single product by slug from Supabase.
- Larger image, full description, unit/pack info, "Enquire via WhatsApp" button (pre-filled message mentioning the product name) and "Enquire via Email" button (links to `/contact?product=<name>`, which can pre-fill the subject field).

### 4.6 Brands & Products (`/products`)
- General overview page. Since there's no third-party brand carousel yet, structure this as a placeholder section ("Our growing product range") with a note in code (comment) that a brand-logo carousel component can be dropped in later.
- Can also link back to `/frozen-products` as the current flagship category.

### 4.7 Contact (`/contact`)
- Contact form fields: Name, Email, Phone (optional), Subject, Message.
- On submit: POST to `/api/contact` (see section 5).
- Display company contact details alongside the form: email, phone/WhatsApp, and optionally a simple Oman map embed (can be a static Google Maps iframe — no API key needed for basic embed).
- Success/error state handling in the UI (toast or inline message).

---

## 5. Contact Form — API Route

Create `src/app/api/contact/route.ts`:

**Logic:**
1. Receive POST with `{ name, email, phone, subject, message }`.
2. Validate required fields (name, email, message) server-side.
3. Insert the submission into Supabase `contact_submissions` table (using the service role key, server-side only) as a permanent record/backup.
4. Send an email via Resend to `process.env.CONTACT_FORM_TO_EMAIL` (fasttrackfoodstuffllc@gmail.com), with the form details formatted clearly, and `reply_to` set to the submitter's email so you can reply directly.
5. Return a JSON success/error response to the frontend.

**Resend setup note for Claude Code:**
- Sign up at resend.com, verify a sending domain (or use their test domain for initial development), generate an API key, add to `.env.local` as `RESEND_API_KEY`.
- Until a custom domain is verified, Resend's default `onboarding@resend.dev` sender can be used for testing — but flag to the user that they should verify their own domain (or at least a subdomain) before going live, or emails may land in spam.

---

## 6. WhatsApp Floating Button

- Build a reusable `<WhatsAppButton />` component, fixed-position (bottom-right corner), visible on all pages.
- Link format:
  ```
  https://wa.me/96895219203?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20your%20products
  ```
- Use `NEXT_PUBLIC_WHATSAPP_NUMBER` env variable rather than hardcoding the number, so it's editable without a code change.
- Opens in a new tab (`target="_blank" rel="noopener noreferrer"`).
- Use a recognizable WhatsApp icon (lucide-react doesn't have a brand icon — use a small inline SVG of the WhatsApp logo, or `react-icons` if preferred).

---

## 7. Design Direction

- **Color palette:** Deep green (primary, e.g. `#1B5E3A` range) + warm gold/amber (accent, e.g. `#D9A441` range) + white/neutral base (`#F8F7F4` backgrounds, dark charcoal text `#1F1F1F`). This nods to Brazilian heritage without being a literal flag clone, and is visually distinct from the competitor's red theme.
- **Typography:** Clean, modern sans-serif (e.g. Inter or similar via `next/font`). Bold, large headings for hero sections; readable body text.
- **Layout style:** Card-based sections, generous whitespace, rounded corners on cards/buttons (food/FMCG sites read as more approachable with soft edges vs. sharp corners).
- **Imagery:** Until real product photography is supplied, use clean, well-lit stock-style placeholder images (consistent style/lighting across all 4 products — don't mix wildly different photo styles).
- **Responsiveness:** Mobile-first; many Oman B2B buyers will browse via phone before WhatsApp-ing, so the product grid, WhatsApp button, and contact form must work cleanly on small screens.

Refer to the `frontend-design` skill/guidelines for avoiding generic/templated visual choices — give the site a distinct identity rather than a default Tailwind look.

---

## 8. Reusable Components Checklist

- `Navbar` (logo placeholder, nav links, mobile hamburger menu)
- `Footer` (company name, email, phone, nav links, copyright)
- `WhatsAppButton` (floating, global)
- `ProductCard` (image, name, unit, short description, link)
- `SegmentCard` (for Horeca/Retail/Wholesale blocks)
- `ContactForm` (client component, handles submit state)
- `SectionHeading` (consistent heading style across pages)

---

## 9. Data Fetching Notes for Claude Code

- Use Supabase server-side client (via `@supabase/ssr`) in Server Components for fetching categories/products — keeps pages fast and SEO-friendly (Next.js can statically render or use ISR with `revalidate`).
- Suggested revalidation: `export const revalidate = 60` (or similar) on product-listing pages, so that once the future admin panel adds/edits products, changes show up within ~a minute without needing a full redeploy.
- The contact form submission (`/api/contact`) is the only piece that needs the Supabase **service role** key, and only inside the API route (server-side, never exposed to the client).

---

## 10. Deployment

1. Push repo to GitHub.
2. Import project into Vercel, connect the GitHub repo.
3. Add all environment variables from `.env.local` into Vercel's Project Settings → Environment Variables (Production + Preview).
4. Deploy.
5. Verify:
   - Homepage loads, featured products pull from Supabase correctly.
   - Frozen Products page lists all 4 seeded products.
   - Contact form submits successfully and an email arrives at fasttrackfoodstuffllc@gmail.com.
   - WhatsApp button opens a chat to +968 95219203 with the pre-filled message.
   - Site is responsive on mobile.

---

## 11. Explicitly Deferred to Phase 2 (Do Not Build Yet)

- `/admin` route with Supabase Auth login.
- Admin CRUD UI for products (add/edit/delete, image upload to Supabase Storage).
- Client-logo wall ("Our Clients").
- Brand-partner logo carousel.
- Multi-language (Arabic) support.

Code should avoid hardcoding assumptions that would make these harder to add later (e.g., product data must come from Supabase, not be hardcoded in JSX; components should be modular).

---

## 12. Summary for Claude Code

Build a Next.js 14 (App Router, TypeScript, Tailwind) marketing website for Fast Track Food Stuff LLC, a Brazilian-based frozen food company with a franchise presence in Oman. Pull all product data from Supabase (schema in Section 3). Pages: Home, About, What We Do, Frozen Products (dynamic from DB, seeded with Chicken Breast, Beef Mince, Crinkle Fries, French Regular Fries), Products, Contact (form emails fasttrackfoodstuffllc@gmail.com via Resend, also logs to Supabase). Floating WhatsApp button to +968 95219203. Deep green + gold color palette. Deploy-ready for Vercel. Skip admin panel, client wall, and brand carousel for now, but keep code modular enough to add them later without refactoring.
