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
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Failed to fetch tutors:", res.status, res.statusText);
        return { data: [] };
      }

      const data = await res.json();
      const tutors = Array.isArray(data.data) ? data.data : [];

      // Map tutorCategories to categories and ensure numeric types
      return {
        data: tutors.map((t: any) => ({
          ...t,
          categories: t.categories || t.tutorCategories?.map((tc: any) => tc.category) || [],
        })),
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

    const data = await res.json();
    return {
      ...data,
      categories: data.categories || data.tutorCategories?.map((tc: any) => tc.category) || [],
    } as Tutor;
  },

  async createProfile(data: TutorProfileData): Promise<Tutor> {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    if (!API_BASE) throw new Error("API base URL is not defined");

    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    const res = await fetch(`${API_BASE}/api/tutors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || "Failed to create tutor profile");
    }

    return res.json();
  },

  /**
   *  Update tutor profile
   */
  async updateProfile(data: Partial<TutorProfileData>): Promise<Tutor> {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    if (!API_BASE) throw new Error("API base URL is not defined");

    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    const res = await fetch(`${API_BASE}/api/tutors/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || "Failed to update tutor profile");
    }

    return res.json();
  },

  async getMyProfile(): Promise<{ data: Tutor | null }> {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    if (!API_BASE) throw new Error("API base URL is not defined");

    try {
      // Import cookies only on server side
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get("next-auth.session-token");

      const res = await fetch(`${API_BASE}/api/tutors/my-profile`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: { tags: ["tutorProfiles"] },
      });

      if (res.status === 404) return { data: null };
      if (!res.ok) throw new Error("Failed to fetch my profile");

      const data = await res.json();
      if (!data) return { data: null };

      return {
        data: {
          ...data,
          categories: data.categories || data.tutorCategories?.map((tc: any) => tc.category) || [],
        },
      };
    } catch (error) {
      console.error("Error in getMyProfile:", error);
      return { data: null };
    }
  },
};
