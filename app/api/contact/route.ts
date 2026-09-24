import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
  website?: string; // honeypot
};

function sanitize(value: string) {
  return value.replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Contact submission endpoint.
 *
 * Configure RESEND_API_KEY + CONTACT_EMAIL_TO in a live deploy to enable
 * delivery. Without a backend the route reports `configured: false` and the
 * client surfaces that state honestly instead of pretending an email was sent.
 */
export async function POST(request: NextRequest) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, configured: false, error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  const name = sanitize((body.name ?? "").trim().slice(0, 120));
  const email = (body.email ?? "").trim().slice(0, 200);
  const company = sanitize((body.company ?? "").trim().slice(0, 120));
  const projectType = sanitize((body.projectType ?? "").trim().slice(0, 120));
  const message = sanitize((body.message ?? "").trim().slice(0, 4000));

  // Honeypot: bots fill invisible "website" field.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true, configured: true }, { status: 200 });
  }

  if (!name || name.length < 2) {
    return NextResponse.json({ ok: false, error: "NAME_REQUIRED" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "EMAIL_INVALID" }, { status: 400 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ ok: false, error: "MESSAGE_REQUIRED" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO ?? "hsinghjayesh@gmail.com";
  const from = process.env.CONTACT_EMAIL_FROM ?? "Contact <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, configured: false, error: "NOT_CONFIGURED" },
      { status: 200 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `[jayesh.dev] ${projectType} — ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\nProject type: ${projectType}\n\nMessage:\n${message}`,
      }),
    });
    if (!res.ok) {
      console.error("contact/email", res.status, await res.text());
      return NextResponse.json({ ok: false, configured: true, error: "SEND_FAILED" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, configured: true }, { status: 200 });
  } catch (err) {
    console.error("contact/email", err);
    return NextResponse.json({ ok: false, configured: true, error: "SEND_FAILED" }, { status: 500 });
  }
}