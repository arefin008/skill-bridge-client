import { clientFetch, serverFetch } from "@/lib/http";

interface TutorProfileData {
  [key: string]: unknown;
}

export const tutorService = {
  // Public
  getAll: (filters?: Record<string, string>) =>
    serverFetch(`/api/tutors?${new URLSearchParams(filters || {})}`),

  getById: (id: string) => serverFetch(`/tutors/${id}`),

  // Tutor only
  createProfile: (data: TutorProfileData) =>
    clientFetch("/api/tutors", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateProfile: (data: TutorProfileData) =>
    clientFetch("/api/tutors/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
