import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactThankYou } from "@/components/contact-thank-you"

export const metadata: Metadata = {
  title: "Vielen Dank für Ihre Nachricht | Blitzeblank",
  description: "Ihre Nachricht ist bei Blitzeblank eingegangen. Wir melden uns innerhalb von 24 Stunden.",
  robots: { index: false, follow: false },
}

export default function KontaktDankePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex flex-1 items-center justify-center px-4 pt-32 pb-20 sm:px-6">
        <ContactThankYou locale="de" />
      </main>
      <Footer />
    </div>
  )
}
