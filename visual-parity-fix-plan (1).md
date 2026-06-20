# Fast Track Food Stuff LLC — Visual Parity Fix Plan
**For Claude Code — to be run inside the EXISTING live repo (https://fast-track-cyan.vercel.app/)**

---

## 0. Context — Read This First

The site is already live, deployed on Vercel, connected to Supabase, and functionally correct: pages exist, routing works, the contact form works, the WhatsApp button works, products load from the database. **Do not rebuild, re-scaffold, or re-architect anything.** This is a visual/content patch, not a new build.

**The problem:** The site currently looks like a wireframe — text-heavy, no real imagery anywhere, plain flat sections. The reference site (https://www.primetrading.co.om/) feels like an established, real business because it's image-dense: every section has a photo, banner, or visual anchor behind/beside the text.

**The goal:** Match Prime Trading's visual density and layout patterns, section by section, using the same page structure and content Fast Track already has (Brazilian/Oman frozen food positioning, 4 frozen products, Horeca/Retail/Wholesale segments) — just dressed with real visual weight instead of bare text blocks.

**Ground rule for this pass:** Every section below should end up with at least one real image, photo, or graphic. No section should be plain text-on-background like it is now.

---

## 1. Image Assets Needed (Source/Generate Before Coding Sections)

**HARD RULE: Do not copy, download, or hot-link any image from primetrading.co.om or any other competitor site.** Source everything below from licensed stock libraries (Unsplash, Pexels) or AI-generated food/warehouse photography. Same category/subject matter as the reference site is fine (e.g. "a chicken breast product photo," "a warehouse photo") — their literal files are not.

Claude Code (or the developer) needs to source placeholder-quality images for the following. Use royalty-free stock sources (Unsplash, Pexels) or AI-generated food photography — consistent lighting/style across the set is more important than perfection.

| Asset | Used in | Notes |
|---|---|---|
| Hero slide 1 — frozen food / cold storage warehouse | Home hero carousel | Wide banner, 1600x800+ |
| Hero slide 2 — chicken breast product shot | Home hero carousel | |
| Hero slide 3 — fries/fast food plated shot | Home hero carousel | |
| Hero slide 4 — HORECA/restaurant kitchen scene | Home hero carousel | |
| About section image | About teaser (home) + About page | Warehouse, cold storage, or team/operations shot |
| HORECA segment background | What We Do (home + page) | Restaurant/hotel kitchen |
| Retail segment background | What We Do (home + page) | Supermarket shelf/freezer aisle |
| Wholesale segment background | What We Do (home + page) | Warehouse/logistics/pallets |
| Chicken Breast product photo | Frozen Products grid + detail page | Raw or packaged chicken breast, clean background |
| Beef Mince product photo | Frozen Products grid + detail page | Packaged/fresh mince, clean background |
| Crinkle Cut Fries product photo | Frozen Products grid + detail page | Bag or plated crinkle fries |
| French Regular Fries product photo | Frozen Products grid + detail page | Bag or plated straight-cut fries |
| Logo graphic (simple wordmark or icon) | Navbar + Footer | Replace plain "FT" text with a designed logo (even a simple styled SVG wordmark is fine for now) |
| Stats section background (subtle, optional) | Home stats band | Low-opacity warehouse/cold-chain image behind the 4 stat tiles, like Prime Trading does |

Store these in `/public/images/` organized by section: `/public/images/hero/`, `/public/images/about/`, `/public/images/segments/`, `/public/images/products/`.

For products specifically: since these already live in Supabase (`products.image_url`), upload the real image files to the Supabase Storage bucket `product-images` and update each product row's `image_url` — do NOT hardcode product images directly into the page component, since that breaks the future admin-editable setup that's already in place.

---

## 2. Home Page (`/`) — Section-by-Section Fixes

### 2.1 Hero Section — currently: plain text, no image
**Change to:** Full-bleed rotating image carousel, matching Prime Trading's pattern.
- 3-4 slides, auto-rotating (every 4-5 seconds) with manual prev/next controls and dot indicators.
- Each slide: full-width background image with a dark gradient overlay (so white text stays readable), headline + subtext + CTA button layered on top — same content you have now ("Premium Frozen Foods For Your Business", etc.), just one variant of text per slide instead of all slides showing the same text.
- Suggested 3 slide themes: (1) general brand/cold-chain hero, (2) product-focused ("Finest Frozen Products"), (3) HORECA-focused ("Premium Supplies for Hotels & Restaurants").
- Keep existing CTAs ("Explore Products", "Contact Us") on at least the first slide.

### 2.2 "Who We Are" / About Teaser — currently: text block only
**Change to:** Two-column layout — image on one side, text + stats badge on the other (mirrors Prime Trading's About section with the "Since 1992" badge graphic).
- Left or right: warehouse/cold-storage image.
- Other side: existing "A Global Standard, Delivered Locally" copy + "Know More" button.
- Add a small badge/graphic overlapping the image corner — e.g., a circular badge saying "Brazilian Heritage" or similar, echoing Prime Trading's "1992" badge concept. Keep it simple (CSS-styled div, not necessarily a custom image).

### 2.3 Stats Band — currently: plain text numbers
**Change to:** Visually distinct section — dark or brand-colored background (deep green), subtle background image at low opacity (warehouse/logistics themed), 4 stat tiles with larger styled numbers and icons (use lucide-react icons: e.g., package icon for "Product Lines", building icon for "Market Segments", snowflake/thermometer icon for "Cold-Chain Handled", award/badge icon for "Official Franchise").
- Keep existing stat values: 4+ Product Lines, 3 Market Segments, 100% Cold-Chain Handled, 1 Official Franchise Oman.

### 2.4 "What We Do" — currently: 3 plain text cards
**Change to:** 3 cards, each with a background image (full-bleed within the card) and a dark overlay, white text on top — directly matching Prime Trading's HORECA/Retail/Wholesale card treatment.
- HORECA card → restaurant/hotel kitchen image.
- Retail card → supermarket shelf image.
- Wholesale card → warehouse/logistics image.
- Keep existing descriptive copy, just restyle the card to have the image as the card background instead of a flat color.

### 2.5 Featured Frozen Products — currently: cards show text initials ("Ch", "Be", "Cr", "Fr") instead of images
**Critical fix:** Replace the initials placeholder with the actual `image_url` from Supabase for each product. This is the single most noticeable bug — right now it looks broken/unfinished. Once real images are uploaded to Supabase Storage and `image_url` is set per product, the existing `ProductCard` component should already render them correctly — verify the component is actually using `next/image` with the `image_url` field, not a hardcoded fallback/initial.

### 2.6 Contact CTA Band — currently: fine, just plain
**Change to:** Add a subtle background image (food/warehouse themed, low opacity) behind the "Ready to Order?" band so it's not a flat color block, consistent with how Prime Trading textures every section.

### 2.7 Footer — currently: text-only "FT" initials
**Change to:**
- Replace "FT" text with the new logo graphic (see Section 1 assets).
- Add social media icons (Instagram, Facebook, LinkedIn — use lucide-react or simple SVGs) even if links are placeholder `#` for now until real social accounts exist.
- Keep all existing contact info, quick links, and copyright as-is.

### 2.8 NEW (optional, matches Prime Trading): "Our Brands / Partner Logos" strip
- Prime Trading runs a continuous logo carousel right below the hero. If Fast Track doesn't yet distribute named third-party brands, **skip this** — do not fabricate brand logos. Revisit only when real brand partnerships exist.

### 2.9 NEW (optional, matches Prime Trading): "News & Blogs" teaser section
- Low priority. Skip for this pass unless time permits — can be added in a later phase once there's real content to put there (industry articles, company updates).

---

## 3. About Page (`/about`) — Fixes

- Currently likely text-heavy (same content as the home teaser, expanded). Add at least 1-2 supporting images: a hero banner image at the top of the page, and a secondary image alongside the expanded company story (warehouse, cold storage, or team-style stock photo).
- If a stats block exists on this page too, apply the same icon + styled-tile treatment as Section 2.3.

---

## 4. What We Do Page (`/what-we-do`) — Fixes

- Expand each of the 3 segments (HORECA, Retail, Wholesale) into its own visual block: image + heading + paragraph, alternating left/right layout (image-left/text-right, then image-right/text-left, then repeat) — this is a common, effective pattern and adds visual rhythm down the page instead of 3 identical stacked cards.
- Use the same segment images sourced in Section 1.

---

## 5. Frozen Products Page (`/frozen-products`) — Fixes

- **Critical fix (same as 2.5):** Replace placeholder initials with real product images pulled from Supabase `image_url`.
- Add a hero/banner image at the top of the page (frozen food themed) instead of a plain page header, matching how Prime Trading treats its sub-pages with a background banner under the nav.
- Verify grid is responsive (already should be, but re-check after adding real images so cards don't break layout on mobile).

---

## 6. Product Detail Pages (`/frozen-products/[slug]`) — Fixes

- Same critical image fix: large product image at the top instead of any placeholder/initial.
- Confirm "Enquire via WhatsApp" and "Enquire via Email" buttons are present and working (per original plan) — if not yet built, add them now:
  - WhatsApp button: `https://wa.me/96895219203?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20[Product Name]` (URL-encoded, product name injected dynamically).
  - Email button: links to `/contact?product=[Product Name]`, and the Contact page should pre-fill the Subject field from this query param if present.

---

## 7. Products Page (`/products`) — Fixes

- Add at least one banner/header image at the top (consistent with other sub-pages).
- Keep the "Our growing product range" placeholder copy as-is for now, but give it visual weight (image alongside text, not a bare paragraph).

---

## 8. Contact Page (`/contact`) — Fixes

- Add a banner image at the top, consistent with other sub-pages.
- Verify the Google Maps iframe embed (Oman location) is present per the original plan — add if missing.
- Confirm contact form still POSTs to `/api/contact` correctly and the Resend email delivery is unaffected by any of these visual changes (this is a styling pass — no logic should change here).

---

## 9. Navbar — Fixes

- Replace plain "FT Fast Track Food Stuff LLC" text logo with the new logo graphic (icon + wordmark), matching how Prime Trading's navbar has an actual logo image, not text.
- Keep the "Get in Touch" CTA button styling as-is if it already looks fine.

---

## 10. Design Tokens & Motion — Confirm/Reinforce

Carry over from the original plan, re-confirm these are actually applied consistently now that more visual sections are being added:
- Primary: solid deep green (`#1B5E3A` range) — used boldly as the dominant brand color (nav background or accents, stats band, buttons), not just a thin accent line.
- Accent: warm gold/amber (`#D9A441` range)
- Background neutral: `#F8F7F4`
- Text: dark charcoal `#1F1F1F`
- All new image overlays should use a dark gradient (black at 40-60% opacity) to keep white text readable, matching Prime Trading's card-image-with-overlay pattern.
- Rounded corners on all cards/buttons (already established — keep consistent).

### Animation/Motion (new requirement for this pass)
Install `framer-motion` (`npm install framer-motion`) and apply animation in these places to make the solid-color design feel alive rather than static:
- **Hero carousel:** smooth fade/slide crossfade between slides (not an instant cut).
- **Scroll-triggered fade/slide-in:** sections (About teaser, Stats band, What We Do cards, Product cards) animate in (opacity + slight upward translate) as the user scrolls them into view. Use `whileInView` with `viewport={{ once: true }}` so animations run once, not on every scroll pass.
- **Card hover states:** product cards and segment cards get a subtle scale-up (e.g. `scale: 1.03`) and shadow increase on hover — gives the solid-color cards tactile feedback.
- **Stats counter animation:** numbers in the stats band count up from 0 to their final value when scrolled into view (small, common FMCG-site touch).
- **Button micro-interactions:** slight scale/opacity transition on hover/tap for all CTA buttons.
- Keep animations subtle and fast (150-400ms) — the goal is "feels alive," not flashy or distracting from a B2B audience.

### Image Sourcing Rule (hard constraint)
**Never copy, download, hot-link, or reference images directly from primetrading.co.om or any competitor site.** All imagery must come from licensed stock sources (Unsplash, Pexels, etc.), AI-generated placeholders, or the client's own real photography. Using a competitor's actual visual assets is a copyright and competitive-risk issue — this applies to every image asset listed in Section 1, with zero exceptions.

---

## 11. Explicitly NOT in Scope for This Pass

- No admin panel changes.
- No new pages beyond what already exists.
- No client-logo wall or brand-partner carousel (only revisit if Fast Track later has real client/brand names to display — do not fabricate placeholder company logos, as that misrepresents real partnerships).
- No content/copy rewrites — the existing text across all pages stays; this pass is purely: **add real images and visual structure to every section that's currently flat text.**

---

## 12. Acceptance Checklist (Run Through Before Calling This Done)

- [ ] Home hero is a rotating image carousel, not flat text
- [ ] About teaser on home has an image + badge graphic
- [ ] Stats band has a styled background + icons, not plain numbers
- [ ] "What We Do" 3 cards have background images with overlay text
- [ ] Featured product cards show real images, NOT text initials
- [ ] Frozen Products page grid shows real images, NOT text initials
- [ ] Product detail pages show real large product images
- [ ] About page has at least 1-2 images
- [ ] What We Do page has alternating image/text blocks per segment
- [ ] Products page has a banner image
- [ ] Contact page has a banner image + working map embed
- [ ] Navbar and footer use a real logo graphic, not "FT" text
- [ ] Footer has social icons
- [ ] Contact form + email delivery still work after all styling changes (regression check)
- [ ] WhatsApp button still works on every page (regression check)
- [ ] Site is still responsive on mobile after adding all new imagery
- [ ] No fabricated brand/client logos were added anywhere

---

## 13. Summary for Claude Code

The site at https://fast-track-cyan.vercel.app/ is functionally complete but visually flat compared to the reference site (https://www.primetrading.co.om/). This is a styling and asset-injection pass, not a rebuild: source/upload the images listed in Section 1, then go section-by-section (Sections 2-9) adding real imagery, image-with-overlay card treatments, alternating image/text layouts, icon-styled stat tiles, and a real logo graphic — replacing every flat-text section and fixing the broken product-image-initials bug. Preserve all existing copy, routing, Supabase data flow, contact form logic, and WhatsApp integration exactly as-is. Do not fabricate client or brand logos.
