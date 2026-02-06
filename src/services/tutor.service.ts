interface TutorProfileData {
  [key: string]: unknown;
}

export const tutorService = {
  // Public
  async getAll(filters?: Record<string, string>) {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    if (!API_BASE) throw new Error("API base URL is not defined");

    const query = filters ? `?${new URLSearchParams(filters).toString()}` : "";

    const res = await fetch(`${API_BASE}/tutors${query}`);
    if (!res.ok) throw new Error("Failed to fetch tutors");
    return res.json();
  },

  async getById(id: string) {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    if (!API_BASE) throw new Error("API base URL is not defined");

    const res = await fetch(`${API_BASE}/tutors/${id}`);
    if (!res.ok) throw new Error("Failed to fetch tutor");
    return res.json();
  },

  async createProfile(data: TutorProfileData) {
    const res = await fetch("/api/tutors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create tutor profile");
    return res.json();
  },

  async updateProfile(data: TutorProfileData) {
    const res = await fetch("/api/tutors/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update tutor profile");
    return res.json();
  },
};
