import { requireRole } from "@/lib/requiredrole";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["ADMIN"]);
  return <>{children}</>;
}
