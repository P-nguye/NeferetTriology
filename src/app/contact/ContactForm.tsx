"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

const FIELD_STYLE: React.CSSProperties = {
  width: "100%",
  borderRadius: "0.5rem",
  border: "1px solid oklch(0.26 0.03 260)",
  background: "oklch(0.13 0.025 262)",
  padding: "0.6rem 0.875rem",
  fontSize: "0.875rem",
  color: "oklch(0.88 0.02 75)",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
}

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 500,
  marginBottom: "0.4rem",
  color: "oklch(0.62 0.04 70)",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  fontFamily: "var(--font-display)",
}

function DarkInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      {...props}
      style={{
        ...FIELD_STYLE,
        borderColor: focused ? "oklch(0.58 0.14 68 / 0.7)" : "oklch(0.26 0.03 260)",
        boxShadow: focused ? "0 0 0 2px oklch(0.58 0.14 68 / 0.12)" : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

function DarkTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      {...props}
      style={{
        ...FIELD_STYLE,
        resize: "none",
        lineHeight: "1.6",
        borderColor: focused ? "oklch(0.58 0.14 68 / 0.7)" : "oklch(0.26 0.03 260)",
        boxShadow: focused ? "0 0 0 2px oklch(0.58 0.14 68 / 0.12)" : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("success")
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.11 0.025 260)",
        border: "1px solid oklch(0.22 0.03 260)",
        boxShadow: "0 4px 32px oklch(0 0 0 / 0.4)",
      }}
    >
      <div
        className="px-6 py-4"
        style={{
          background: "linear-gradient(145deg, oklch(0.12 0.04 265) 0%, oklch(0.16 0.06 65) 100%)",
          borderBottom: "1px solid oklch(0.22 0.03 260)",
        }}
      >
        <p
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: "oklch(0.55 0.10 68)", fontFamily: "var(--font-display)" }}
        >
          Send a Message
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {status === "success" ? (
          <div className="text-center py-10">
            <div
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                background: "oklch(0.20 0.06 65 / 0.4)",
                border: "1px solid oklch(0.58 0.14 68 / 0.4)",
              }}
            >
              <Mail className="size-6" style={{ color: "oklch(0.72 0.12 72)" }} />
            </div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "oklch(0.92 0.025 75)",
              }}
            >
              Message Received
            </h2>
            <p
              className="text-sm"
              style={{ color: "oklch(0.58 0.025 70)", fontFamily: "Georgia, serif" }}
            >
              Thank you for writing. A reply will be on its way soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" style={LABEL_STYLE}>Name</label>
                <DarkInput
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  style={{ ...FIELD_STYLE, color: "oklch(0.88 0.02 75)" }}
                />
              </div>
              <div>
                <label htmlFor="email" style={LABEL_STYLE}>Email</label>
                <DarkInput
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" style={LABEL_STYLE}>Subject</label>
              <DarkInput
                id="subject"
                name="subject"
                placeholder="What's on your mind?"
              />
            </div>

            <div>
              <label htmlFor="message" style={LABEL_STYLE}>Message</label>
              <DarkTextarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Write your message here…"
              />
            </div>

            <Button type="submit" variant="gold" className="w-full" size="lg">
              Send Message
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
