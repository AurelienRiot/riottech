import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const baseUrl = process.env.NEXT_PUBLIC_URL;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    console.log("No token provided middleware");
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url),
    );
  }

  try {
    const apiResponse = await fetch(`${baseUrl}/api/auth`, {
      method: "POST",
      headers: new Headers(req.headers),
    });

    if (!apiResponse.ok) {
      console.error("BaseUrl", baseUrl);
      console.error("API call failed:", apiResponse.statusText);
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url),
      );
    }

    // Optional: Handle the data from the response
    const { role } = (await apiResponse.json()) as { role: string };

    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin")) {
      if (role !== "admin") {
        return NextResponse.redirect(
          new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url),
        );
      }
    }

    if (path.startsWith("/dashboard-user")) {
      if (!["user", "pro", "admin"].includes(role)) {
        return NextResponse.redirect(
          new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url),
        );
      }
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }
    return NextResponse.next();
  } catch (error) {
    console.error("API call failed:", error);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url),
    );
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard-user/:path*"],
};
