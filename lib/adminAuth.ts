import { createHash } from "crypto";

export function getAdminSessionToken(): string | null {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) return null;
  return createHash("sha256").update(`augmentaa-admin|${p}`).digest("hex");
}

export function isValidAdminSession(
  cookieValue: string | undefined | null,
): boolean {
  const t = getAdminSessionToken();
  if (!t || !cookieValue) return false;
  return cookieValue === t;
}
