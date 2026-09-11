/**
 * Session cookie name, isolated from lib/auth.ts so the edge middleware can
 * import it without pulling in next/headers (which has no edge runtime).
 */
export const SESSION_COOKIE = "ct_admin_session";
