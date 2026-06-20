import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  href?: string
}

export default function ProductCard({ product, href }: ProductCardProps) {
  const cardHref = href ?? `/frozen-products/${product.slug}`

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-brand-green/10 overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-green to-brand-green-light">
            <span className="text-5xl font-bold text-white/20 uppercase">
              {product.name.slice(0, 2)}
            </span>
          </div>
        )}
        {product.unit && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-brand-green text-white text-xs font-medium rounded-full">
            {product.unit}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-charcoal text-lg mb-2 leading-tight">{product.name}</h3>
        {product.description && (
          <p className="text-charcoal-light text-sm leading-relaxed line-clamp-3 flex-1">
            {product.description}
          </p>
        )}
        <Link
          href={cardHref}
          className="mt-4 inline-flex items-center gap-1.5 text-brand-green font-semibold text-sm hover:gap-2.5 transition-all group/link"
        >
          View Details
          <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
