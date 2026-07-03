"use client"

export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      className={className}
    >
      Cookie-Einstellungen
    </button>
  )
}
