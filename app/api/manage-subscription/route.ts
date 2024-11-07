import { checkUser } from "@/components/auth/checkAuth";
import { stripe } from "@/lib/stripe";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { stripeCustomerId, returnUrl } = (await req.json()) as {
      stripeCustomerId: string | undefined;
      returnUrl: string | undefined;
    };
    if (!stripeCustomerId) {
      return new NextResponse("Identifiant Stripe manquant, essayer de vous reconnecter", {
        status: 401,
      });
    }
    if (!returnUrl) {
      return new NextResponse("Erreur, essayer de vous reconnecter", {
        status: 401,
      });
    }
    const user = await checkUser();
    // Check if the user is not an admin or if the userId does not match
    if (!user || (user.role !== "admin" && user.stripeCustomerId !== stripeCustomerId)) {
      return new NextResponse("Erreur, essayer de vous reconnecter", {
        status: 401,
      });
    }

    if (!user.stripeCustomerId) {
      return new NextResponse("Erreur, essayer de vous reconnecter", {
        status: 401,
      });
    }

    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: returnUrl,
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[MANAGE_SRIPE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
