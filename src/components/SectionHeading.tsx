interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${light ? 'text-brand-gold' : 'text-brand-green'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold leading-tight ${light ? 'text-white' : 'text-charcoal'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-charcoal-light'}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-12 rounded bg-brand-gold ${centered ? 'mx-auto' : ''}`} />
    </div>
  )
}
