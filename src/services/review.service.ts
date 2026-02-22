import { Review } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const reviewService = {
  async create(data: Omit<Review, "id" | "createdAt">) {
    const isServer = typeof window === "undefined";
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    let url = `/api/reviews`;
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (isServer) {
      if (!API_BASE) throw new Error("API base URL is not defined");
      url = `${API_BASE}/api/reviews`;
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers["Cookie"] = cookieStore.toString();
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create review");
    return res.json();
  },
};
