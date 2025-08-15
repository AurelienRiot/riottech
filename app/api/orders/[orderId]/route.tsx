import { auth } from "@/components/auth/authOptions";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, props: { params: Promise<{ orderId: string | undefined }> }) {
  const params = await props.params;
  try {
    const session = await auth();
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
