'use client'

import { useSearchParams } from 'next/navigation'
import ContactForm from '@/components/ContactForm'

export default function ContactFormWrapper() {
  const searchParams = useSearchParams()
  const product = searchParams.get('product')
  const defaultSubject = product ? `Enquiry about ${product}` : undefined

  return <ContactForm defaultSubject={defaultSubject} />
}
