import { Booking } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const bookingService = {
  async create(data: Partial<Booking>) {
    const res = await fetch(`${API_BASE}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create booking");
    return res.json();
  },

  async getAll(): Promise<{ data: Booking[] }> {
    const res = await fetch(`${API_BASE}/api/bookings`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch all bookings");
    const data = await res.json();
    return { data: Array.isArray(data) ? data : [] };
  },

  async getMyBookings(): Promise<{ data: Booking[] }> {
    const res = await fetch(`${API_BASE}/api/bookings/me`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch my bookings");
    const data = await res.json();
    return { data: Array.isArray(data) ? data : [] };
  },

  async cancelMyBooking(id: string) {
    const res = await fetch(`${API_BASE}/api/bookings/${id}/cancel`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Failed to cancel booking");
    return res.json();
  },

  async getTutorSessions(): Promise<{ data: Booking[] }> {
    const res = await fetch(`${API_BASE}/api/bookings/tutor/me`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch tutor sessions");
    const data = await res.json();
    return { data: Array.isArray(data) ? data : [] };
  },

  async completeSession(id: string) {
    const res = await fetch(`${API_BASE}/api/bookings/${id}/complete`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Failed to complete booking");
    return res.json();
  },
};
