import { redirect } from "next/navigation";
import { authService } from "@/services/auth.service";
import { UserRole } from "@/constants/roles";

export async function requireAuth(
  role?: (typeof UserRole)[keyof typeof UserRole],
) {
  const user = await authService.getCurrentUser();

  if (!user) redirect("/login");
  if (role && user.role !== role) redirect("/");

  return user;
}
