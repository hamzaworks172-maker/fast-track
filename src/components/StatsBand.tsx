'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Package, LayoutGrid, Thermometer, Award } from 'lucide-react'

const stats = [
  { icon: Package, value: 4, suffix: '+', label: 'Product Lines' },
  { icon: LayoutGrid, value: 3, suffix: '', label: 'Market Segments' },
  { icon: Thermometer, value: 100, suffix: '%', label: 'Cold-Chain Handled' },
  { icon: Award, value: 1, suffix: '', label: 'Official Franchise, Oman' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const duration = 1200
    const steps = 40
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function StatsBand() {
  return (
    <section className="relative py-20 bg-brand-green-dark overflow-hidden">
      {/* Background image at low opacity */}
      <div className="absolute inset-0">
        <Image
          src="/images/about/stats-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-gold/20 flex items-center justify-center mx-auto mb-4">
                <Icon size={24} className="text-brand-gold" />
              </div>
              <p className="text-4xl font-bold text-white mb-1">
                <CountUp target={value} suffix={suffix} />
              </p>
              <p className="text-white/60 text-sm leading-snug">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
