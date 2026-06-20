import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Fast Track Food Stuff LLC — Premium Frozen Foods, Oman',
    template: '%s | Fast Track Food Stuff LLC',
  },
  description:
    'Fast Track Food Stuff LLC is a Brazilian-based company with an official franchise presence in Oman, supplying premium frozen foods to HORECA, retail, and wholesale customers.',
  keywords: ['frozen food', 'wholesale food', 'HORECA Oman', 'food supplier Oman', 'chicken breast', 'frozen fries'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-neutral-base text-charcoal antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
