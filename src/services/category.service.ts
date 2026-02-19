import { Category } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  async getCategories(): Promise<{ data: Category[] }> {
    const res = await fetch(`${API_BASE}/api/categories`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    return { data: Array.isArray(data) ? data : [] };
  },

  async createCategory(name: string) {
    const res = await fetch(`${API_BASE}/api/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error("Failed to create category");
    return res.json();
  },

  async updateCategory(id: string, data: Partial<Category>) {
    const res = await fetch(`${API_BASE}/api/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update category");
    return res.json();
  },
};
