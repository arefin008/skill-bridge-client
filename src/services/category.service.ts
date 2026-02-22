import { Category } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  async getCategories(): Promise<{ data: Category[] }> {
    const isServer = typeof window === "undefined";
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    let url = `/api/categories`;
    let headers: Record<string, string> = {};

    if (isServer) {
      if (!API_BASE) {
        console.error("NEXT_PUBLIC_API_URL is not defined");
        return { data: [] };
      }
      url = `${API_BASE}/api/categories`;
    }

    try {
      const res = await fetch(url, {
        headers,
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Failed to fetch categories:", res.status, res.statusText);
        return { data: [] };
      }

      const data = await res.json();
      return { data: Array.isArray(data) ? data : [] };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { data: [] };
    }
  },

  async createCategory(name: string) {
    const isServer = typeof window === "undefined";
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    let url = `/api/categories`;
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}/api/categories`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || errorData.error || "Failed to create category",
      );
    }
    return res.json();
  },

  async updateCategory(id: string, data: Partial<Category>) {
    const isServer = typeof window === "undefined";
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    let url = `/api/categories/${id}`;
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}/api/categories/${id}`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || errorData.error || "Failed to update category",
      );
    }
    return res.json();
  },
};
