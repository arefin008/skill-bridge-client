import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        url: "/admin/users",
      },
    ],
  },
  {
    title: "Booking Management",
    items: [
      {
        title: "Bookings",
        url: "/admin/bookings",
      },
    ],
  },
  {
    title: "Content Management",
    items: [
      {
        title: "Categories",
        url: "/admin/categories",
      },
    ],
  },
];
