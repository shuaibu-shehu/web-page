import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/session";

/**
 * Custom admin session: a jose-signed JWT in an httpOnly cookie.
 * No external auth service — bcrypt against AdminUser + this cookie is all
 * the portal needs. AUTH_SECRET must be set in .env.
 */

const SESSION_DAYS = 7;
const REMEMBER_DAYS = 30;

export type SessionPayload = {
  sub: string; // AdminUser id
  email: string;
  name: string;
  role: string;
};

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET is not set. Add it to .env (openssl rand -base64 32) — required for admin sessions.",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(
  payload: SessionPayload,
  remember: boolean,
): Promise<void> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${remember ? REMEMBER_DAYS : SESSION_DAYS}d`)
    .sign(secretKey());

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: (remember ? REMEMBER_DAYS : SESSION_DAYS) * 24 * 60 * 60,
  });
}

export function destroySession(): void {
  cookies().delete(SESSION_COOKIE);
}

/** Returns the session payload, or null when absent/invalid. */
export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/** For server components + actions: redirects to the login page if not signed in. */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
