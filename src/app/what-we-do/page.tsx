import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChefHat, Store, Truck, CheckCircle } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'Fast Track Food Stuff LLC supplies HORECA, retail, and wholesale businesses across Oman with premium frozen food products and reliable cold-chain distribution.',
}

const segments = [
  {
    icon: ChefHat,
    id: 'horeca',
    title: 'HORECA',
    subtitle: 'Hotels, Restaurants & Catering',
    image: '/images/segments/horeca.jpg',
    description:
      'Professional kitchens demand consistency, reliability, and quality that holds up under high-volume cooking. We supply hotels, restaurants, and catering operations across Oman with frozen proteins, fries, and other staple products — ensuring your menu stays consistent regardless of season or market fluctuation.',
    highlights: [
      'Bulk pack sizes suited for professional use',
      'Consistent quality batch after batch',
      'Flexible ordering to match kitchen volume',
      'Cold-chain delivery to your door',
    ],
  },
  {
    icon: Store,
    id: 'retail',
    title: 'Retail',
    subtitle: 'Supermarkets & Grocery Outlets',
    image: '/images/segments/retail.jpg',
    description:
      'For retail partners, product appearance, shelf stability, and packaging integrity are everything. Our frozen products are packaged for consumer appeal, clearly labelled, and delivered in shelf-ready condition — making restocking fast and reducing shrinkage from handling.',
    highlights: [
      'Consumer-ready packaging',
      'Clear labelling and product information',
      'Shelf-stable supply with consistent delivery schedules',
      'Minimal handling damage thanks to robust outer packaging',
    ],
  },
  {
    icon: Truck,
    id: 'wholesale',
    title: 'Wholesale',
    subtitle: 'Bulk Distribution & Large-Volume Buyers',
    image: '/images/segments/wholesale.jpg',
    description:
      'For distributors and large-volume buyers, we offer bulk ordering with full cold-chain logistics. Our wholesale operation is built around efficiency — minimising lead times and ensuring stock availability so your supply chain doesn\'t skip a beat.',
    highlights: [
      'Competitive bulk pricing',
      'Large-volume stock availability',
      'End-to-end cold-chain handling',
      'Flexible delivery scheduling',
    ],
  },
]

export default function WhatWeDoPage() {
  return (
    <>
      {/* Page header — with background image */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-72">
        <div className="absolute inset-0">
          <Image
            src="/images/segments/horeca.jpg"
            alt="Restaurant kitchen"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-green/80" />
        </div>
        <div className="section-container relative z-10">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
            What We Do
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Supply Solutions for Every Channel
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            From hotel kitchens to supermarket shelves and bulk distribution hubs — we have a tailored supply approach for each segment.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-neutral-base" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Segment blocks — alternating image/text */}
      <section className="py-20 bg-neutral-base">
        <div className="section-container space-y-24">
          {segments.map(({ icon: Icon, id, title, subtitle, image, description, highlights }, index) => (
            <div
              key={id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}
            >
              {/* Image side */}
              <div className={index % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/40 to-transparent" />
                  <div className="absolute bottom-5 left-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center">
                      <Icon size={20} className="text-brand-green-dark" />
                    </div>
                    <span className="text-white font-bold text-lg">{title}</span>
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className={index % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                <SectionHeading
                  eyebrow={title}
                  title={subtitle}
                />
                <p className="mt-6 text-charcoal-light leading-relaxed">{description}</p>
                <ul className="mt-6 space-y-3">
                  {highlights.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-brand-green flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white font-semibold rounded-xl hover:bg-brand-green-light transition-colors"
                  >
                    Enquire Now <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product CTA */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-neutral-base rounded-3xl p-10">
            <div>
              <h2 className="text-2xl font-bold text-charcoal">Browse Our Frozen Products</h2>
              <p className="text-charcoal-light mt-2">
                See the full range currently available for HORECA, retail, and wholesale supply.
              </p>
            </div>
            <Link
              href="/frozen-products"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-green text-white font-semibold rounded-xl hover:bg-brand-green-light transition-colors whitespace-nowrap flex-shrink-0"
            >
              View Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
