import { requireRole } from "@/lib/requiredrole";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["STUDENT"]);
  return <>{children}</>;
}
