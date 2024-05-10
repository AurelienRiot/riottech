import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/components/auth/authOptions";
import { stripe } from "@/lib/stripe";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!params.userId) {
      return new NextResponse("L'id de l'utilisateur est nécessaire", {
        status: 400,
      });
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: params.userId,
      },
      include: {
        subscriptionOrder: {
          include: {
            subscriptionItem: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        orders: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            orderItems: true,
          },
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!params.userId) {
      return new NextResponse("L'id de l'utilisateur est nécessaire", {
        status: 400,
      });
    }

    const user = await prismadb.user.deleteMany({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const body = await req.json();
    const { name, surname, phone, adresse, tva, raisonSocial, isPro } = body;

    if (!name) {
      return new NextResponse("Le nom de l'utilisateur est nécessaire", {
        status: 400,
      });
    }

    if (!params.userId) {
      return new NextResponse("L'id de l'utilisateur est nécessaire", {
        status: 400,
      });
    }

    const user = await prismadb.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name,
        surname,
        phone,
        adresse,
        tva,
        raisonSocial,
        role: isPro ? "pro" : "user",
      },
    });

    const fullAdress = JSON.parse(adresse);

    if (user.stripeCustomerId) {
      const customer = await stripe.customers.update(user.stripeCustomerId, {
        name: raisonSocial ? raisonSocial : name + " " + surname,
        // tax_exempt: isPro ? "exempt" : "none",
        tax_exempt: "none",
        address: {
          line1: fullAdress.line1,
          line2: fullAdress.line2,
          city: fullAdress.city,
          state: fullAdress.state,
          postal_code: fullAdress.postal_code,
          country: fullAdress.country,
        },
        preferred_locales: [fullAdress.country ? fullAdress.country : "FR"],
        metadata: {
          tva: tva,
        },
      });
    } else {
      return new NextResponse("Erreur, essayer de vous reconnecter", {
        status: 400,
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
