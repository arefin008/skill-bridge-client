import { Booking } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const bookingService = {
  async create(data: Partial<Booking>) {
    const isServer = typeof window === "undefined";

    let url = `/api/bookings`;
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}/api/bookings`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || "Failed to create booking");
    }
    return res.json();
  },

  async getAll(): Promise<{ data: Booking[] }> {
    const isServer = typeof window === "undefined";

    let url = `/api/bookings`;
    let headers: Record<string, string> = {};

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}/api/bookings`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch all bookings");
    const data = await res.json();
    return { data: Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [] };
  },

  async getMyBookings(): Promise<{ data: Booking[] }> {
    const isServer = typeof window === "undefined";

    let url = `/api/bookings/me`;
    let headers: Record<string, string> = {};

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}/api/bookings/me`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch my bookings");
    const data = await res.json();
    return { data: Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [] };
  },

  async cancelMyBooking(id: string) {
    const isServer = typeof window === "undefined";

    let url = `/api/bookings/${id}/cancel`;
    let headers: Record<string, string> = {};

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}/api/bookings/${id}/cancel`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      method: "PATCH",
      headers,
    });
    if (!res.ok) throw new Error("Failed to cancel booking");
    return res.json();
  },

  async getTutorSessions(): Promise<{ data: Booking[] }> {
    const isServer = typeof window === "undefined";

    let url = `/api/bookings/tutor/me`;
    let headers: Record<string, string> = {};

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}/api/bookings/tutor/me`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch tutor sessions");
    const data = await res.json();
    return { data: Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [] };
  },

  async completeSession(id: string) {
    const isServer = typeof window === "undefined";

    let url = `/api/bookings/${id}/complete`;
    let headers: Record<string, string> = {};

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}/api/bookings/${id}/complete`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      method: "PATCH",
      headers,
    });
    if (!res.ok) throw new Error("Failed to complete booking");
    return res.json();
  },
};
