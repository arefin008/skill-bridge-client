import { NextRequest, NextResponse } from "next/server";

const UserRole = {
  admin: "ADMIN",
  student: "STUDENT",
  tutor: "TUTOR",
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  try {
    const sessionToken = request.cookies.get("better-auth.session_token")?.value;
    
    // If no user session cookie, immediately redirect to login
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Verify token strictly via native fetch so we don't import huge Next/Node abstractions in Edge runtime
    const sessionRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`, {
      headers: {
        cookie: `better-auth.session_token=${sessionToken}`,
      },
    });

    const sessionData = await sessionRes.json();
    const user = sessionData?.user;

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Immediately kick out banned users who managed to login
    if (user.status === "BANNED") {
      return NextResponse.redirect(new URL("/login?error=banned", request.url));
    }

    const userRole = user.role;

    // Role-based routing logic
    if (userRole === UserRole.admin) {
      if (pathname.startsWith("/dashboard") || pathname.startsWith("/tutor-dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
      }
    } else if (userRole === UserRole.student) {
      if (
        pathname.startsWith("/admin-dashboard") ||
        pathname.startsWith("/tutor-dashboard")
      ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } else if (userRole === UserRole.tutor) {
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
  runtime: "experimental-edge",
};
