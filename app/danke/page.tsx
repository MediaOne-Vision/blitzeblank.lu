import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThankYou } from "@/components/thank-you"

export const metadata: Metadata = {
  title: "Vielen Dank für Ihre Anfrage | Blitzeblank",
  description: "Ihre Anfrage ist bei Blitzeblank eingegangen. Wir melden uns in Kürze bei Ihnen.",
  // Conversion-Seite nicht indexieren
  robots: { index: false, follow: false },
}

export default function DankePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex flex-1 items-center justify-center px-4 pt-32 pb-20 sm:px-6">
        <ThankYou variant="accepted" />
      </main>
      <Footer />
    </div>
  )
}
