import { authOptions } from "@/components/auth/authOptions";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ userId: string | undefined }> }) {
  const params = await props.params;
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

export async function DELETE(req: Request, props: { params: Promise<{ userId: string | undefined }> }) {
  const params = await props.params;
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

export async function PATCH(req: Request, props: { params: Promise<{ userId: string | undefined }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const body = (await req.json()) as {
      name: string | undefined;
      surname: string | undefined;
      phone: string | undefined;
      adresse: string | undefined;
      tva: string | undefined;
      raisonSocial: string | undefined;
      isPro: boolean | undefined;
    };
    const { name, surname, phone, adresse, tva, raisonSocial, isPro } = body;

    if (!name) {
      return new NextResponse("Le nom de l'utilisateur est nécessaire", {
        status: 400,
      });
    }

    if (!adresse) {
      return new NextResponse("Erreur dans l'adresse", {
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
      await stripe.customers.update(user.stripeCustomerId, {
        name: raisonSocial ? raisonSocial : name + " " + surname,
        // tax_exempt: isPro ? "exempt" : "none",
        tax_exempt: "none",
        shipping: {
          name: raisonSocial ? raisonSocial : name + " " + surname,
          address: {
            line1: fullAdress.line1,
            line2: fullAdress.line2,
            city: fullAdress.city,
            state: fullAdress.state,
            postal_code: fullAdress.postalCode,
            country: fullAdress.country,
          },
        },
        address: {
          line1: fullAdress.line1,
          line2: fullAdress.line2,
          city: fullAdress.city,
          state: fullAdress.state,
          postal_code: fullAdress.postalCode,
          country: fullAdress.country,
        },
        preferred_locales: [fullAdress.country ? fullAdress.country : "FR"],
        metadata: tva
          ? {
              tva,
            }
          : null,
      });

      const paymentMethods = await stripe.paymentMethods.list({
        customer: user.stripeCustomerId,
      });
      for (const paymentMethod of paymentMethods.data) {
        await stripe.paymentMethods.update(paymentMethod.id, {
          billing_details: {
            name: raisonSocial ? raisonSocial : name + " " + surname,
            address: {
              line1: fullAdress.line1,
              line2: fullAdress.line2,
              city: fullAdress.city,
              state: fullAdress.state,
              postal_code: fullAdress.postalCode,
              country: fullAdress.country,
            },
          },
        });
      }
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
