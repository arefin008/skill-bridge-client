import { clientFetch, serverFetch } from "@/lib/http";

interface BookingData {
  [key: string]: unknown;
}

export const bookingService = {
  // Student
  create: (data: BookingData) =>
    clientFetch("/api/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  myBookings: () => serverFetch("/bookings/me"),

  cancel: (id: string) =>
    clientFetch(`/api/bookings/${id}/cancel`, {
      method: "PATCH",
    }),

  // Tutor
  tutorSessions: () => serverFetch("/bookings/tutor/me"),

  // Admin
  getAll: () => serverFetch("/bookings"),
};