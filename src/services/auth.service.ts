export const authService = {
  getCurrentUser: async () => {
    try {
      return null;
      // return await serverFetch("/api/auth/me");
    } catch {
      return null;
    }
  },
};
