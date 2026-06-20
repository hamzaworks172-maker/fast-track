interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md'
}

export default function Logo({ variant = 'light', size = 'md' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-brand-green-dark'
  const subtitleColor = variant === 'light' ? 'text-brand-gold' : 'text-brand-gold'
  const iconSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'
  const textSize = size === 'sm' ? 'text-base' : 'text-lg'

  return (
    <div className="flex items-center gap-2.5">
      {/* Icon mark */}
      <div className={`${iconSize} flex-shrink-0 relative`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Hexagonal background */}
          <path
            d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
            fill="#D9A441"
          />
          {/* Snowflake / star centre */}
          <line x1="20" y1="10" x2="20" y2="30" stroke="#144830" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="10" y1="15" x2="30" y2="25" stroke="#144830" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="15" x2="10" y2="25" stroke="#144830" strokeWidth="2.5" strokeLinecap="round" />
          {/* Dots at tips */}
          <circle cx="20" cy="10" r="2" fill="#144830" />
          <circle cx="20" cy="30" r="2" fill="#144830" />
          <circle cx="10" cy="15" r="2" fill="#144830" />
          <circle cx="30" cy="25" r="2" fill="#144830" />
          <circle cx="30" cy="15" r="2" fill="#144830" />
          <circle cx="10" cy="25" r="2" fill="#144830" />
        </svg>
      </div>

      {/* Wordmark */}
      <div>
        <p className={`${textColor} font-bold ${textSize} leading-tight`}>Fast Track</p>
        <p className={`${subtitleColor} text-[10px] font-semibold tracking-widest uppercase leading-tight`}>
          Food Stuff LLC
        </p>
      </div>
    </div>
  )
}
