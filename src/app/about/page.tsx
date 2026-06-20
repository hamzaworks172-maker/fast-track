import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Globe, Award, Leaf, Users } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Fast Track Food Stuff LLC — a Brazilian-based company with an official franchise presence in the Sultanate of Oman, bringing global food quality standards to local businesses.',
}

const values = [
  {
    icon: Globe,
    title: 'Global Expertise',
    description:
      'Rooted in Brazilian frozen food expertise, we bring international processing standards and supply-chain know-how to every product we distribute in Oman.',
  },
  {
    icon: Award,
    title: 'Quality First',
    description:
      'Every product in our range is sourced, handled, and delivered with strict quality controls to maintain freshness, texture, and nutritional integrity.',
  },
  {
    icon: Leaf,
    title: 'Cold-Chain Integrity',
    description:
      'From the processing facility to your kitchen or shelf, we maintain unbroken cold-chain handling — no compromises on temperature or product condition.',
  },
  {
    icon: Users,
    title: 'Partnership Approach',
    description:
      'We work as a long-term supply partner, not just a vendor. Consistent stock availability and responsive support are at the heart of how we operate.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 bg-brand-green relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full border border-white/5" />
        </div>
        <div className="section-container relative z-10">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Who We Are
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            A Brazilian-based company with an official franchise presence in the Sultanate of Oman — bridging global food quality with local business needs.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-neutral-base" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-neutral-base">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="Brazilian Roots, Omani Excellence"
              />
              <div className="mt-6 space-y-4 text-charcoal-light leading-relaxed">
                <p>
                  Fast Track Food Stuff LLC was established as the official franchise arm of a Brazilian food company in the Sultanate of Oman. This unique positioning means we combine decades of frozen food processing expertise from Brazil with a deep understanding of the Omani market and its specific needs.
                </p>
                <p>
                  Brazil is one of the world&apos;s leading frozen food producers — known for rigorous processing standards, large-scale cold-chain infrastructure, and unmatched expertise in protein and potato products. We bring that same standard to every delivery we make in Oman.
                </p>
                <p>
                  Our mission is straightforward: deliver high-quality, reliable frozen and wholesale food products to HORECA operators, retail chains, and wholesale buyers across Oman — with the consistency and supply security that serious food businesses demand.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white font-semibold rounded-xl hover:bg-brand-green-light transition-colors"
                >
                  Work With Us <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  value: 'Brazilian',
                  label: 'Origin & Expertise',
                  detail: 'Rooted in one of the world\'s top frozen food markets.',
                },
                {
                  value: 'Oman',
                  label: 'Official Franchise',
                  detail: 'Authorized franchise and distribution operation in the Sultanate.',
                },
                {
                  value: 'HORECA',
                  label: 'Primary Market',
                  detail: 'Hotels, restaurants, and catering — our core supply focus.',
                },
                {
                  value: '100%',
                  label: 'Cold-Chain Handled',
                  detail: 'End-to-end temperature-controlled delivery on every order.',
                },
              ].map(({ value, label, detail }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/60"
                >
                  <p className="text-2xl font-bold text-brand-green">{value}</p>
                  <p className="font-semibold text-charcoal text-sm mt-1">{label}</p>
                  <p className="text-charcoal-light text-sm mt-2 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Our Values"
            title="What We Stand For"
            centered
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-neutral-200/60 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-brand-green" />
                </div>
                <h3 className="font-bold text-charcoal mb-2">{title}</h3>
                <p className="text-sm text-charcoal-light leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neutral-base">
        <div className="section-container">
          <div className="bg-brand-green rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Partner With Us?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Reach out to discuss your supply requirements and discover how Fast Track Food Stuff LLC can serve your business.
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
