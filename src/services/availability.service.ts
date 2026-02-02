import { clientFetch, serverFetch } from "@/lib/http";

interface AvailabilityData {
  [key: string]: unknown;
}

export const availabilityService = {
  getMine: () => serverFetch("/api/availability"),

  create: (data: AvailabilityData) =>
    clientFetch("/api/availability", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    clientFetch(`/api/availability/${id}`, {
      method: "DELETE",
    }),
};
