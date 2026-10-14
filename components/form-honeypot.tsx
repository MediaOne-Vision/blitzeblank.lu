/**
 * Honeypot-Feld gegen Bots. Bewusst ein normales Textfeld (kein type="hidden"),
 * mit neutralem Namen und ohne Wert, damit Autofill/Passwortmanager es nie befüllen.
 * Auslesen per FormData bzw. DOM-Ref: `formData.get(HONEYPOT_FIELD)`.
 */
export const HONEYPOT_FIELD = "contact_reference_check"

export function FormHoneypot({ inputRef }: { inputRef?: React.Ref<HTMLInputElement> }) {
  return (
    <input
      ref={inputRef}
      type="text"
      name={HONEYPOT_FIELD}
      autoComplete="new-password"
      readOnly
      tabIndex={-1}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        height: 0,
        width: 0,
        overflow: "hidden",
      }}
    />
  )
}
