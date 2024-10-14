"use server";

import safeServerAction from "@/lib/server-action";
import * as z from "zod";

const schema = z.object({
  isActive: z.boolean(),
});

async function changeActivity(data: z.infer<typeof schema>) {
  // return await safeServerAction({
  //   schema,
  //   data,
  //   roles: ["admin"],
  //   serverAction: async ({ subscriptionId, sim }) => {
  //     const subscription = await prismadb.subscriptionOrder.findUnique({
  //       where: {
  //         id: subscriptionId,
  //       },
  //       select: {
  //         stripeSubscriptionId: true,
  //       },
  //     });
  //     if (!subscription?.stripeSubscriptionId) {
  //       return {
  //         success: false,
  //         message: "Abonnement introuvable",
  //       };
  //     }
  //     await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
  //       metadata: {
  //         sim,
  //       },
  //     });
  //     await prismadb.subscriptionOrder.update({
  //       where: {
  //         id: subscriptionId,
  //       },
  //       data: {
  //         sim,
  //       },
  //     });
  //     return {
  //       success: true,
  //       message: "Le numéro de SIM a bien été modifié",
  //       data: null,
  //     };
  //   },
  // });
}
