"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface NewsletterSignupProps {
  /** "full" shows heading + description + form; "compact" shows just the form */
  variant?: "full" | "compact"
  className?: string
}

export function NewsletterSignup({ variant = "full", className }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus("success")
        setMessage("You're in! Welcome to the Neferet Chronicle.")
        setEmail("")
      } else {
        const data = await res.json().catch(() => ({}))
        setStatus("error")
        setMessage(data.error ?? "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setMessage("Network error — please check your connection and try again.")
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {variant === "full" && (
        <div className="mb-6 text-center">
          <div className="divider-egypt mb-4">
            <span className="text-xs uppercase tracking-widest text-muted-foreground px-3">
              Join the Chronicle
            </span>
          </div>
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
            Stay Inside the Story
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Join the Neferet Chronicle and receive updates on new chapters, artwork, and future animated episodes.
          </p>
        </div>
      )}

      {status === "success" ? (
        <p className="text-center text-sm font-medium text-primary py-3">{message}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
            className="flex-1"
            aria-label="Email address"
          />
          <Button
            type="submit"
            variant="gold"
            disabled={status === "loading"}
            className="shrink-0"
          >
            {status === "loading" ? "Joining…" : "Join the Chronicle"}
          </Button>
        </form>
      )}

      {status === "error" && (
        <p className="text-center text-xs text-destructive mt-2">{message}</p>
      )}
    </div>
  )
}
