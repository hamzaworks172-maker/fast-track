import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Snowflake } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Explore the Fast Track Food Stuff LLC product range — premium frozen foods and more, available for HORECA, retail, and wholesale in Oman.',
}

export default function ProductsPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 bg-brand-green relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full border border-white/5" />
        </div>
        <div className="section-container relative z-10">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Products
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Brands &amp; Products
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Our growing product range — from frozen proteins and potato products to an expanding portfolio of food essentials.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-neutral-base" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Current range */}
      <section className="py-20 bg-neutral-base">
        <div className="section-container">
          <SectionHeading
            eyebrow="Current Range"
            title="Our Growing Product Portfolio"
            subtitle="Fast Track Food Stuff LLC currently focuses on premium frozen products, with our range expanding as we grow our presence in the Omani market."
          />

          {/* Frozen products card */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-green rounded-3xl p-10 text-white flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                <Snowflake size={28} className="text-brand-gold" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Frozen Products</h2>
              <p className="text-white/70 leading-relaxed flex-1">
                Our flagship category — premium frozen proteins, potato products, and more. Sourced with Brazilian quality standards and flash-frozen for maximum freshness.
              </p>
              <Link
                href="/frozen-products"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-green-dark font-bold rounded-xl hover:bg-brand-gold-light transition-colors w-fit"
              >
                View Products <ArrowRight size={16} />
              </Link>
            </div>

            {/* Placeholder for future brand carousel */}
            {/* TODO: Brand-partner logo carousel component can be dropped in here in Phase 2 */}
            <div className="bg-white rounded-3xl p-10 border border-neutral-200/60 flex flex-col items-center justify-center text-center min-h-64">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-4">
                <span className="text-brand-gold text-2xl font-bold">+</span>
              </div>
              <h2 className="text-xl font-bold text-charcoal mb-2">More Coming Soon</h2>
              <p className="text-charcoal-light text-sm leading-relaxed max-w-xs">
                We&apos;re continuously expanding our product range and brand partnerships. Get in touch to discuss your specific product requirements.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-brand-green border border-brand-green rounded-xl font-semibold text-sm hover:bg-brand-green hover:text-white transition-colors"
              >
                Contact Us <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-brand-green/5 rounded-3xl p-10 border border-brand-green/10">
            <div>
              <h2 className="text-2xl font-bold text-charcoal">Looking for something specific?</h2>
              <p className="text-charcoal-light mt-2">
                Get in touch — we&apos;ll let you know what we have available and what&apos;s coming.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-green text-white font-semibold rounded-xl hover:bg-brand-green-light transition-colors whitespace-nowrap flex-shrink-0"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
