import { Tutor, TutorProfileData, TutorFilter } from "@/types";
type FetchOptions = {
  revalidate?: number;
};

export const tutorService = {
  // Public
  async getAll(
    filters?: TutorFilter,
    options?: FetchOptions,
  ): Promise<{ data: Tutor[] }> {
    // Make sure API base is defined
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    if (!API_BASE) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return { data: [] };
    }

    // Build query string from filters
    const query = filters
      ? `?${new URLSearchParams(
          Object.entries(filters)
            .filter(([, v]) => v !== undefined && v !== null)
            .reduce<Record<string, string>>((acc, [k, v]) => {
              acc[k] = String(v);
              return acc;
            }, {}),
        ).toString()}`
      : "";

    try {
      // Use absolute URL for server-side fetch
      const res = await fetch(`${API_BASE}/api/tutors${query}`, {
        // next option only works on server components
        next: { revalidate: options?.revalidate ?? 0 },
      });

      if (!res.ok) {
        console.error("Failed to fetch tutors:", res.status, res.statusText);
        return { data: [] };
      }

      const data = await res.json();

      // Ensure the returned object always has `data` property
      return {
        data: Array.isArray(data.data) ? data.data : [],
      };
    } catch (error) {
      console.error("Error fetching tutors:", error);
      return { data: [] };
    }
  },

  async getById(id: string): Promise<Tutor | null> {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    if (!API_BASE) throw new Error("API base URL is not defined");

    const res = await fetch(`${API_BASE}/api/tutors/${id}`, {
      cache: "no-store",
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Failed to fetch tutor");

    const tutor: Tutor = await res.json(); // directly the tutor
    return tutor;
  },

  async createProfile(data: TutorProfileData): Promise<Tutor> {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    if (!API_BASE) throw new Error("API base URL is not defined");

    const res = await fetch(`${API_BASE}/api/tutors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Optionally include auth token if needed:
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create tutor profile");

    return res.json();
  },

  /**
   *  Update tutor profile
   */
  async updateProfile(data: Partial<TutorProfileData>): Promise<Tutor> {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    if (!API_BASE) throw new Error("API base URL is not defined");

    const res = await fetch(`${API_BASE}/api/tutors/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update tutor profile");

    return res.json();
  },
};
