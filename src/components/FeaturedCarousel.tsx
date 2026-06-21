'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'
import type { Product } from '@/types'

const GAP = 24

export default function FeaturedCarousel({ products }: { products: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const [perView, setPerView] = useState(1)
  const touchStartX = useRef(0)

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      const pv = w >= 1024 ? 3 : w >= 640 ? 2 : 1
      setPerView(pv)
      setCardWidth((w - GAP * (pv - 1)) / pv)
    }
    measure()
    const ro = new ResizeObserver(measure)
    const el = containerRef.current
    if (el) ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const maxIndex = Math.max(0, products.length - perView)

  const next = useCallback(() => {
    setIndex(i => (i >= maxIndex ? 0 : i + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setIndex(i => Math.max(i - 1, 0))
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  const trackX = cardWidth > 0 ? -(index * (cardWidth + GAP)) : 0

  return (
    <div ref={containerRef}>
      <div
        className="overflow-hidden"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const diff = touchStartX.current - e.changedTouches[0].clientX
          if (diff > 50) next()
          else if (diff < -50) prev()
        }}
      >
        <motion.div
          className="flex"
          style={{ gap: GAP }}
          animate={{ x: trackX }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={cardWidth > 0 ? { width: cardWidth, flexShrink: 0 } : { flex: '1 1 0', minWidth: 0 }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to position ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-7 h-2 bg-brand-green'
                  : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <motion.button
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center text-charcoal-light hover:border-brand-green hover:text-brand-green transition-colors disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </motion.button>
          <motion.button
            onClick={next}
            aria-label="Next"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center text-charcoal-light hover:border-brand-green hover:text-brand-green transition-colors"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
