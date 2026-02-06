import { Route } from "@/types";

export const studentRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Home",
        url: "/dashboard",
      },
      {
        title: "Bookings",
        url: "/dashboard/bookings",
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
    ],
  },
];
