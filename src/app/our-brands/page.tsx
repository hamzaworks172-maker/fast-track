import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Package } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { brands } from '@/data/brands'

export const metadata: Metadata = {
  title: 'Our Brands',
  description:
    'Fast Track Food Stuff LLC distributes a prestigious portfolio of international FMCG brands across Oman — including Nestlé, Unilever Food Solutions, Tabasco, Hellmann\'s, and more.',
}

export default function OurBrandsPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-72">
        <div className="absolute inset-0">
          <Image
            src="/images/about/brands-header.jpg"
            alt="FMCG brand products for distribution"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-green/80" />
        </div>
        <div className="section-container relative z-10">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Distribution Partners
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Brands
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Some of the prestigious brands we are proud to distribute — backed by signed distribution agreements and a commitment to quality at every step.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-neutral-base" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Brands grid */}
      <section className="py-20 bg-neutral-base">
        <div className="section-container">
          <div className="mb-12">
            <SectionHeading
              eyebrow={`${brands.length} brands`}
              title="International FMCG Partners"
              subtitle="We hold confirmed distribution agreements for all brands listed below. Contact us to enquire about product availability, pricing, or bulk orders."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            {brands.map((brand) => {
              const initials = brand.name
                .split(/[\s&']+/)
                .filter(Boolean)
                .slice(0, 2)
                .map(w => w[0].toUpperCase())
                .join('')

              return (
                <div
                  key={brand.id}
                  className="flex overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Logo panel */}
                  <div className="w-36 sm:w-44 flex-shrink-0 bg-brand-green flex flex-col items-center justify-center gap-2 p-4">
                    <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
                      <span className="text-xl font-bold text-white leading-none">{initials}</span>
                    </div>
                    <span className="text-white/70 text-xs font-medium text-center leading-tight">
                      {brand.category}
                    </span>
                  </div>

                  {/* Info panel */}
                  <div className="flex-1 p-5 flex flex-col justify-center gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-charcoal text-lg leading-snug">{brand.name}</h3>
                      <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-brand-green/10 flex items-center justify-center">
                        <Package size={11} className="text-brand-green" />
                      </span>
                    </div>
                    <p className="text-sm text-charcoal-light leading-relaxed">
                      {brand.description}
                    </p>
                    <div className="mt-1">
                      <span className="inline-block text-xs font-semibold text-brand-green bg-brand-green/8 rounded-full px-3 py-1">
                        {brand.category}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="bg-brand-green rounded-3xl p-10 md:p-16 text-center">
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Ready to Order?
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Enquire About Brand Availability
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              All brands above are available for supply in Oman. Reach out to discuss product range, pricing, and delivery options for your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-green-dark font-bold rounded-xl hover:bg-brand-gold-light transition-colors"
            >
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
