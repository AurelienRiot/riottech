import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth/authOptions";
import type { FullAdress } from "@/components/adress-form";

export async function POST(req: NextRequest) {
  try {
    const { subscriptionId, sim, trialEnd } = (await req.json()) as {
      subscriptionId: string | undefined;
      sim: string | undefined;
      trialEnd: number | undefined;
    };

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Erreur essayer de vous reconnecter", {
        status: 401,
      });
    }

    if (session.user.role === "admin") {
      return new NextResponse("Erreur, un compte admin ne peut passer de commande", {
        status: 401,
      });
    }

    if (!subscriptionId) {
      return new NextResponse("L'id de l'abonnement est nécessaire", {
        status: 400,
      });
    }

    if (!sim) {
      return new NextResponse("Le numéro de sim est nécessaire", {
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

    const fullAdress: FullAdress = user.adresse
      ? JSON.parse(user.adresse)
      : {
          line1: "",
          line2: "",
          city: "",
          postalCode: "",
          state: "",
          country: "fr",
        };
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        name: user.raisonSocial ? user.raisonSocial : user.name + " " + user.surname,
        email: user.email || undefined,
        phone: user.phone || undefined,
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
          tva: user.tva,
        },
      });
      stripeCustomerId = customer.id;

      await prismadb.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId,
        },
      });
    }

    // const taxe = user.isPro ? 1 : 1.2;0
    const taxe = 1.2;

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
          unit_amount: Math.round(subscription.priceHT * 100),
          recurring: {
            interval: subscription.recurrence as Stripe.Price.Recurring.Interval,
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
          unit_amount: Math.round(subscription.fraisActivation * 100),
        },
      });
    } else {
      return new NextResponse("L'abonnement n'existe pas", {
        status: 400,
      });
    }

    const trial_end = trialEnd || Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days from now

    const subscriptionOrder = await prismadb.subscriptionOrder.create({
      data: {
        isPaid: false,
        totalPrice: Number(((subscription.priceHT + subscription.fraisActivation) * taxe).toFixed(2)),
        subscriptionPrice: Number((subscription.priceHT * taxe).toFixed(2)),
        sim: sim,
        isActive: false,
        subscriptionItem: {
          create: {
            name: subscription.name,
            priceHT: subscription.priceHT,
            fraisActivation: subscription.fraisActivation,
            recurrence: subscription.recurrence,
          },
        },
        userId: user.id,
      },
    });

    const isAdresse = Boolean(JSON.parse(user.adresse as string)?.label);

    const sessionStripe = await stripe.checkout.sessions.create({
      line_items,
      mode: "subscription",
      automatic_tax: {
        enabled: true,
      },
      customer: stripeCustomerId || undefined,
      customer_update: {
        name: "never",
        address: isAdresse ? "never" : "auto",
      },
      subscription_data: {
        description: `RIOTTECH SIM ${getLastSixNumbers(String(sim))}`,
        trial_end,
      },
      // billing_address_collection: isAdresse ? "auto" : "required",
      billing_address_collection: "auto",
      payment_method_types: ["sepa_debit"],
      phone_number_collection: {
        enabled: false,
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard-user?success-subscription=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/activation-sim?canceled=1&sim=${sim}&subId=${subscriptionId}`,
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

function getLastSixNumbers(inputString: string): string {
  // Use a regular expression to extract all numbers from the input string
  const numbers = inputString.match(/\d/g);
  if (numbers === null) {
    // Return an error message or handle the case where no numbers are found
    return "No numbers found";
  }

  // Join the numbers back into a string and then take the last six characters
  const lastSix = numbers.join("").slice(-6);

  return lastSix;
}
