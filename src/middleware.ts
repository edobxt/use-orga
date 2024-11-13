import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("auth");
  const isAuthPage = request.nextUrl.pathname === "/login";
  const isManagePage = request.nextUrl.pathname.startsWith("/manage");

  if (!isLoggedIn && isManagePage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/manage", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*", "/login"],
}; 