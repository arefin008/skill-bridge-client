import { User } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async getCurrentUser(): Promise<User | null> {
    const res = await fetch(`${API_BASE}/api/auth/me`, { cache: "no-store" });
    if (res.status === 401) return null;
    if (!res.ok) throw new Error("Failed to fetch current user");
    const user = await res.json();
    return user;
  },
};
