"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  verifyPassword,
  createSession,
  destroySession,
  isAuthenticated,
  isAdminConfigured,
} from "@/lib/admin-auth"
import { savePricingConfig } from "@/lib/pricing-store"
import { mergePricingConfig, type PricingConfig } from "@/lib/pricing-config"

export interface LoginState {
  error?: string
}

/** Login-Action für das Admin-Panel. */
export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return { error: "Kein Admin-Passwort konfiguriert. Bitte ADMIN_PASSWORD setzen." }
  }
  const password = String(formData.get("password") ?? "")
  if (!verifyPassword(password)) {
    return { error: "Falsches Passwort." }
  }
  await createSession()
  redirect("/admin")
}

/** Logout-Action. */
export async function logoutAction(): Promise<void> {
  await destroySession()
  redirect("/admin/login")
}

export interface SaveState {
  ok?: boolean
  error?: string
}

/** Speichert die neue Preisdynamik (nur für angemeldete Admins). */
export async function savePricingAction(config: PricingConfig): Promise<SaveState> {
  if (!(await isAuthenticated())) {
    return { error: "Nicht angemeldet." }
  }
  try {
    await savePricingConfig(mergePricingConfig(config))
    // Angebotsseite neu validieren, damit die neuen Preise sofort greifen.
    revalidatePath("/angebot")
    revalidatePath("/admin")
    return { ok: true }
  } catch (error) {
    console.error("[v0] savePricingAction error:", error)
    return { error: "Speichern fehlgeschlagen. Bitte erneut versuchen." }
  }
}
