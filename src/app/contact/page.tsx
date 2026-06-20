import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import ContactFormWrapper from './ContactFormWrapper'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Fast Track Food Stuff LLC — call, email, or fill in our contact form to discuss your frozen food supply requirements in Oman.',
}

export default function ContactPage() {
  return (
    <>
      {/* Page header — with background image */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-72">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/slide-4-kitchen.jpg"
            alt="Professional kitchen"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-green/80" />
        </div>
        <div className="section-container relative z-10">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Have a question, or ready to place an order? Reach out — we&apos;ll get back to you promptly.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-neutral-base" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 bg-neutral-base">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-1 space-y-6">
              <SectionHeading
                eyebrow="Contact Info"
                title="Let's Talk"
                subtitle="We typically respond within one business day."
              />

              <div className="mt-8 space-y-4">
                <a
                  href="mailto:fasttrackfoodstuffllc@gmail.com"
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-neutral-200/60 hover:border-brand-green/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green/20 transition-colors">
                    <Mail size={18} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-0.5">Email</p>
                    <p className="text-sm text-charcoal font-medium break-all">
                      fasttrackfoodstuffllc@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+96895219203"
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-neutral-200/60 hover:border-brand-green/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green/20 transition-colors">
                    <Phone size={18} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-0.5">Phone / WhatsApp</p>
                    <p className="text-sm text-charcoal font-medium">+968 95219203</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-neutral-200/60">
                  <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-0.5">Location</p>
                    <p className="text-sm text-charcoal font-medium">Sultanate of Oman</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp shortcut */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I would like to enquire about your products')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 bg-[#25D366] text-white rounded-xl font-semibold text-sm hover:bg-[#22c35e] transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-neutral-200/60">
              <h2 className="text-xl font-bold text-charcoal mb-6">Send Us a Message</h2>
              <Suspense fallback={null}>
                <ContactFormWrapper />
              </Suspense>
            </div>
          </div>

          {/* Map embed */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-charcoal mb-4">Find Us</h2>
            <div className="rounded-2xl overflow-hidden shadow-sm border border-neutral-200/60 h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7410609.082082178!2d54.77842835!3d21.47325785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91848e7b9c9ad1%3A0xf0fd60ea62eaa9f0!2sOman!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Oman map"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
