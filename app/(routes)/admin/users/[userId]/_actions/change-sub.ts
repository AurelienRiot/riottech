"use server";

import prismadb from "@/lib/prismadb";
import safeServerAction from "@/lib/server-action";
import { stripe, taxe } from "@/lib/stripe";
import { addDays } from "date-fns";
import type Stripe from "stripe";
import * as z from "zod";

const subSchema = z.object({
  subId: z.string(),
  subscriptionId: z.string(),
});

async function changeSub(data: z.infer<typeof subSchema>) {
  return await safeServerAction({
    schema: subSchema,
    data,
    roles: ["admin"],
    serverAction: async ({ subscriptionId, subId }) => {
      const subscription = await prismadb.subscriptionOrder.findUnique({
        where: {
          id: subscriptionId,
        },
        select: {
          stripeSubscriptionId: true,
          sim: true,
          subscriptionItem: { select: { recurrence: true } },
          subscriptionHistory: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      });
      if (!subscription?.stripeSubscriptionId) {
        return {
          success: false,
          message: "Abonnement stripe introuvable",
        };
      }

      const newSubscription = await prismadb.subscription.findUnique({
        where: {
          id: subId,
        },
      });

      if (!newSubscription) {
        return {
          success: false,
          message: "Abonnement introuvable",
        };
      }
      const oldStripeSub = await stripe.subscriptions.retrieve(subscription.stripeSubscriptionId);

      const product = await stripe.products.create({
        name: newSubscription.name,
        tax_code: "txcd_99999999",
        metadata: {
          sim: subscription.sim,
        },
      });

      const price = await stripe.prices.create({
        unit_amount: Math.round(newSubscription.priceHT * 100),
        currency: "EUR",
        recurring: { interval: newSubscription.recurrence as Stripe.Price.Recurring.Interval },
        product: product.id,
        tax_behavior: "exclusive",
      });

      const itemId = oldStripeSub.items.data[0].id;
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        proration_behavior: "none",
        items: [
          {
            id: itemId,
            price: price.id,
          },
        ],
      });

      const nextRecurrence = subscription.subscriptionItem
        ? addDays(
            subscription.subscriptionHistory[0]?.createdAt,
            subscription.subscriptionItem.recurrence === "day"
              ? 1
              : subscription.subscriptionItem.recurrence === "week"
                ? 7
                : subscription.subscriptionItem.recurrence === "month"
                  ? 30
                  : 365,
          )
        : undefined;
      await prismadb.subscriptionOrder.update({
        where: {
          id: subscriptionId,
        },
        data: {
          name: newSubscription.name,
          totalPrice: Number(((newSubscription.priceHT + newSubscription.fraisActivation) * taxe).toFixed(2)),
          subscriptionPrice: Number((newSubscription.priceHT * taxe).toFixed(2)),
          subscriptionItem: {
            update: {
              name: newSubscription.name,
              priceHT: newSubscription.priceHT,
              recurrence: newSubscription.recurrence,
              dataCap: newSubscription.dataCap,
              description: nextRecurrence ? nextRecurrence.toISOString() : undefined,
            },
          },
        },
      });

      return {
        success: true,
        message: "L'abonnement a bien été modifié",
        data: null,
      };
    },
  });
}

export default changeSub;
