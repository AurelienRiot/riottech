import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/strip";

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth/authOptions";

export async function POST(req: NextRequest) {
  try {
    const { subscriptionId, sim } = await req.json();

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Erreur essayer de vous reconnecter", {
        status: 401,
      });
    }

    if (session.user.role === "admin") {
      return new NextResponse(
        "Erreur, un compte admin ne peut passer de commande",
        {
          status: 401,
        }
      );
    }

    if (!subscriptionId) {
      return new NextResponse("L'id de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    if (!sim) {
      return new NextResponse("Le numéros de sim est nécessaire", {
        status: 400,
      });
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return new NextResponse("Erreur essayer de vous reconnecter", {
        status: 401,
      });
    }
    const taxe = user.isPro ? 1 : 1.2;

    const subscription = await prismadb.subscription.findUnique({
      where: {
        id: subscriptionId,
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    if (subscription) {
      line_items.push({
        quantity: 1,

        price_data: {
          currency: "EUR",
          tax_behavior: "exclusive",

          product_data: {
            tax_code: "txcd_99999999",
            name: subscription.name,
            metadata: {
              sim: sim,
            },
          },
          unit_amount: Number(subscription.priceHT.toFixed(2)) * 100,
          recurring: {
            interval: "day",
          },
        },
      });
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "EUR",
          tax_behavior: "exclusive",

          product_data: {
            tax_code: "txcd_99999999",

            name: "Frais d'activation",
          },
          unit_amount: Number(subscription.fraisActivation.toFixed(2)) * 100,
        },
      });
    } else {
      return new NextResponse("L'abonnement n'existe pas", {
        status: 400,
      });
    }

    const subscriptionOrder = await prismadb.subscriptionOrder.create({
      data: {
        isPaid: false,
        totalPrice: Number(
          (
            (subscription.priceHT + subscription.fraisActivation) *
            taxe
          ).toFixed(2)
        ),
        subscriptionPrice: Number((subscription.priceHT * taxe).toFixed(2)),
        sim: sim,
        isActive: false,
        subscriptionItem: {
          create: {
            subscription: {
              connect: {
                id: subscriptionId,
              },
            },
          },
        },
        userId: user.id,
      },
    });

    const isAdresse = Boolean(JSON.parse(user.adresse).label);

    const sessionStripe = await stripe.checkout.sessions.create({
      line_items,
      mode: "subscription",
      automatic_tax: {
        enabled: true,
      },
      customer: session.user.stripeCustomerId,
      customer_update: {
        name: "never",
        address: isAdresse ? "never" : "auto",
      },
      billing_address_collection: isAdresse ? "auto" : "required",
      payment_method_types: ["sepa_debit", "card"],
      phone_number_collection: {
        enabled: false,
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard-user?success-subscription=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/activation-sim?canceled=1`,
      metadata: {
        orderId: subscriptionOrder.id,
      },
    });

    return NextResponse.json({ url: sessionStripe.url });
  } catch (error) {
    console.log("[CHECKOUT_SUBSCRIPTION_ERROR]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
