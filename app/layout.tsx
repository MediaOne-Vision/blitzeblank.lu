import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Blitzeblank | Professionelle Reinigungsdienstleistungen in Luxemburg',
  description: 'Blitzeblank bietet professionelle Industrie-, Fenster-, Trockeneis-, Stein- und Fassadenreinigung in Luxemburg. Schnelle Reaktionszeit, kostenloser Besichtigungstermin und transparente Kommunikation.',
  keywords: ['Reinigungsfirma Luxemburg', 'Industriereinigung', 'Fensterreinigung', 'Trockeneisreinigung', 'Steinreinigung', 'Fassadenreinigung', 'Gewerbereinigung'],
  authors: [{ name: 'Blitzeblank' }],
  openGraph: {
    title: 'Blitzeblank | Professionelle Reinigungsdienstleistungen',
    description: 'Ihr Partner für professionelle Reinigung in Luxemburg',
    type: 'website',
    locale: 'de_LU',
  },
}

export const viewport: Viewport = {
  themeColor: '#4AADE4',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
