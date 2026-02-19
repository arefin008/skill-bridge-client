import { User } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const adminService = {
  async getAllUsers(): Promise<{ data: User[] }> {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    const res = await fetch(`${API_BASE}/api/admin/users`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    const data = await res.json();
    return { data: data.users ?? [] };
  },

  async updateUserStatus(id: string, status: string): Promise<User> {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    const res = await fetch(`${API_BASE}/api/admin/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update user status");
    return res.json();
  },
};
