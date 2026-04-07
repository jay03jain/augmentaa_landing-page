import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidAdminSession } from "@/lib/adminAuth";
import { fetchAdminStats } from "@/lib/db/stats";

const COOKIE = "admin_session";

export async function GET() {
  const session = cookies().get(COOKIE)?.value;
  if (!isValidAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await fetchAdminStats();
  return NextResponse.json(data);
}
