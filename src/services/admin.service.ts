import { User } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const adminService = {
  async getAllUsers(page: number = 1, limit: number = 10): Promise<{ data: User[], meta: any }> {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    const url = new URL(`${API_BASE}/api/admin/users`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    const res = await fetch(url.toString(), {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    const data = await res.json();
    return { data: data.users ?? [], meta: data.meta };
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
