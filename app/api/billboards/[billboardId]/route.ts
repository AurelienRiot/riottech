import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("L'id du panneau d'affichage est necéssaire", {
        status: 400,
      });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    if (!billboard) {
      return new NextResponse("Le panneau d'affichage n'existe pas", {
        status: 404,
      });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const body = await req.json();
    const { label, imageUrl } = body;

    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Le nom du panneau d'affichage est necéssaire", {
        status: 400,
      });
    }

    if (!imageUrl) {
      return new NextResponse("L'url de l'image est néessaire", {
        status: 400,
      });
    }

    if (!params.billboardId) {
      return new NextResponse("L'id du panneau d'affichage est necéssaire", {
        status: 400,
      });
    }

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    if (!billboard) {
      return new NextResponse("Le panneau d'affichage n'existe pas", {
        status: 404,
      });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("L'id du panneau d'affichage est necéssaire", {
        status: 400,
      });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
