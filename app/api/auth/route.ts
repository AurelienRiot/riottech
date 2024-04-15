import prismadb from "@/lib/prismadb";
import { JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as any;

    const token = body.token as JWT;
    if (!token || !token.id) {
      return new NextResponse("No token provided", { status: 401 });
    }
    const user = await prismadb.user.findUnique({
      where: {
        id: token.id,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 401 });
    }

    return NextResponse.json({ role: user.role });
  } catch (error) {
    console.log("[AUTH_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
