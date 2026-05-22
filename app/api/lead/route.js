import { NextResponse } from "next/server";

/* Lead capture endpoint.
   Forwards demo requests to the inbox registered with Web3Forms.
   The access key is a public (non-secret) submission key; safe to ship. */
const WEB3FORMS_KEY = "3b8b374b-832a-4af7-9678-27fd30af2248";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const fleet = (body.fleet || "").trim();
  const message = (body.message || "").trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!emailOk) return NextResponse.json({ error: "A valid email is required." }, { status: 400 });

  const lead = { name, email, fleet, message, at: new Date().toISOString() };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New ApexOps demo request — ${name}`,
        from_name: "ApexOps Website",
        replyto: email,
        // fields shown in the email
        Name: name,
        Email: email,
        "Fleet size": fleet || "—",
        Message: message || "—",
        Submitted: lead.at,
      }),
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok || out.success === false) {
      console.error("[ApexOps] Web3Forms delivery failed:", out);
      return NextResponse.json({ error: "Could not submit right now — please email us directly." }, { status: 502 });
    }
  } catch (e) {
    console.error("[ApexOps] Web3Forms request error:", e);
    return NextResponse.json({ error: "Could not submit right now — please email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
