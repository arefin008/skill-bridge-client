import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Admin Bookings",
        url: "/admin-dashboard/bookings",
      },
      {
        title: "Admin Categories",
        url: "/admin-dashboard/categories",
      },
      {
        title: "User",
        url: "/admin-dashboard/users",
      },
    ],
  },
];
