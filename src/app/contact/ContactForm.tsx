"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("success")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {status === "success" ? (
          <div className="text-center py-8">
            <Mail className="size-10 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-xl font-semibold text-foreground mb-2">Message Received</h2>
            <p className="text-muted-foreground text-sm">Thank you for writing. A reply will be on its way soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                <Input id="name" name="name" required placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                <Input id="email" name="email" type="email" required placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
              <Input id="subject" name="subject" placeholder="What's on your mind?" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Write your message here…"
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>
            <Button type="submit" variant="gold" className="w-full" size="lg">
              Send Message
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
