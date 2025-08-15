import { auth } from "@/components/auth/authOptions";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { name: string | undefined; imageUrl: string | undefined };

    const { name, imageUrl } = body;

    const session = await auth();
    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Le nom de la categorie es nécessaire", {
        status: 400,
      });
    }

    if (!imageUrl) {
      return new NextResponse("Une image est nécessaire", {
        status: 400,
      });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const categories = await prismadb.category.findMany({});

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
