import CustomCursor from '@/components/custom-cursor'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const avenir = localFont({
  src: [
    {
      path: './fonts/Avenir-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Avenir-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Avenir-Heavy.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-avenir',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Iyasu - Heal Simply, Live Fully',
  description: 'Natural healing products for pain relief and stress management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${avenir.variable} ${poppins.variable}`}>
      <body className="font-avenir">
        <Navbar />
        {children}
        <Footer />
        <CustomCursor />
      </body>
    </html>
  )
}