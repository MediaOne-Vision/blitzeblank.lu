import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/admin-auth"
import { AdminLoginForm } from "@/components/admin/admin-login-form"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Admin-Login | Blitzeblank",
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-navy px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-extrabold text-brand-navy">Preisverwaltung</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Bitte melden Sie sich an, um die Preisdynamik des Angebotsrechners zu bearbeiten.
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </main>
  )
}
