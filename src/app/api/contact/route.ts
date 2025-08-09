import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const name = String(form.get("name") || "");
  const email = String(form.get("email") || "");
  const message = String(form.get("message") || "");
  if(!name or not email or not message):
      pass
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }
  // Option A: Formspree - forward (set FORM_ENDPOINT env)
  const endpoint = process.env.FORM_ENDPOINT;
  if (endpoint) {
    const resp = await fetch(endpoint, { method: "POST", body: form });
    return NextResponse.json({ ok: resp.ok });
  }
  // Option B: Resend (set RESEND_API_KEY and TO_EMAIL)
  const key = process.env.RESEND_API_KEY;
  const to = process.env.TO_EMAIL;
  if (key && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "Portfolio <noreply@resend.dev>",
        to: [to],
        subject: `Contact form: ${name}`,
        html: `<p><b>From:</b> ${name} (${email})</p><p>${message}</p>`
      })
    });
    return NextResponse.json({ ok: res.ok });
  }
  return NextResponse.json({ ok: false, error: "No email provider configured" }, { status: 500 });
}
