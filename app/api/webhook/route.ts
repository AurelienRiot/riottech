import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/strip";
import prismadb from "@/lib/prismadb";

const PDF_URL = process.env.PDF_URL;
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOKS_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Eror: ${error.message}`, { status: 400 });
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    const addressComponents = [
      address?.line1,
      address?.line2,
      address?.city,
      address?.state,
      address?.postal_code,
      address?.country,
    ];
    const addressString = addressComponents
      .filter((c) => c !== null)
      .join(", ");

    if (event.type === "checkout.session.completed") {
      const orderId = session?.metadata?.orderId;
      const paymentInvoiceId = session.invoice as string;
      const paymentIntentId = session.payment_intent as string;

      let chargeId;
      if (paymentInvoiceId) {
        const paymentInvoice = await stripe.invoices.retrieve(paymentInvoiceId);
        chargeId = paymentInvoice.charge;
      } else {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntentId
        );
        chargeId = paymentIntent.latest_charge;
      }

      const order = await prismadb.order.findUnique({
        where: {
          id: orderId,
        },
      });

      if (order) {
        await prismadb.order.update({
          where: {
            id: orderId,
          },
          data: {
            isPaid: true,
            address: addressString,
            name: session?.customer_details?.name || "",
            phone: session?.customer_details?.phone || "",
            pdfUrl: `${PDF_URL}/get_pdf?mode=inline&charge_id=${chargeId}`,
          },
        });
      } else {
        const subscription = await stripe.subscriptions.retrieve(
          session?.subscription as string
        );

        const subscriptionOrder = await prismadb.subscriptionOrder.update({
          where: {
            id: orderId,
          },
          data: {
            isPaid: true,
            isActive: true,
            stripeSubscriptionId: subscription.id,
            address: addressString,
            name: session?.customer_details?.name || "",
            phone: session?.customer_details?.phone || "",
            pdfUrl: `${PDF_URL}/get_pdf?mode=inline&charge_id=${chargeId}`,
          },
        });

        await prismadb.subscriptionHistory.create({
          data: {
            subscriptionOrderId: subscriptionOrder.id,
            idStripe: session.id,
            price: subscriptionOrder.totalPrice,
            status: "Paid",
            pdfUrl: `${PDF_URL}/get_pdf?mode=inline&charge_id=${chargeId}`,
          },
        });
      }
    }

    if (event.type === "customer.subscription.updated") {
      const subscription = await stripe.subscriptions.retrieve(
        session?.id as string
      );

      const subscriptionOrder = await prismadb.subscriptionOrder.findUnique({
        where: {
          stripeSubscriptionId: session.id,
        },
        include: {
          subscriptionItem: {
            include: {
              subscription: true,
            },
          },
        },
      });

      if (subscriptionOrder) {
        const isActive =
          (subscription?.cancellation_details?.reason as string) ===
          "cancellation_requested"
            ? false
            : true;
        await prismadb.subscriptionOrder.update({
          where: {
            stripeSubscriptionId: session.id,
          },
          data: {
            isActive,
          },
        });
      }
    }

    if (event.type === "invoice.payment_succeeded") {
      const session_invoice = event.data.object as Stripe.Invoice;
      const subscription = session_invoice.subscription;

      const chargeId = session_invoice.charge;

      const subscriptionOrder = await prismadb.subscriptionOrder.findUnique({
        where: {
          stripeSubscriptionId: subscription as string,
        },
      });

      if (
        subscriptionOrder &&
        session_invoice.billing_reason === "subscription_cycle"
      ) {
        // if (subscriptionOrder && session_invoice.billing_reason === "subscription_update" ) {
        await prismadb.subscriptionOrder.update({
          where: {
            stripeSubscriptionId: subscription as string,
          },
          data: {
            countPayment: {
              increment: 1,
            },
          },
        });

        await prismadb.subscriptionHistory.create({
          data: {
            subscriptionOrderId: subscriptionOrder.id,
            idStripe: session_invoice.id,
            price: subscriptionOrder.subscriptionPrice,
            status: "Paid",
            pdfUrl: `${PDF_URL}/get_pdf?mode=inline&charge_id=${chargeId}`,
          },
        });
      }
    }

    // if (event.type === "charge.succeeded") {
    //   const charge = event.data.object as Stripe.Charge;

    //   console.log("orderId", charge.id);
    // }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log("[WEBHOOK]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
