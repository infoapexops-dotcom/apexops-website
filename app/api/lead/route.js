import { NextResponse } from "next/server";

/* Lead capture endpoint.
   For production, swap the console.log for your CRM / email / Slack webhook
   (e.g. forward to HubSpot, Resend, or a Google Sheet). */
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
  // TODO: forward `lead` to your CRM / email / Slack here.
  console.log("[ApexOps] New demo lead:", lead);

  return NextResponse.json({ ok: true });
}
