import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import SubscriptionEmail from "@/components/email/subscription";
import { transporter } from "@/lib/nodemailer";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { render } from "@react-email/render";

const PDF_URL = process.env.PDF_URL;
const baseUrl = process.env.NEXT_PUBLIC_URL as string;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOKS_SECRET!,
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Eror: ${error.message}`, { status: 400 });
  }

  try {
    const session = event.data.object;

    switch (event.type) {
      case "checkout.session.completed": {
        await checkoutSessionCompleted(session as Stripe.Checkout.Session);
        break;
      }
      case "customer.subscription.updated": {
        await customerSubscriptionUpdated(session as Stripe.Checkout.Session);
        break;
      }
      case "invoice.payment_succeeded": {
        await invoicePaymentSucceeded(session as Stripe.Invoice);
        break;
      }
      case "charge.succeeded": {
        await chargeSucceeded(session as Stripe.Charge);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log("[WEBHOOK]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

async function checkoutSessionCompleted(session: Stripe.Checkout.Session) {
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
    .filter((c) => c !== null || undefined || "")
    .join(", ");

  const orderId = session?.metadata?.orderId;
  if (!orderId) {
    return new NextResponse("No order id", { status: 200 });
  }
  const paymentInvoiceId = session.invoice as string;
  const paymentIntentId = session.payment_intent as string;

  let chargeId;
  if (paymentInvoiceId) {
    const paymentInvoice = await stripe.invoices.retrieve(paymentInvoiceId);
    chargeId = paymentInvoice.charge;
  } else {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
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
      session?.subscription as string,
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

    const sub = await prismadb.subscriptionOrder.findUnique({
      where: {
        id: subscriptionOrder.id,
      },
      select: {
        subscriptionItem: {
          select: {
            name: true,
          },
        },
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

    await transporter.sendMail({
      from: "facturation@riottech.fr",
      to: session?.customer_details?.email || "",
      subject: "Votre abonnement RIOT TECH",
      html: render(
        SubscriptionEmail({
          sim: subscriptionOrder.sim,
          subscription: sub?.subscriptionItem?.name || "",
          baseUrl,
        }),
      ),
    });
  }
}

async function customerSubscriptionUpdated(session: Stripe.Checkout.Session) {
  const subscription = await stripe.subscriptions.retrieve(
    session.id as string,
  );

  const subscriptionOrder = await prismadb.subscriptionOrder.findUnique({
    where: {
      stripeSubscriptionId: session.id,
    },
    include: {
      subscriptionItem: true,
    },
  });

  if (subscriptionOrder) {
    const isActive =
      (subscription.cancellation_details?.reason as string) ===
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

async function invoicePaymentSucceeded(session: Stripe.Invoice) {
  const subscription = session.subscription;

  const chargeId = session.charge;

  const subscriptionOrder = await prismadb.subscriptionOrder.findUnique({
    where: {
      stripeSubscriptionId: subscription as string,
    },
  });

  if (subscriptionOrder && session.billing_reason === "subscription_cycle") {
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
        idStripe: session.id,
        price: subscriptionOrder.subscriptionPrice,
        status: "Paid",
        pdfUrl: `${PDF_URL}/get_pdf?mode=inline&charge_id=${chargeId}`,
      },
    });
  }
}

async function chargeSucceeded(session: Stripe.Charge) {
  console.log("chargeId", session.id);
}
