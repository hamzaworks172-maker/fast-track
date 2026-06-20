import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface SegmentCardProps {
  icon: LucideIcon
  title: string
  description: string
  href?: string
}

export default function SegmentCard({ icon: Icon, title, description, href }: SegmentCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow group border border-neutral-200/60">
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
