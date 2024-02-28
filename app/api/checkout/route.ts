import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/strip";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "@/components/auth/authOptions";

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

    if (session.user.role === "admin") {
      return new NextResponse(
        "Erreur, un compte admin ne peut passer de commande",
        {
          status: 401,
        }
      );
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

    // const taxe = user.isPro ? 1 : 1.2;0
    const taxe = 1.2;

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
          unit_amount: Math.round(product.item.priceHT * 100),
        },
      });
    });

    const order = await prismadb.order.create({
      data: {
        isPaid: false,
        totalPrice: Number(totalPrice) * taxe,
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

    const isAdresse = Boolean(JSON.parse(user.adresse).label);

    const sessionStripe = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      automatic_tax: {
        enabled: true,
      },
      payment_intent_data: {
        setup_future_usage: "on_session",
      },
      customer: session.user.stripeCustomerId,
      customer_update: { name: "never", address: isAdresse ? "never" : "auto" },
      billing_address_collection: isAdresse ? "auto" : "required",
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
