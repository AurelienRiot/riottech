import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { authOptions } from "@/components/auth/authOptions";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name: string | undefined;
      priceHT: number | undefined;
      categoryId: string | undefined;
      description: string | undefined;
      productSpecs: string | undefined;
      images: { url: string }[] | undefined;
      isFeatured: boolean | undefined;
      isArchived: boolean | undefined;
    };

    const { name, priceHT, categoryId, description, productSpecs, images, isFeatured, isArchived } = body;

    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Le nom du produit est nécessaire", {
        status: 400,
      });
    }

    if (!images || !images.length) {
      return new NextResponse("Une image est nécessaire", { status: 400 });
    }

    if (!priceHT) {
      return new NextResponse("Le prix du produit est nécessaire", {
        status: 400,
      });
    }

    if (!categoryId) {
      return new NextResponse("La catégorie du produit est nécessaire", {
        status: 400,
      });
    }

    if (!description) {
      return new NextResponse("La description du produits est nécessaire", {
        status: 400,
      });
    }

    if (!productSpecs) {
      return new NextResponse("Les spécification du produits sont nécessaire", {
        status: 400,
      });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        priceHT,
        priceTTC: priceHT * 1.2,
        categoryId,
        description,
        productSpecs,
        isFeatured,
        isArchived,
      },
    });

    for (const image of images) {
      await prismadb.image.create({
        data: {
          url: image.url,
          productId: product.id,
        },
      });
    }

    return NextResponse.json("product created");
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    const products = await prismadb.product.findMany({
      where: {
        categoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
