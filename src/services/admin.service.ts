import { User } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const adminService = {
  async getAllUsers(page: number = 1, limit: number = 10): Promise<{ data: User[], meta: any }> {
    const isServer = typeof window === "undefined";

    const urlPath = `/api/admin/users?page=${page}&limit=${limit}`;
    let url = urlPath;
    let headers: Record<string, string> = {};

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}${urlPath}`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    const data = await res.json();
    return { data: data.users ?? [], meta: data.meta };
  },

  async updateUserStatus(id: string, status: string): Promise<User> {
    const isServer = typeof window === "undefined";
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    let url = `/api/admin/users/${id}`;
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}/api/admin/users/${id}`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || errorData.error || "Failed to update user status",
      );
    }
    return res.json();
  },
};
