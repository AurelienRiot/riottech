import { authOptions } from "@/components/auth/authOptions";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("L'id du produit est nécessaire", {
        status: 400,
      });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const {
      name,
      priceHT,
      categoryId,
      description,
      productSpecs,
      images,
      isFeatured,
      isArchived,
    } = body;

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
      return new NextResponse("La categorie du produit est nécessaire", {
        status: 400,
      });
    }

    if (!description) {
      return new NextResponse("La description du produit est nécessaire", {
        status: 400,
      });
    }

    if (!productSpecs) {
      return new NextResponse("Les spécifications du produit sont nécessaire", {
        status: 400,
      });
    }

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        priceHT,
        priceTTC: priceHT * 1.2,
        categoryId,
        description,
        productSpecs,
        images: {
          deleteMany: {},
        },
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

    return NextResponse.json("product updated");
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("L'id du produit est nécessaire", {
        status: 400,
      });
    }

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json("product deleted");
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
