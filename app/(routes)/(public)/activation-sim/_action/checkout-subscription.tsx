"use server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { getDbUser, getSessionUser } from "@/server-actions/get-user";
import type { ReturnTypeServerAction } from "@/types";
import type { User } from "@prisma/client";
import type Stripe from "stripe";
import * as z from "zod";

const subscriptionSchema = z.object({
  subscriptionId: z.string(),
  sim: z.string(),
  trialEnd: z.number().optional(),
});

async function checkoutSubscription(data: z.infer<typeof subscriptionSchema>): Promise<ReturnTypeServerAction<string>> {
  const user = await getDbUser();
  if (!user) {
    return {
      success: false,
      message: "Vous devez être authentifier",
    };
  }

  const valided = subscriptionSchema.safeParse(data);
  if (!valided.success) {
    return {
      success: false,
      // message: valided.error.issues[0].message,
      message: "Erreur de validation",
    };
  }

  const stripeCustomerId = await getStripeCustomer(user);

  // const taxe = user.isPro ? 1 : 1.2;0
  const taxe = 1.2;

  const subscription = await prismadb.subscription.findUnique({
    where: {
      id: data.subscriptionId,
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
            sim: data.sim,
          },
        },
        unit_amount: Math.round(subscription.priceHT * 100),
        recurring: {
          interval: subscription.recurrence,
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
    return {
      success: false,
      message: "L'abonnement n'existe pas",
    };
  }

  const subscriptionOrder = await prismadb.subscriptionOrder.create({
    data: {
      isPaid: false,
      totalPrice: Number(((subscription.priceHT + subscription.fraisActivation) * taxe).toFixed(2)),
      subscriptionPrice: Number((subscription.priceHT * taxe).toFixed(2)),
      sim: data.sim,
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
    customer: stripeCustomerId,
    customer_update: {
      name: "never",
      address: isAdresse ? "never" : "auto",
    },
    subscription_data: data.trialEnd
      ? {
          description: `RIOTTECH SIM ${getLastSixNumbers(data.sim)}`,
          trial_end: data.trialEnd,
        }
      : {
          description: `RIOTTECH SIM ${getLastSixNumbers(data.sim)}`,
        },
    // billing_address_collection: isAdresse ? "auto" : "required",
    billing_address_collection: "auto",
    payment_method_types: ["sepa_debit"],
    phone_number_collection: {
      enabled: false,
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard-user?success-subscription=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/activation-sim?canceled=1&sim=${data.sim}&subId=${data.subscriptionId}`,
    metadata: {
      orderId: subscriptionOrder.id,
    },
  });

  if (!sessionStripe.url) {
    return {
      success: false,
      message: "Une erreur est survenue",
    };
  }

  return {
    success: true,
    data: sessionStripe.url,
  };
}

async function getStripeCustomer(user: User) {
  const fullAdress = user.adresse
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

  return stripeCustomerId;
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

export default checkoutSubscription;
