import { auth } from "@/components/auth/authOptions";
import prismadb from "@/lib/prismadb";
import { Recurrence } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ subscriptionId: string | undefined }> }) {
  const params = await props.params;
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

export async function PATCH(req: Request, props: { params: Promise<{ subscriptionId: string | undefined }> }) {
  const params = await props.params;
  try {
    const session = await auth();
    const body = (await req.json()) as {
      name: string | undefined;
      priceHT: number | undefined;
      fraisActivation: number | undefined;
      recurrence: string | undefined;
      dataCap: number | undefined;
      description: string | undefined;
      productSpecs: string | undefined;
      isFeatured: boolean | undefined;
      isArchived: boolean | undefined;
    };
    const { name, priceHT, description, productSpecs, fraisActivation, recurrence, dataCap, isFeatured, isArchived } =
      body;

    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Le nom de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    if (!priceHT) {
      return new NextResponse("Le prix de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    if (!recurrence || !Object.values(Recurrence).includes(recurrence as Recurrence)) {
      return new NextResponse("La récurrence est invalide", { status: 400 });
    }

    if (!dataCap) {
      return new NextResponse("La limite de donnée est nécessaire", {
        status: 400,
      });
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
        dataCap,
        fraisActivation: fraisActivation ? fraisActivation : 0,
        recurrence: recurrence as Recurrence,
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

export async function DELETE(req: Request, props: { params: Promise<{ subscriptionId: string | undefined }> }) {
  const params = await props.params;
  try {
    const session = await auth();

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
