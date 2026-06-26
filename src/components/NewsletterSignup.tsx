"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NewsletterSignupProps {
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
        <div className="mb-7 text-center">
          <p
            className="text-xs uppercase tracking-[0.4em] mb-4"
            style={{ color: "oklch(0.58 0.14 68)" }}
          >
            ◈ &nbsp; Join the Chronicle &nbsp; ◈
          </p>
          <h2
            className="text-2xl font-semibold mb-2"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.92 0.025 75)",
            }}
          >
            Stay Inside the Story
          </h2>
          <p
            className="text-sm max-w-md mx-auto"
            style={{ color: "oklch(0.55 0.025 70)", fontFamily: "Georgia, serif" }}
          >
            Join the Neferet Chronicle and receive updates on new chapters, artwork,
            and future animated episodes.
          </p>
        </div>
      )}

      {status === "success" ? (
        <p
          className="text-center text-sm font-medium py-3"
          style={{ color: "oklch(0.65 0.12 145)", fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
        >
          {message}
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
            aria-label="Email address"
            className="flex-1"
            style={{
              borderRadius: "0.5rem",
              border: "1px solid oklch(0.28 0.03 260)",
              background: "oklch(0.13 0.025 262)",
              padding: "0.55rem 0.875rem",
              fontSize: "0.875rem",
              color: "oklch(0.88 0.02 75)",
              outline: "none",
              minWidth: 0,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "oklch(0.58 0.14 68 / 0.7)"
              e.target.style.boxShadow = "0 0 0 2px oklch(0.58 0.14 68 / 0.12)"
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "oklch(0.28 0.03 260)"
              e.target.style.boxShadow = "none"
            }}
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
        <p className="text-center text-xs mt-2" style={{ color: "oklch(0.60 0.22 25)" }}>
          {message}
        </p>
      )}
    </div>
  )
}
