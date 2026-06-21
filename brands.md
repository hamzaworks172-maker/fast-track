# Fast Track Food Stuff LLC — "Our Brands" Section + Hero Image Fix Plan
**For Claude Code — to be run inside the EXISTING live repo (https://fast-track-cyan.vercel.app/)**

**This is a standalone, additive plan. Do not modify or re-run `visual-parity-fix-plan.md` based on this document — this is new, separate scope.**

---

## 0. Context

Two separate issues to address in this pass:

1. **Bug fix:** The "Who We Are" section image on the home page currently shows construction workers (rebar, hard hats, a construction site) — this is the wrong category of image entirely. Fast Track is a frozen food distribution company, not a construction company. This image must be replaced.
2. **New feature:** Fast Track has confirmed real, signed distribution agreements for a list of third-party FMCG brands (same categories Prime Trading distributes — Nestle, Unilever Food Solutions, Tabasco, QBB, Fragata, Hellmann's, Royal Oak, Bavaria, Nellara, Mama, Zaffran, Sipa, American Classic, Chatura, 717, Rexoguard). This needs its own **navbar link** and its own **home page carousel section** — not just a static grid.

---

## 1. Bug Fix — Replace "Who We Are" Section Image

**Location:** Home page, "Who We Are" / "A Global Standard, Delivered Locally" section (the two-column About teaser with the image + "Brazilian Heritage" badge).

**Problem:** Current image shows a construction site (workers, rebar, hard hats) — visually unrelated to a frozen food / FMCG distribution business and likely confusing to visitors.

**Fix:** Replace with an image relevant to Fast Track's actual business — choose one of:
- A cold storage / frozen food warehouse interior (pallets, racking, visible cold-chain equipment)
- A frozen food processing or packing line
- A logistics/distribution scene (refrigerated trucks, warehouse loading bay)

Source from licensed stock (Unsplash/Pexels) or AI-generated imagery — not from primetrading.co.om. Keep the existing "Brazilian Heritage" badge overlay exactly as-is; only the underlying photo changes.

**Verification step:** Before considering this done, confirm the new image renders correctly on the deployed Vercel site (not just in local dev) — the previous pass had cases where code changes didn't show up live, so explicitly re-check after deploy.

---

## 2. New Section — "Our Brands" (Navbar Entry)

Add a new top-level navbar link: **"Our Brands"**, positioned between "Frozen Products" and "Products" (or wherever fits best in the existing nav order — use judgment, but keep it visually consistent with existing nav items).

This links to a new page: `/our-brands`.

### 2.1 `/our-brands` Page Content

- Page banner/header (consistent with other sub-pages per the existing visual-parity work — banner image relevant to FMCG distribution/retail shelves).
- Heading: "Our Brands" — subheading: "Some of the prestigious brands we work with..." (or similar; can be refined).
- Full grid of all distributed brands (the complete list below), each as a tile with brand logo + a representative product photo, dual-tile style like Prime Trading.
- This is the full/complete catalog view — the home page (Section 3 below) only needs to show a rotating subset/carousel, not necessarily all of them at once.

### 2.2 Brand List (client-confirmed — real, signed distribution agreements in place)

- Nestle
- Unilever Food Solutions
- Tabasco
- QBB
- Fragata
- Hellmann's
- Royal Oak
- Bavaria
- Nellara
- Mama
- Zaffran
- Sipa
- American Classic
- Chatura
- 717
- Rexoguard

(Do not add or remove brands from this list without explicit client confirmation.)

### 2.3 Image Sourcing for Brand Assets

Unlike general site imagery, brand logos/product photos for this section should come from each brand's **official press/media kit or official product photography** — search "[Brand name] official logo png" or "[Brand name] press kit" per brand. Do not screenshot or hot-link these from primetrading.co.om. Maintain consistent image dimensions/cropping across all tiles so the grid looks uniform despite sourcing from different brands' official assets.

---

## 3. New Section — "Our Brands" Carousel (Home Page)

In addition to the dedicated `/our-brands` page, add a **carousel section directly on the home page** so the brand partnerships are visible without requiring a click-through — this mirrors how Prime Trading shows a continuously-moving brand strip right on its homepage.

### 3.1 Placement
Position this carousel after the "Our Products" featured-products carousel (from the existing visual-parity plan) and before the "What We Do" section — i.e., in the same general area Prime Trading places its brand wall.

### 3.2 Behavior
- Horizontal, continuously auto-scrolling carousel (same calm, non-jarring motion style as the product carousel already specified in the other plan) — use `framer-motion` or `embla-carousel-react`, whichever is already installed/in use in the repo from the prior pass.
- Show brand logo tiles (logo-only is fine for this compact homepage version — the full dual-tile product+logo treatment lives on the dedicated `/our-brands` page).
- Loop continuously; pause on hover (common UX pattern for logo carousels, matches Prime Trading's behavior).
- Include a "View All Brands" link/button at the end of the section, linking to `/our-brands`.
- Ensure mobile responsiveness — swipe-friendly or simply let the auto-scroll continue on smaller screens.

### 3.3 Section Heading
"Our Brands" — "Some of the prestigious brands we work with..." (matches the dedicated page; keep consistent copy between the homepage teaser and the full page).

---

## 4. Component/Data Structure Notes

- Create a single source of truth for the brand list (e.g. a `brands.ts` data file or a Supabase table `brands` with `name`, `logo_url`, `product_image_url`, `display_order`) — both the homepage carousel and the `/our-brands` page should pull from this same source, not maintain two separate hardcoded lists.
- If using Supabase (recommended, consistent with how products already work): create a `brands` table, seed it with the 16 brands above, and store logo/product image URLs in Supabase Storage (new bucket: `brand-assets` or reuse `product-images` with a clear naming convention).
- This keeps the door open for a future admin panel to manage brands the same way products are managed.

---

## 5. Explicitly Out of Scope for This Pass

- No changes to the existing Featured Products carousel, Frozen Products page, or any other section covered in `visual-parity-fix-plan.md` — that work is tracked separately.
- No client-logo wall (separate from brands — clients are still not in scope).
- No removal or alteration of any brand from the confirmed list without client sign-off.

---

## 6. Acceptance Checklist

- [ ] "Who We Are" section image no longer shows construction workers — replaced with a relevant frozen food/warehouse/logistics image
- [ ] New "Our Brands" link appears in the navbar and routes to `/our-brands`
- [ ] `/our-brands` page displays all 16 confirmed brands in a dual-tile grid (logo + product photo)
- [ ] Home page has a new "Our Brands" carousel section, auto-scrolling, pausing on hover
- [ ] Home page carousel includes a "View All Brands" link to `/our-brands`
- [ ] Brand data comes from a single shared source (data file or Supabase table), not duplicated hardcoded lists
- [ ] All brand logos/images sourced from official brand assets, not from primetrading.co.om
- [ ] Site remains responsive on mobile after these additions
- [ ] Confirmed live on the deployed Vercel URL, not just in local dev

---

## 7. Summary for Claude Code

Fix the home page "Who We Are" section image (currently shows an unrelated construction site — replace with a frozen food/warehouse-relevant image). Then add a new "Our Brands" feature: a navbar link to a new `/our-brands` page showing all 16 client-confirmed distributed brands (Nestle, Unilever Food Solutions, Tabasco, QBB, Fragata, Hellmann's, Royal Oak, Bavaria, Nellara, Mama, Zaffran, Sipa, American Classic, Chatura, 717, Rexoguard) in a dual-tile grid, plus a matching auto-scrolling brand-logo carousel directly on the home page with a "View All Brands" link. Source brand logos/images from each brand's official assets, not from the competitor site. Keep this work independent of the existing visual-parity-fix-plan.md — do not modify that file or its already-planned sections.