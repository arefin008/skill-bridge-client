import { cookies } from "next/headers";
import { env } from "@/env";

export async function getCurrentUser() {
  try {
    const cookieStore = cookies();

    const res = await fetch(`${env.BACKEND_URL}/auth/me`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
