import type { Metadata } from "next"
import { ContactForm } from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the author of the Neferet Trilogy.",
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="divider-egypt mb-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground px-3">Get in Touch</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">Contact</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Questions, feedback, or just want to share your reaction to a chapter? Send a message — every email is read.
        </p>
      </div>
      <ContactForm />
    </div>
  )
}
