import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/strip";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  interface RequestBody {
    itemsWithQuantities: { id: string; quantity: number }[];
    totalPrice: string;
  }

  try {
    const body = await req.json();
    const { itemsWithQuantities, totalPrice } = body as RequestBody;

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Erreur, essayer de vous reconnecter", {
        status: 401,
      });
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return new NextResponse("Erreur, essayer de vous reconnecter", {
        status: 401,
      });
    }

    if (!itemsWithQuantities || itemsWithQuantities.length === 0) {
      return new NextResponse(
        "L'id et la quantité de chaque produit est nécessaire",
        { status: 400 }
      );
    }

    if (!totalPrice) {
      return new NextResponse("Le prix total est nécessaire", { status: 400 });
    }

    const productIds = itemsWithQuantities.map((item) => item.id);
    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const productsWithQuantity = products.map((product) => {
      return {
        item: product,
        quantity: itemsWithQuantities.find((item) => item.id === product.id)
          ?.quantity,
      };
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    productsWithQuantity.forEach((product) => {
      line_items.push({
        quantity: product.quantity,

        price_data: {
          currency: "EUR",

          tax_behavior: "exclusive",
          product_data: {
            tax_code: "txcd_99999999",
            name: product.item.name,
          },
          unit_amount: Math.floor(Number(product.item.priceHT) * 100),
        },
      });
    });

    const order = await prismadb.order.create({
      data: {
        isPaid: false,
        totalPrice: user.isPro ? Number(totalPrice) : Number(totalPrice) * 1.2,
        orderItems: {
          create: itemsWithQuantities.map((item) => ({
            product: {
              connect: {
                id: item.id,
              },
            },
            quantity: item.quantity,
          })),
        },
        userId: user.id,
      },
    });

    const sessionStripe = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      automatic_tax: {
        enabled: true,
      },
      customer: session.user.stripeCustomerId,
      customer_update: { name: "never", address: "never" },
      billing_address_collection: "auto",
      payment_method_types: ["card"],
      phone_number_collection: {
        enabled: false,
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard-user?success-order=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json({ url: sessionStripe.url });
  } catch (error) {
    console.log("[CHECKOUT_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
