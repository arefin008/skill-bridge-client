import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { UserRole } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  try {
    const { data } = await userService.getSession();
    const user = data?.user;

    // If no user session, redirect to login
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Immediately kick out banned users who managed to login
    // This forcibly prevents any BANNED user from accessing protected areas
    if (user.status === "BANNED") {
      // Create a redirect response that routes context to an error page or login with warning
      const redirectResponse = NextResponse.redirect(new URL("/login?error=banned", request.url));
      
      // Optionally we can explicitly clear the better-auth cookie here if desired,
      // but the redirect back to an unauthenticated context is the most crucial requirement.
      return redirectResponse;
    }

    const userRole = user.role;

    // Role-based routing logic
    if (userRole === UserRole.admin) {
      // Admin trying to access student/tutor routes
      if (pathname.startsWith("/dashboard") || pathname.startsWith("/tutor")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
      }
    } else if (userRole === UserRole.student) {
      // Student trying to access admin/tutor routes
      if (
        pathname.startsWith("/admin-dashboard") ||
        pathname.startsWith("/tutor")
      ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } else if (userRole === UserRole.tutor) {
      // Tutor trying to access admin/student routes
      if (
        pathname.startsWith("/admin-dashboard") ||
        pathname.startsWith("/dashboard")
      ) {
        return NextResponse.redirect(
          new URL("/tutor-dashboard/dashboard", request.url),
        );
      }
    }

    return NextResponse.next();
  } catch {
    // If session check fails, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*", "/tutor/:path*"],
};
