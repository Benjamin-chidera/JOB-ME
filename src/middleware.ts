import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If the user is authenticated, allow access
    if (req.nextauth.token) {
      return NextResponse.next();
    }

    // If not authenticated, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/jobs", "/employer/post-jobs", "/jobs/:path*"],
};
