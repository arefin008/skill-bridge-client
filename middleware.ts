import { NextRequest } from "next/server";
import { proxy } from "./src/proxy";

export function middleware(request: NextRequest) {
  return proxy(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/tutor-dashboard/:path*",
    "/tutor/:path*",
  ],
};
