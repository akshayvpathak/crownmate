import nodemailer from "nodemailer";
import { SITE_CONFIG } from "@/constants/assets";

export async function sendOtpEmail(to: string, code: string): Promise<void> {
  const from = process.env.EMAIL_FROM || `${SITE_CONFIG.name} <noreply@crownmate.in>`;

  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Your ${SITE_CONFIG.name} verification code`,
        html: `<p>Your verification code is <strong>${code}</strong>.</p><p>It expires in 15 minutes.</p>`,
      }),
    });
    if (!res.ok) {
      throw new Error(`Resend error: ${await res.text()}`);
    }
    return;
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);

  if (!host || !user || !pass) {
    throw new Error("Email not configured: set RESEND_API_KEY or SMTP credentials");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    subject: `Your ${SITE_CONFIG.name} verification code`,
    text: `Your verification code is ${code}. It expires in 15 minutes.`,
    html: `<p>Your verification code is <strong>${code}</strong>.</p><p>It expires in 15 minutes.</p>`,
  });
}
