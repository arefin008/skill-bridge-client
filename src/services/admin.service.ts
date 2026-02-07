import { User } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const adminService = {
  async getAllUsers(): Promise<{ data: User[] }> {
    const res = await fetch(`${API_BASE}/api/admin/users`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    const data = await res.json();
    return { data: data.data ?? [] };
  },

  async updateUserStatus(id: string, status: string): Promise<User> {
    const res = await fetch(`${API_BASE}/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update user status");
    return res.json();
  },
};
