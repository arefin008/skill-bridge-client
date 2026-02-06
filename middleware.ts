import { NextRequest } from "next/server";
import { proxy } from "./src/proxy";

export function middleware(request: NextRequest) {
  return proxy(request);
}

export const config = {
  matcher: [
    // "/dashboard",
    // "/dashboard/:path*",
    // "/admin-dashboard",
    // "/admin-dashboard/:path*",
    // "/tutor/:path*",
    // "/student/:path*",
  ],
};
