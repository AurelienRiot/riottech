import { type JWT, getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = (await getToken({ req, secret })) as (JWT & { exp: number; role?: string }) | null;
  const today = Date.now();
  if (!token || token.exp * 1000 < today) {
    console.log("No token provided middleware");
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url));
  }

  const role = token.role;
  const path = req.nextUrl.pathname;

  if (!role) {
    console.log("Missing role in token middleware");
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url));
  }

  if (path.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url));
    }
  }

  if (path.startsWith("/dashboard-user")) {
    if (!["user", "pro", "admin"].includes(role)) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url));
    }
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard-user/:path*"],
};
