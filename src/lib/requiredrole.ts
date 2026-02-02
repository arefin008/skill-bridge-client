import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth";

export async function requireRole(roles: string[]) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (!roles.includes(user.role)) redirect("/");

  return user;
}
