import { auth } from "@/src/app/(admin)/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  // Protect /admin and any sub-route under it
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  // Only match actual browser paths (App Router strips group folders like '(admin)' from URLs)
  matcher: ["/admin/:path*"],
};