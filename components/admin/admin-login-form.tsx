"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { loginAction, type LoginState } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full bg-brand-blue text-white hover:bg-brand-blue/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Anmelden…
        </>
      ) : (
        <>
          <Lock className="mr-2 h-4 w-4" />
          Anmelden
        </>
      )}
    </Button>
  )
}

export function AdminLoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(loginAction, {})

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Passwort</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          placeholder="••••••••"
        />
      </div>
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      )}
      <SubmitButton />
    </form>
  )
}
