"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle } from "lucide-react"

type InquiryType = "producer" | "distributor" | "investor" | "media" | "other"

const INQUIRY_TYPES: { value: InquiryType; label: string }[] = [
  { value: "producer", label: "Co-Producer / Production Partner" },
  { value: "distributor", label: "Distribution & Licensing" },
  { value: "investor", label: "Investment & Financing" },
  { value: "media", label: "Media & Press" },
  { value: "other", label: "Other" },
]

const FIELD_BASE: React.CSSProperties = {
  width: "100%",
  borderRadius: "0.5rem",
  border: "1px solid oklch(0.26 0.03 260)",
  background: "oklch(0.13 0.025 262)",
  padding: "0.6rem 0.875rem",
  fontSize: "0.875rem",
  color: "oklch(0.88 0.02 75)",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  fontFamily: "inherit",
}

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "0.7rem",
  fontWeight: 500,
  marginBottom: "0.35rem",
  color: "oklch(0.55 0.06 70)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontFamily: "var(--font-display)",
}

function useFocusStyle() {
  const [focused, setFocused] = useState(false)
  const focusStyle: React.CSSProperties = focused
    ? { borderColor: "oklch(0.58 0.14 68 / 0.7)", boxShadow: "0 0 0 2px oklch(0.58 0.14 68 / 0.12)" }
    : {}
  return { onFocus: () => setFocused(true), onBlur: () => setFocused(false), focusStyle }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={LABEL_STYLE}>{label}</label>
      {children}
    </div>
  )
}

export function CollaborationInquiryForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle")
  const [inquiryType, setInquiryType] = useState<InquiryType>("producer")

  const nameF = useFocusStyle()
  const orgF = useFocusStyle()
  const emailF = useFocusStyle()
  const messageF = useFocusStyle()
  const selectF = useFocusStyle()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("success")
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: "oklch(0.20 0.06 65 / 0.4)",
            border: "1px solid oklch(0.58 0.14 68 / 0.4)",
          }}
        >
          <CheckCircle className="size-8" style={{ color: "oklch(0.72 0.12 72)" }} />
        </div>
        <h3
          className="text-xl font-semibold mb-2"
          style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.025 75)" }}
        >
          Inquiry Received
        </h3>
        <p
          className="text-sm max-w-xs"
          style={{ color: "oklch(0.55 0.025 70)", fontFamily: "Georgia, serif" }}
        >
          Thank you for your interest in the Neferet Trilogy production. We will be in touch within 5 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Inquiry type selector */}
      <Field label="Type of Inquiry">
        <select
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value as InquiryType)}
          style={{ ...FIELD_BASE, ...selectF.focusStyle, cursor: "pointer" }}
          onFocus={selectF.onFocus}
          onBlur={selectF.onBlur}
        >
          {INQUIRY_TYPES.map(({ value, label }) => (
            <option
              key={value}
              value={value}
              style={{ background: "oklch(0.14 0.025 262)", color: "oklch(0.88 0.02 75)" }}
            >
              {label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name">
          <input
            type="text"
            required
            placeholder="Your full name"
            style={{ ...FIELD_BASE, ...nameF.focusStyle }}
            onFocus={nameF.onFocus}
            onBlur={nameF.onBlur}
          />
        </Field>
        <Field label="Organisation / Company">
          <input
            type="text"
            placeholder="Company or studio name"
            style={{ ...FIELD_BASE, ...orgF.focusStyle }}
            onFocus={orgF.onFocus}
            onBlur={orgF.onBlur}
          />
        </Field>
      </div>

      <Field label="Business Email">
        <input
          type="email"
          required
          placeholder="you@company.com"
          style={{ ...FIELD_BASE, ...emailF.focusStyle }}
          onFocus={emailF.onFocus}
          onBlur={emailF.onBlur}
        />
      </Field>

      <Field label="Tell Us About Your Interest">
        <textarea
          required
          rows={5}
          placeholder="Describe your production background, the nature of your interest, and any relevant experience with similar projects…"
          style={{ ...FIELD_BASE, ...messageF.focusStyle, resize: "none", lineHeight: "1.65" }}
          onFocus={messageF.onFocus}
          onBlur={messageF.onBlur}
        />
      </Field>

      <Button type="submit" variant="gold" size="lg" className="w-full gap-2">
        <Send className="size-4" />
        Submit Collaboration Inquiry
      </Button>

      <p
        className="text-center text-xs"
        style={{ color: "oklch(0.40 0.025 260)", fontFamily: "Georgia, serif" }}
      >
        All inquiries are reviewed by the production team. This form is for professional collaboration only.
      </p>
    </form>
  )
}
