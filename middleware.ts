import { type JWT, getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const baseUrl = process.env.NEXT_PUBLIC_URL;

export async function middleware(req: NextRequest) {
  const token = (await getToken({ req, secret })) as (JWT & { exp: number }) | null;
  const today = Date.now();
  if (!token || token.exp * 1000 < today) {
    console.log("No token provided middleware");
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url));
  }

  try {
    const apiResponse = await fetch(`${baseUrl}/api/auth`, {
      method: "GET",
      headers: {
        Cookie: (await cookies())
          .getAll()
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; "),
      },
      cache: "no-store",
    });

    if (!apiResponse.ok) {
      console.log("BaseUrl", baseUrl);
      console.log("API call error:", apiResponse.statusText);
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url));
    }

    // // Optional: Handle the data from the response
    const { role } = (await apiResponse.json()) as { role: string };
    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin")) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}&error=admin`, req.url));
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
  } catch (error) {
    console.log("path", req.nextUrl.pathname);
    console.log("API call failed:", error);
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard-user/:path*"],
};
