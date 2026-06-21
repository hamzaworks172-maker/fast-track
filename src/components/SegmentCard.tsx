import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface SegmentCardProps {
  icon: LucideIcon
  title: string
  description: string
  href?: string
  imageSrc?: string
}

export default function SegmentCard({ icon: Icon, title, description, href, imageSrc }: SegmentCardProps) {
  if (imageSrc) {
    return (
      <div className="relative rounded-2xl overflow-hidden shadow-sm group min-h-72 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-0 p-7 flex flex-col justify-end">
          <div className="w-10 h-10 rounded-lg bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center mb-4">
            <Icon size={20} className="text-brand-gold" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/75 text-sm leading-relaxed">{description}</p>
          {href && (
            <Link
              href={href}
              className="mt-4 inline-flex items-center gap-1.5 text-brand-gold font-semibold text-sm hover:gap-2.5 transition-all"
            >
              Learn more <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group border border-neutral-200/60">
      <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-5">
        <Icon size={24} className="text-brand-green" />
      </div>
      <h3 className="text-xl font-bold text-charcoal mb-3">{title}</h3>
      <p className="text-charcoal-light text-sm leading-relaxed">{description}</p>
      {href && (
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 text-brand-green font-semibold text-sm hover:gap-2.5 transition-all"
        >
          Learn more <ArrowRight size={14} />
        </Link>
      )}
    </div>
  )
}
