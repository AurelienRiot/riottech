import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const { searchParams } = new URL(req.url);
    const gte = searchParams.get("gte");
    const lte = searchParams.get("lte");

    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!gte) {
      return new NextResponse("Date de début du range nécessaire", {
        status: 400,
      });
    }

    if (!lte) {
      return new NextResponse("Date de fin du range nécassaire", {
        status: 400,
      });
    }

    const users = await prismadb.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subscriptionOrder: {
          include: {
            subscriptionHistory: {
              where: {
                createdAt: {
                  gte: new Date(gte),
                  lte: new Date(lte),
                },
              },
            },
            subscriptionItem: {
              include: { subscription: true },
            },
          },
        },
        orders: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log("[HISTORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
