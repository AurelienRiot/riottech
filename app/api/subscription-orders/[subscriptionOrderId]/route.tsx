import { auth } from "@/components/auth/authOptions";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, props: { params: Promise<{ subscriptionOrderId: string | undefined }> }) {
  const params = await props.params;
  try {
    const session = await auth();
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

export async function PATCH(req: Request, props: { params: Promise<{ subscriptionOrderId: string | undefined }> }) {
  const params = await props.params;
  try {
    const { isActive } = (await req.json()) as { isActive: boolean };

    const session = await auth();
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
