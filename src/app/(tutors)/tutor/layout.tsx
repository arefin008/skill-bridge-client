import { requireRole } from "@/lib/requiredrole";

export default async function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["TUTOR"]);
  return <>{children}</>;
}
