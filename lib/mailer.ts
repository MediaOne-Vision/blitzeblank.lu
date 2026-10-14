import { Resend } from "resend"

/** Maximale Wartezeit auf den Versanddienst. Danach gilt der Versand als ungeklärt, nicht als Erfolg. */
export const MAIL_TIMEOUT_MS = 15_000

export interface MailAttachment {
  filename: string
  content?: string
  path?: string
  contentId?: string
  contentType?: string
}

export interface MailMessage {
  from: string
  to: string
  replyTo?: string
  subject: string
  html: string
  text: string
  attachments?: MailAttachment[]
}

export type MailFailure = "not_configured" | "provider_error" | "timeout"

/**
 * `ok: true` bedeutet ausschließlich: Der Versanddienst hat die Nachricht
 * angenommen und eine ID vergeben. Das ist kein Beleg für die Zustellung im Postfach.
 */
export type MailResult = { ok: true; id: string } | { ok: false; reason: MailFailure }

export type Mailer = (message: MailMessage, options: { idempotencyKey: string }) => Promise<MailResult>

const TIMED_OUT = Symbol("timed-out")

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | typeof TIMED_OUT> {
  let timer: ReturnType<typeof setTimeout>
  const timeout = new Promise<typeof TIMED_OUT>((resolve) => {
    timer = setTimeout(() => resolve(TIMED_OUT), ms)
  })
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}

/**
 * Versand über Resend. Der Idempotenz-Schlüssel sorgt dafür, dass ein
 * Netzwerk-Neuversuch derselben Einsendung keine zweite Mail auslöst.
 */
export const resendMailer: Mailer = async (message, { idempotencyKey }) => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, reason: "not_configured" }

  const resend = new Resend(apiKey)
  try {
    const result = await withTimeout(
      resend.emails.send(
        {
          from: message.from,
          to: message.to,
          replyTo: message.replyTo,
          subject: message.subject,
          html: message.html,
          text: message.text,
          attachments: message.attachments,
        },
        { idempotencyKey },
      ),
      MAIL_TIMEOUT_MS,
    )

    if (result === TIMED_OUT) return { ok: false, reason: "timeout" }
    if (result.error || !result.data?.id) {
      console.log("[v0] Versanddienst hat die Nachricht nicht angenommen:", result.error?.name ?? "no_id")
      return { ok: false, reason: "provider_error" }
    }
    return { ok: true, id: result.data.id }
  } catch (error) {
    console.log("[v0] Versanddienst nicht erreichbar:", error instanceof Error ? error.name : "unknown")
    return { ok: false, reason: "provider_error" }
  }
}
