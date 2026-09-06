import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies.get("pf_session");
  let session: any = null;
  try {
    if (cookie) session = JSON.parse(decodeURIComponent(cookie.value));
  } catch {}

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    // allow admin login page
    if (pathname === "/admin/login") return NextResponse.next();
    if (!session || session.role !== "admin") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Protect checkout route
  if (pathname === "/checkout") {
    if (!session || session.role !== "customer") {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("returnTo", "/checkout");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/checkout"],
};
