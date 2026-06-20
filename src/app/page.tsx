import Link from 'next/link'
import { ArrowRight, ChefHat, Store, Truck } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/ProductCard'
import SectionHeading from '@/components/SectionHeading'
import SegmentCard from '@/components/SegmentCard'
import type { Product } from '@/types'

export const revalidate = 60

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
      .limit(4)
    return data ?? []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-green">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full border border-white/5" />
          <div className="absolute -top-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full border border-white/5" />
          <div className="absolute bottom-0 -left-1/4 w-[40vw] h-[40vw] rounded-full bg-brand-green-dark/50" />
        </div>

        <div className="section-container relative z-10 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              <span className="text-brand-gold text-sm font-medium">Brazil · Oman · Quality</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
              Premium Frozen Foods
              <span className="block text-brand-gold mt-1">For Your Business</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Brazilian expertise meets Omani excellence. We supply HORECA, retail, and wholesale customers with consistent, high-quality frozen food products across the Sultanate of Oman.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/frozen-products"
                className="inline-flex items-center gap-2 px-7 py-4 bg-brand-gold text-brand-green-dark font-bold rounded-xl hover:bg-brand-gold-light transition-colors"
              >
                Explore Products
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white/60 hover:bg-white/5 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 80" className="w-full fill-neutral-base" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-20 bg-neutral-base">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Who We Are"
                title="A Global Standard, Delivered Locally"
                subtitle="Fast Track Food Stuff LLC is a Brazilian-based company with an official franchise presence in the Sultanate of Oman, bringing international food quality standards and expertise in frozen food processing to local businesses."
              />
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white font-semibold rounded-xl hover:bg-brand-green-light transition-colors"
                >
                  Know More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '4+', label: 'Product Lines' },
                { value: '3', label: 'Market Segments' },
                { value: '100%', label: 'Cold-Chain Handled' },
                { value: '1', label: 'Official Franchise, Oman' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/60 text-center"
                >
                  <p className="text-3xl font-bold text-brand-green">{value}</p>
                  <p className="text-sm text-charcoal-light mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="What We Do"
            title="Serving Every Channel"
            subtitle="From hotel kitchens to retail shelves and bulk distribution, we have the right supply solution for your business."
            centered
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <SegmentCard
              icon={ChefHat}
              title="HORECA"
              description="Supplying hotels, restaurants, and catering businesses with consistent, high-quality frozen products built for professional kitchen demands."
              href="/what-we-do"
            />
            <SegmentCard
              icon={Store}
              title="Retail"
              description="Supporting supermarkets and retail outlets with reliable stock and packaging suited for shelf display and consumer appeal."
              href="/what-we-do"
            />
            <SegmentCard
              icon={Truck}
              title="Wholesale"
              description="Bulk distribution backed by efficient cold-chain logistics and storage — scalable supply for large-volume buyers."
              href="/what-we-do"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-neutral-base">
          <div className="section-container">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <SectionHeading
                eyebrow="Our Products"
                title="Frozen Products"
                subtitle="Flash-frozen to lock in quality — ready for your kitchen or shelf."
              />
              <Link
                href="/frozen-products"
                className="inline-flex items-center gap-2 text-brand-green font-semibold text-sm whitespace-nowrap hover:gap-3 transition-all"
              >
                View all <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-20 bg-brand-green">
        <div className="section-container text-center">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Ready to Order?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let&apos;s Talk About Your Requirements
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
            Whether you&apos;re a restaurant, supermarket, or distributor — reach out and we&apos;ll find the right supply solution for you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-green-dark font-bold rounded-xl hover:bg-brand-gold-light transition-colors"
            >
              Get in Touch <ArrowRight size={18} />
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I would like to inquire about your products')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white/60 hover:bg-white/5 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
