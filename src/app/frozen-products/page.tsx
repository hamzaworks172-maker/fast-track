import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/ProductCard'
import SectionHeading from '@/components/SectionHeading'
import type { Product } from '@/types'

export const metadata: Metadata = {
  title: 'Frozen Products',
  description:
    'Browse Fast Track Food Stuff LLC\'s full range of premium frozen products — chicken breast, beef mince, crinkle fries, and more. Available for HORECA, retail, and wholesale in Oman.',
}

export const revalidate = 60

async function getFrozenProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select('*, categories!inner(slug)')
      .eq('is_active', true)
      .eq('categories.slug', 'frozen-products')
      .order('display_order', { ascending: true })
    return data ?? []
  } catch {
    return []
  }
}

export default async function FrozenProductsPage() {
  const products = await getFrozenProducts()

  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 bg-brand-green relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full border border-white/5" />
        </div>
        <div className="section-container relative z-10">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Our Products
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frozen Products
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Flash-frozen at peak freshness to preserve quality, texture, and flavour — ready for your kitchen or shelf.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-neutral-base" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-20 bg-neutral-base">
        <div className="section-container">
          {products.length > 0 ? (
            <>
              <SectionHeading
                eyebrow={`${products.length} product${products.length !== 1 ? 's' : ''} available`}
                title="Our Frozen Range"
                subtitle="All products are available for HORECA, retail, and wholesale supply. Contact us to discuss pricing and pack sizes."
              />
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="text-charcoal-light text-lg">Products coming soon.</p>
              <p className="text-charcoal-light/60 text-sm mt-2">
                Contact us directly to enquire about available stock.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
