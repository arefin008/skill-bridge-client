import { TutorAvailability } from "@/types";

export const availabilityService = {
  async create(data: Partial<TutorAvailability>) {
    const isServer = typeof window === "undefined";
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    let url = `/api/availability`;
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}/api/availability`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create availability");
    return res.json();
  },

  async getMyAvailability(): Promise<{ data: TutorAvailability[] }> {
    const isServer = typeof window === "undefined";
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    let url = "/api/availability";
    let headers: Record<string, string> = {};

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}/api/availability`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch availability");
    const data = await res.json();
    return { data: Array.isArray(data) ? data : [] };
  },

  async delete(id: string) {
    const res = await fetch(`/api/availability/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete availability");
    return res.json();
  },
};
