import { createHash } from "crypto";

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME?.trim() || "admin",
    password: process.env.ADMIN_PASSWORD?.trim() || "admin123",
  };
}

export function getAdminSessionToken(): string {
  const { password } = getAdminCredentials();
  return createHash("sha256").update(`augmentaa-admin|${password}`).digest("hex");
}

export function isValidAdminCredentials(
  username: string | undefined | null,
  password: string | undefined | null,
): boolean {
  const creds = getAdminCredentials();
  if (!username || !password) return false;
  return username === creds.username && password === creds.password;
}

export function isValidAdminSession(
  cookieValue: string | undefined | null,
): boolean {
  const t = getAdminSessionToken();
  if (!cookieValue) return false;
  return cookieValue === t;
}
