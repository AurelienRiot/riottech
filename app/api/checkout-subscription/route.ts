import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/strip";

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const {
      subscriptionId,
      sim,
      totalPrice,
      subscriptionPrice,
      fraisActivation,
      recurrence,
    } = await req.json();

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Erreur essayer de vous reconnecter", {
        status: 401,
      });
    }

    if (!subscriptionId || subscriptionId.length === 0) {
      return new NextResponse("L'id de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    if (!sim || subscriptionId.length === 0) {
      return new NextResponse("Le numéros de sim est nécessaire", {
        status: 400,
      });
    }

    if (!totalPrice || totalPrice.length === 0) {
      return new NextResponse("Le prix total est nécessaire", {
        status: 400,
      });
    }

    if (!recurrence || recurrence.length === 0) {
      return new NextResponse("La récurrence de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    if (!fraisActivation || fraisActivation.length === 0) {
      return new NextResponse("La récurrence de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    if (!subscriptionPrice || subscriptionPrice.length === 0) {
      return new NextResponse("La récurrence de l'abonnement est nécessaire", {
        status: 400,
      });
    }

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
          unit_amount: Math.floor(Number(subscriptionPrice) * 100),
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
          unit_amount: Math.floor(Number(fraisActivation) * 100),
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
        totalPrice: totalPrice,
        subscriptionPrice: subscriptionPrice,
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
        userId: session.user.id,
      },
    });

    const sessionStripe = await stripe.checkout.sessions.create({
      line_items,
      mode: "subscription",
      automatic_tax: {
        enabled: true,
      },
      customer: session.user.stripeCustomerId,
      customer_update: { name: "never", address: "never" },
      billing_address_collection: "auto",
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
