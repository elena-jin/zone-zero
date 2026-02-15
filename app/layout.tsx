import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'

import './globals.css'

const _jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-inter' })
const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'ZONEZERO | LE-100 Advanced Fire Analysis',
  description: 'California LE-100 Compliant AI Inspection Engine. Visualize fire-safe Zone 0 designs for your property.',
}

export const viewport: Viewport = {
  themeColor: '#030303',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_jakarta.variable} ${_spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
