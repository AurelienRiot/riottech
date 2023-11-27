import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/components/auth/authOptions";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { label, imageUrl } = body;

    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Le nom du panneau d'affichage est necéssaire", {
        status: 400,
      });
    }

    if (!imageUrl) {
      return new NextResponse("L'url de l'image est néessaire", {
        status: 400,
      });
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const billboards = await prismadb.billboard.findMany({});

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
