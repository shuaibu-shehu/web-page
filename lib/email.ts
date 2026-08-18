import nodemailer from "nodemailer";

/**
 * SMTP mail service (replaces EmailJS). Transient transport, created per send
 * from env config. When SMTP_* is missing, sends degrade to a console notice —
 * leads are still persisted, they just don't trigger an email.
 */

let transport: nodemailer.Transporter | null = null;

function getTransport() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  if (!transport) {
    transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transport;
}

const FROM = process.env.SMTP_FROM || "CodeTherapy <no-reply@codetherapy.ml>";

export async function sendLeadNotification(input: {
  source: string;
  name: string;
  email: string;
  details: string;
}): Promise<boolean> {
  const mailer = getTransport();
  if (!mailer) {
    console.warn(
      `[email] SMTP not configured — skipping lead notification for ${input.email}. Set SMTP_* in .env.`,
    );
    return false;
  }

  try {
    await mailer.sendMail({
      from: FROM,
      to: process.env.SMTP_USER, // admin inbox — same account
      replyTo: input.email,
      subject: `New ${input.source} lead: ${input.name}`,
      text: [
        `A new ${input.source} submission came in from ${input.name} (${input.email}).`,
        "",
        input.details,
      ].join("\n"),
    });
    return true;
  } catch (e) {
    console.error("[email] failed to send lead notification:", e);
    return false;
  }
}

export async function sendPasswordResetNote(email: string): Promise<boolean> {
  const mailer = getTransport();
  if (!mailer) return false;
  try {
    await mailer.sendMail({
      from: FROM,
      to: email,
      subject: "CodeTherapy admin — password reset request",
      text: [
        "A password reset was requested for your CodeTherapy admin account.",
        "If this was you, reply to this email and IT support will issue a reset link.",
        "If this wasn't you, you can safely ignore this message.",
      ].join("\n\n"),
    });
    return true;
  } catch (e) {
    console.error("[email] failed to send reset note:", e);
    return false;
  }
}
