import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  { params }: { params: { subscriptionOrderId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!params.subscriptionOrderId) {
      return new NextResponse("L'id de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    const subscriptionOrder = await prismadb.subscriptionOrder.deleteMany({
      where: {
        id: params.subscriptionOrderId,
      },
    });

    return NextResponse.json(subscriptionOrder);
  } catch (error) {
    console.log("[SUBORDER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { subscriptionOrderId: string } }
) {
  try {
    const { isActive } = await req.json();

    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!params.subscriptionOrderId) {
      return new NextResponse("L'id de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    const subscriptionOrder = await prismadb.subscriptionOrder.update({
      where: {
        id: params.subscriptionOrderId,
      },
      data: {
        isActive: isActive,
      },
    });

    return NextResponse.json(subscriptionOrder);
  } catch (error) {
    console.log("[SUBORDER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
