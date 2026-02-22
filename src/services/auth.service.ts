import { User } from "@/types";


export const authService = {
  async getCurrentUser(): Promise<User | null> {
    const isServer = typeof window === "undefined";
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    let url = `/api/auth/me`;
    let headers: Record<string, string> = {};

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}/api/auth/me`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      headers,
      cache: "no-store",
    });
    if (res.status === 401) return null;
    if (!res.ok) throw new Error("Failed to fetch current user");
    const user = await res.json();
    return user;
  },
};
