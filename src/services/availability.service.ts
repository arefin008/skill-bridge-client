import { TutorAvailability } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const availabilityService = {
  async create(data: Partial<TutorAvailability>) {
    const res = await fetch(`${API_BASE}/api/availability`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create availability");
    return res.json();
  },

  async getMyAvailability(): Promise<{ data: TutorAvailability[] }> {
    const res = await fetch(`${API_BASE}/api/availability`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch availability");
    const data = await res.json();
    return { data: data.data ?? [] };
  },

  async delete(id: string) {
    const res = await fetch(`${API_BASE}/api/availability/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete availability");
    return res.json();
  },
};
