import { Route } from "@/types";

export const studentRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
      {
        title: "My Bookings",
        url: "/dashboard/bookings",
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
    ],
  },
];
