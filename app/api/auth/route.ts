import { authOptions } from "@/components/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  return NextResponse.json({ authenticated: !!session, session });
}
