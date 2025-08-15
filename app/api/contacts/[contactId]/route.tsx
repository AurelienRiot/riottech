import { auth } from "@/components/auth/authOptions";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, props: { params: Promise<{ contactId: string | undefined }> }) {
  const params = await props.params;
  try {
    const session = await auth();

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
