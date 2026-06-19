import { NextResponse } from "next/server"

const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY
const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 })
    }

    if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
      // During development without env vars, return success so the form works
      console.warn("ConvertKit env vars not set — skipping real API call")
      return NextResponse.json({ message: "Subscribed (dev mode)" }, { status: 200 })
    }

    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ api_key: CONVERTKIT_API_KEY, email }),
      }
    )

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      return NextResponse.json(
        { error: body.message ?? "ConvertKit returned an error." },
        { status: res.status }
      )
    }

    return NextResponse.json({ message: "Subscribed successfully." }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
