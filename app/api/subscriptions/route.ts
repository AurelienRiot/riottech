import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { authOptions } from "@/components/auth/authOptions";
import { getServerSession } from "next-auth";
import { Recurrence } from "@prisma/client";

export async function POST(req: Request) {
  try {
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

    const { name, priceHT, fraisActivation, recurrence, dataCap, description, productSpecs, isFeatured, isArchived } =
      body;

    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Le nom de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    if (!recurrence || !Object.values(Recurrence).includes(recurrence as Recurrence)) {
      return new NextResponse("La récurrence est invalide", { status: 400 });
    }

    if (!priceHT) {
      return new NextResponse("Le prix de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    if (!recurrence) {
      return new NextResponse("La récurrence est nécessaire", { status: 400 });
    }

    if (!dataCap) {
      return new NextResponse("La limite de donnée est necessaire", {
        status: 400,
      });
    }

    const subscriptions = await prismadb.subscription.create({
      data: {
        name,
        priceHT,
        priceTTC: priceHT * 1.2,
        dataCap,
        description: description ? description : "",
        productSpecs: productSpecs ? productSpecs : "",
        fraisActivation: fraisActivation ? fraisActivation : 0,
        recurrence: recurrence as Recurrence,
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(subscriptions);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const isFeatured = searchParams.get("isFeatured");

    const subscriptions = await prismadb.subscription.findMany({
      where: {
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(subscriptions);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
