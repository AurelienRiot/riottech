import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { authOptions } from "@/components/auth/authOptions";
import { getServerSession } from "next-auth";

export async function GET(req: Request, { params }: { params: { categoryId: string | undefined } }) {
  try {
    if (!params.categoryId) {
      return new NextResponse("L'id de la categorie est nécessaire", {
        status: 400,
      });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    if (!category) {
      return new NextResponse("La categorie n'existe pas", { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { categoryId: string | undefined } }) {
  try {
    const body = (await req.json()) as { name: string | undefined; imageUrl: string | undefined };
    const { name, imageUrl } = body;

    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Le nom de la categorie est nécessaire", {
        status: 400,
      });
    }

    if (!imageUrl) {
      return new NextResponse("L'image est nécessaire", {
        status: 400,
      });
    }

    if (!params.categoryId) {
      return new NextResponse("L'id de la categorie est necéssaire", {
        status: 400,
      });
    }

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { categoryId: string | undefined } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("L'id de la catégorie est nécessaire", {
        status: 400,
      });
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
