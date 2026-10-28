import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThankYou } from "@/components/thank-you"

export const metadata: Metadata = {
  title: "Merci pour votre demande | Blitzeblank",
  description: "Votre demande a bien été reçue par Blitzeblank. Nous vous répondrons très prochainement.",
  robots: { index: false, follow: false },
}

export default function DankeFrPage() {
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
