import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/admin-auth"
import { getPricingConfig } from "@/lib/pricing-store"
import { logoutAction } from "@/app/actions/admin"
import { PricingEditor } from "@/components/admin/pricing-editor"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Preisverwaltung | Blitzeblank",
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login")
  }

  const config = await getPricingConfig()

  return (
    <div className="min-h-screen bg-brand-mint">
      <header className="border-b border-brand-navy/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-xl font-extrabold text-brand-navy">Preisverwaltung</h1>
            <p className="text-sm text-neutral-500">Angebotsrechner – Preisdynamik bearbeiten</p>
          </div>
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="ghost"
              className="text-brand-navy hover:bg-brand-mint"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Abmelden
            </Button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <PricingEditor initialConfig={config} />
      </main>
    </div>
  )
}
