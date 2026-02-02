import { clientFetch, serverFetch } from "@/lib/http";

interface CategoryData {
  [key: string]: unknown;
}

export const categoryService = {
  getAll: () => serverFetch("/api/categories"),

  create: (data: CategoryData) =>
    clientFetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: CategoryData) =>
    clientFetch(`/api/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};
