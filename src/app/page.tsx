import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChefHat, Store, Truck } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/ProductCard'
import SectionHeading from '@/components/SectionHeading'
import SegmentCard from '@/components/SegmentCard'
import HeroCarousel from '@/components/HeroCarousel'
import StatsBand from '@/components/StatsBand'
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
      {/* Hero — rotating image carousel */}
      <HeroCarousel />

      {/* About teaser — two-column with image */}
      <section className="py-20 bg-neutral-base">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about/warehouse.jpg"
                  alt="Fast Track cold storage warehouse operations"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/30 to-transparent" />
              </div>
              {/* Badge overlay */}
              <div className="absolute -bottom-5 -right-4 w-28 h-28 rounded-full bg-brand-gold flex flex-col items-center justify-center text-brand-green-dark shadow-lg border-4 border-neutral-base">
                <span className="text-xs font-semibold uppercase tracking-widest leading-tight text-center">Brazilian</span>
                <span className="text-xs font-bold uppercase tracking-widest leading-tight text-center">Heritage</span>
              </div>
            </div>

            {/* Text side */}
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
          </div>
        </div>
      </section>

      {/* Stats band */}
      <StatsBand />

      {/* What We Do — image background cards */}
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
              imageSrc="/images/segments/horeca.jpg"
            />
            <SegmentCard
              icon={Store}
              title="Retail"
              description="Supporting supermarkets and retail outlets with reliable stock and packaging suited for shelf display and consumer appeal."
              href="/what-we-do"
              imageSrc="/images/segments/retail.jpg"
            />
            <SegmentCard
              icon={Truck}
              title="Wholesale"
              description="Bulk distribution backed by efficient cold-chain logistics and storage — scalable supply for large-volume buyers."
              href="/what-we-do"
              imageSrc="/images/segments/wholesale.jpg"
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

      {/* Contact CTA — with subtle background image */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about/warehouse.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-brand-green/90" />
        </div>
        <div className="relative z-10 section-container text-center">
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
