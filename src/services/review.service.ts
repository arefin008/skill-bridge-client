import { Review } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const reviewService = {
  async create(data: Omit<Review, "id" | "createdAt">) {
    const res = await fetch(`${API_BASE}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create review");
    return res.json();
  },
};
