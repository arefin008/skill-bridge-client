import { clientFetch } from "@/lib/http";

interface ReviewData {
  [key: string]: unknown;
}

export const reviewService = {
  create: (data: ReviewData) =>
    clientFetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
