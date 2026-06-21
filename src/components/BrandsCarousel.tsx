'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import AnimatedSection from './AnimatedSection'
import type { Brand } from '@/data/brands'

function BrandTile({ brand }: { brand: Brand }) {
  const initials = brand.name
    .split(/[\s&']+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')

  return (
    <div className="flex-shrink-0 w-40 h-24 bg-white border border-neutral-200 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1 px-3 hover:shadow-md hover:border-brand-green/30 transition-all duration-300 select-none">
      <span className="text-xl font-bold text-brand-green leading-none">{initials}</span>
      <span className="text-xs font-semibold text-charcoal-light text-center leading-tight line-clamp-2">
        {brand.name}
      </span>
    </div>
  )
}

export default function BrandsCarousel({ brands }: { brands: Brand[] }) {
  const doubled = [...brands, ...brands]

  return (
    <section className="py-20 bg-neutral-base overflow-hidden">
      <div className="section-container mb-10">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading
              eyebrow="Our Partners"
              title="Our Brands"
              subtitle="Some of the prestigious brands we work with — distributed across Oman with care and quality."
            />
            <Link
              href="/our-brands"
              className="inline-flex items-center gap-2 text-brand-green font-semibold text-sm whitespace-nowrap hover:gap-3 transition-all"
            >
              View All Brands <ArrowRight size={15} />
            </Link>
          </div>
        </AnimatedSection>
      </div>

      {/* Marquee track */}
      <div className="brands-marquee-wrapper">
        <div className="brands-marquee-track">
          {doubled.map((brand, i) => (
            <BrandTile key={`${brand.id}-${i}`} brand={brand} />
          ))}
        </div>
      </div>

      <div className="section-container mt-8 text-center">
        <Link
          href="/our-brands"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-green text-brand-green font-semibold rounded-xl hover:bg-brand-green hover:text-white transition-colors"
        >
          View All Brands <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
