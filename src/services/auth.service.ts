import { serverFetch } from "@/lib/http";

export const authService = {
  getCurrentUser: async () => {
    try {
      return await serverFetch("/api/auth/me");
    } catch {
      return null;
    }
  },
};
