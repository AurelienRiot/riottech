import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/components/auth/authOptions";

export async function DELETE(req: Request, { params }: { params: { orderId: string | undefined } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!params.orderId) {
      return new NextResponse("L'id de la commande est nécessaire", {
        status: 400,
      });
    }

    const order = await prismadb.order.deleteMany({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
