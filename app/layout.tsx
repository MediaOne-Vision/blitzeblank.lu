import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['600', '700', '800'],
  variable: '--font-jakarta'
})

export const metadata: Metadata = {
  title: 'Blitzeblank | Professionelle Reinigungsdienstleistungen in Luxemburg, Trier & Bitburg',
  description: 'Blitzeblank bietet professionelle Industrie-, Fenster-, Trockeneis-, Stein- und Fassadenreinigung in Luxemburg, Trier, Bitburg und der Region. Schnelle Reaktionszeit, kostenloser Besichtigungstermin und transparente Kommunikation.',
  keywords: ['Reinigungsfirma Luxemburg', 'Reinigungsfirma Trier', 'Reinigungsfirma Bitburg', 'Industriereinigung', 'Fensterreinigung', 'Trockeneisreinigung', 'Steinreinigung', 'Fassadenreinigung', 'Gewerbereinigung'],
  authors: [{ name: 'Blitzeblank' }],
  openGraph: {
    title: 'Blitzeblank | Professionelle Reinigungsdienstleistungen',
    description: 'Ihr Partner für professionelle Reinigung in Luxemburg, Trier, Bitburg & Region',
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
      <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
