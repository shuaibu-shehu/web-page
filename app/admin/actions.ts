"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession, destroySession, type SessionPayload } from "@/lib/auth";

/**
 * Credentials login — bcrypt against AdminUser, then a signed session cookie.
 * Runs on the Node runtime (bcrypt has no edge build).
 */
export async function signIn(
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const user = await db.adminUser.findUnique({ where: { email } });
  const valid = user && (await bcrypt.compare(password, user.passwordHash));

  if (!valid) {
    return { error: "Invalid email or password." };
  }

  const payload: SessionPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  await createSession(payload, remember);

  // Only allow redirects to /admin paths — never open-redirect off-site.
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function signOut(): Promise<void> {
  destroySession();
  redirect("/admin/login");
}
