'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/types'

export default function ProductTileGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
          className="group"
        >
          <Link href={`/frozen-products/${product.slug}`} className="block">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green to-brand-green-light flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/20 uppercase">
                    {product.name.slice(0, 2)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4">
                <p className="text-white font-semibold text-sm leading-tight">{product.name}</p>
                {product.unit && (
                  <p className="text-white/70 text-xs mt-0.5">{product.unit}</p>
                )}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
