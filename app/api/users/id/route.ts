import prismadb from "@/lib/prismadb";
import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth/authOptions";
import { revalidateTag } from "next/cache";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Erreur, essayer de vous reconnecter", {
        status: 401,
      });
    }

    const user = await prismadb.user.deleteMany({
      where: {
        id: session.user.id,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, surname, phone, adresse, tva, raisonSocial, isPro } = body;

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Erreur, essayer de vous reconnecter", {
        status: 401,
      });
    }

    if (!name) {
      return new NextResponse("Le nom de l'utilisateur est nécessaire", {
        status: 400,
      });
    }

    const user = await prismadb.user.update({
      where: {
        id: session.user.id,
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
        metadata: {
          tva: tva,
        },
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
      const customer = await stripe.customers.create({
        name: raisonSocial ? raisonSocial : name + " " + surname,
        email: user.email || undefined,
        phone: phone,
        // tax_exempt: isPro ? "exempt" : "none",
        tax_exempt: "none",
        address: {
          line1: fullAdress.line1,
          line2: fullAdress.line2,
          city: fullAdress.city,
          postal_code: fullAdress.postalCode,
          state: fullAdress.state,
          country: fullAdress.country,
        },

        preferred_locales: [fullAdress.country ? fullAdress.country : "FR"],
        metadata: {
          tva: tva,
        },
      });

      await prismadb.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          stripeCustomerId: customer.id,
        },
      });
    }
    revalidateTag("getDbUserCache");

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
