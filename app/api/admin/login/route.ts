import { NextResponse } from "next/server";
import {
  getAdminSessionToken,
  isValidAdminCredentials,
} from "@/lib/adminAuth";

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7;

export async function POST(req: Request) {
  let body: { username?: string; password?: string };
  try {
    body = (await req.json()) as { username?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  if (!isValidAdminCredentials(body.username, body.password)) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const token = getAdminSessionToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}
