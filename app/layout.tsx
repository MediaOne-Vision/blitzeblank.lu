import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { CookieConsentBanner } from '@/components/cookie-consent-banner'
import { HtmlLangSync } from '@/components/html-lang-sync'
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
  description: 'Blitzeblank bietet professionelle Industrie-, Fenster-, Stein- und Fassadenreinigung in Luxemburg, Trier, Bitburg und der Region. Schnelle Reaktionszeit, kostenloser Besichtigungstermin und transparente Kommunikation.',
  keywords: ['Reinigungsfirma Luxemburg', 'Reinigungsfirma Trier', 'Reinigungsfirma Bitburg', 'Industriereinigung', 'Fensterreinigung', 'Steinreinigung', 'Fassadenreinigung', 'Gewerbereinigung'],
  authors: [{ name: 'Blitzeblank' }],
  metadataBase: new URL('https://blitzeblank.lu'),
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
    <html lang="de" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased`}>
        {children}
        <HtmlLangSync />
        <CookieConsentBanner />
      </body>
    </html>
  )
}
