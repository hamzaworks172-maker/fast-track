import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/what-we-do', label: 'What We Do' },
  { href: '/frozen-products', label: 'Frozen Products' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-green-dark text-white">
      <div className="section-container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-brand-gold flex items-center justify-center font-bold text-brand-green-dark text-sm">
                FT
              </div>
              <span className="text-white font-bold text-lg leading-tight">
                Fast Track
                <span className="block text-brand-gold text-xs font-normal tracking-widest uppercase">
                  Food Stuff LLC
                </span>
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              A Brazilian-based company with an official franchise presence in the Sultanate of Oman, delivering premium frozen foods to HORECA, retail, and wholesale customers.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:fasttrackfoodstuffllc@gmail.com"
                  className="flex items-start gap-2 text-white/70 text-sm hover:text-white transition-colors"
                >
                  <Mail size={15} className="mt-0.5 flex-shrink-0 text-brand-gold" />
                  fasttrackfoodstuffllc@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+96895219203"
                  className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
                >
                  <Phone size={15} className="flex-shrink-0 text-brand-gold" />
                  +968 95219203
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} Fast Track Food Stuff LLC. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">Sultanate of Oman</p>
        </div>
      </div>
    </footer>
  )
}
