import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const baseUrl = process.env.NEXT_PUBLIC_URL;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url),
    );
  }

  try {
    const apiResponse = await fetch(`${baseUrl}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token }),
    });

    if (!apiResponse.ok) {
      new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url);
    }

    // Optional: Handle the data from the response
    const { role } = (await apiResponse.json()) as { role: string };

    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin")) {
      if (role !== "admin") {
        new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url);
      }
    }

    if (path.startsWith("/dashboard-user")) {
      if (!["user", "pro", "admin"].includes(role)) {
        new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url);
      }
    }
    return NextResponse.next();
  } catch (error) {
    console.error("API call failed:", error);
    new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard-user/:path*"],
};
