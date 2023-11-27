import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/components/auth/authOptions";

export async function GET(
  req: Request,
  { params }: { params: { subscriptionId: string } }
) {
  try {
    if (!params.subscriptionId) {
      return new NextResponse("L'id de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    const subscription = await prismadb.subscription.findUnique({
      where: {
        id: params.subscriptionId,
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { subscriptionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const {
      name,
      priceHT,
      description,
      productSpecs,
      fraisActivation,
      recurrence,
      isFeatured,
      isArchived,
    } = body;

    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Le nom de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    if (!fraisActivation) {
      return new NextResponse("Les frais d'activation sont nécessaire", {
        status: 400,
      });
    }

    if (!priceHT) {
      return new NextResponse("Le prix de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    if (!recurrence) {
      return new NextResponse("La recurrence est nécessaire", { status: 400 });
    }

    if (!description) {
      return new NextResponse("La description est nécessaire", { status: 400 });
    }

    if (!productSpecs) {
      return new NextResponse(
        "Les spécifications de l'abonnement sont nécessaire",
        { status: 400 }
      );
    }

    const subscription = await prismadb.subscription.update({
      where: {
        id: params.subscriptionId,
      },
      data: {
        name,
        priceHT,
        priceTTC: priceHT * 1.2,
        description,
        productSpecs,
        fraisActivation,
        recurrence,
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { subscriptionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!params.subscriptionId) {
      return new NextResponse("L'id de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    const subscription = await prismadb.subscription.deleteMany({
      where: {
        id: params.subscriptionId,
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
