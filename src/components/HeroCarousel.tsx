'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const slides = [
  {
    image: '/images/hero/slide-1-warehouse.jpg',
    eyebrow: 'Brazil · Oman · Quality',
    heading: 'Premium Frozen Foods',
    headingAccent: 'For Your Business',
    body: 'Brazilian expertise meets Omani excellence. We supply HORECA, retail, and wholesale customers with consistent, high-quality frozen food products across the Sultanate of Oman.',
    cta: { label: 'Explore Products', href: '/frozen-products' },
    cta2: { label: 'Contact Us', href: '/contact' },
  },
  {
    image: '/images/hero/slide-2-chicken.jpg',
    eyebrow: 'Finest Frozen Products',
    heading: 'Quality You Can',
    headingAccent: 'Taste in Every Bite',
    body: 'From premium chicken breast to perfectly cut fries — flash-frozen at peak freshness to lock in quality, texture, and flavour for your kitchen or shelf.',
    cta: { label: 'View Products', href: '/frozen-products' },
    cta2: { label: 'What We Do', href: '/what-we-do' },
  },
  {
    image: '/images/hero/slide-3-fries.jpg',
    eyebrow: 'HORECA Specialists',
    heading: 'Premium Supplies for',
    headingAccent: 'Hotels & Restaurants',
    body: 'Professional kitchens demand consistency. We deliver reliable frozen food products built for high-volume cooking — every order, every time.',
    cta: { label: 'Get in Touch', href: '/contact' },
    cta2: { label: 'Our Products', href: '/frozen-products' },
  },
  {
    image: '/images/hero/slide-4-kitchen.jpg',
    eyebrow: 'Cold-Chain Specialists',
    heading: 'End-to-End Cold',
    headingAccent: 'Chain Integrity',
    body: 'From processing facility to your door — we maintain unbroken cold-chain handling on every delivery across the Sultanate of Oman.',
    cta: { label: 'Explore Products', href: '/frozen-products' },
    cta2: { label: 'Contact Us', href: '/contact' },
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  const pauseAuto = () => setIsAutoPlaying(false)

  return (
    <section className="relative min-h-screen overflow-hidden bg-brand-green-dark">
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].heading}
            fill
            priority={current === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="section-container pt-24 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/50 bg-brand-gold/10 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <span className="text-brand-gold text-sm font-medium">
                  {slides[current].eyebrow}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
                {slides[current].heading}
                <span className="block text-brand-gold mt-1">
                  {slides[current].headingAccent}
                </span>
              </h1>

              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                {slides[current].body}
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href={slides[current].cta.href}
                    className="inline-flex items-center gap-2 px-7 py-4 bg-brand-gold text-brand-green-dark font-bold rounded-xl hover:bg-brand-gold-light transition-colors"
                  >
                    {slides[current].cta.label}
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href={slides[current].cta2.href}
                    className="inline-flex items-center gap-2 px-7 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:border-white/70 hover:bg-white/10 transition-colors"
                  >
                    {slides[current].cta2.label}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 inset-x-0 z-10">
        <div className="section-container flex items-center justify-between">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); pauseAuto() }}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-8 h-2 bg-brand-gold'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev/Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => { prev(); pauseAuto() }}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => { next(); pauseAuto() }}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <svg viewBox="0 0 1440 80" className="w-full fill-neutral-base" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  )
}
