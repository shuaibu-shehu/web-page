"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";

/**
 * Contact + newsletter lead capture — validates, persists to the Lead table
 * (which feeds the admin dashboard's bell/leads) and emails via SMTP.
 */

const contactInput = z.object({
  name: z.string().min(1, "Enter your full name.").max(120),
  email: z.string().email("Enter a valid email address."),
  organization: z.string().max(160).optional().default(""),
  inquiry: z.string().min(1),
  message: z.string().min(10, "Tell us a little more (at least 10 characters).").max(5000),
});

export type ContactResult =
  | { ok: true; emailed: boolean }
  | { ok: false; error: string };

export async function submitContact(
  _prev: ContactResult,
  formData: FormData,
): Promise<ContactResult> {
  const parsed = contactInput.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }
  const d = parsed.data;

  await db.lead.create({
    data: {
      source: "contact",
      inquiryType: d.inquiry,
      name: d.name,
      email: d.email,
      organization: d.organization || null,
      message: d.message,
    },
  });

  const emailed = await sendLeadNotification({
    source: "contact",
    name: d.name,
    email: d.email,
    details: [
      `Organization: ${d.organization || "—"}`,
      `Inquiry type: ${d.inquiry}`,
      "",
      d.message,
    ].join("\n"),
  });

  return { ok: true, emailed };
}

export async function submitNewsletter(
  _prev: ContactResult,
  formData: FormData,
): Promise<ContactResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const parsed = z.string().email("Enter a valid email address.").safeParse(email);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }

  await db.lead.create({
    data: {
      source: "newsletter",
      name: email.split("@")[0],
      email,
      message: "Newsletter subscription",
    },
  });

  const emailed = await sendLeadNotification({
    source: "newsletter",
    name: email.split("@")[0],
    email,
    details: `New newsletter subscription from ${email}.`,
  });

  return { ok: true, emailed };
}
