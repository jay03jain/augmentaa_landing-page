import { cookies } from "next/headers";
import { AdminLoginGate } from "@/components/AdminLoginGate";
import { isValidAdminSession } from "@/lib/adminAuth";

const COOKIE = "admin_session";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = cookies().get(COOKIE)?.value;
  if (!isValidAdminSession(session)) {
    return <AdminLoginGate />;
  }
  return <>{children}</>;
}
