import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./[...nextauth]/route";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  return NextResponse.json({ authenticated: !!session, session });
}
