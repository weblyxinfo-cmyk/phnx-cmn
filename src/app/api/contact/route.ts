import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  const rl = rateLimit(`contact:${ip}`, 5, 10 * 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (name.length > 200 || company.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: "Field too long" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL ?? "praha@phoenixcom.cz";
    const from = process.env.CONTACT_FROM_EMAIL ?? "Phoenix Web <onboarding@resend.dev>";

    if (!apiKey) {
      console.error("contact POST: RESEND_API_KEY missing");
      return NextResponse.json(
        { error: "Mail service not configured" },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const subject = `Poptávka z webu — ${name}`;
    const html = `
      <div style="font-family: system-ui, sans-serif; line-height: 1.6;">
        <h2 style="margin:0 0 16px;">Nová poptávka z phoenixcom.cz</h2>
        <p><strong>Jméno:</strong> ${escape(name)}</p>
        <p><strong>E-mail:</strong> ${escape(email)}</p>
        ${company ? `<p><strong>Společnost:</strong> ${escape(company)}</p>` : ""}
        <p><strong>Zpráva:</strong></p>
        <pre style="white-space:pre-wrap; font-family: inherit; background:#f5f5f5; padding:12px; border-left:3px solid #C8251E;">${escape(message)}</pre>
      </div>
    `;
    const text = [
      `Nová poptávka z phoenixcom.cz`,
      ``,
      `Jméno: ${name}`,
      `E-mail: ${email}`,
      company ? `Společnost: ${company}` : null,
      ``,
      `Zpráva:`,
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("contact POST resend error", error);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact POST", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
