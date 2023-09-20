import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  { params }: { params: { contactId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!params.contactId) {
      return new NextResponse("L'id du message est nécessaire", {
        status: 400,
      });
    }

    const contact = await prismadb.contact.deleteMany({
      where: {
        id: params.contactId,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.log("[CONTACT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
