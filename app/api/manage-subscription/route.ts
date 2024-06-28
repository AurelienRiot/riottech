import { checkUser } from "@/components/auth/checkAuth";
import { stripe } from "@/lib/stripe";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await checkUser();
    if (!user) {
      return new NextResponse("Erreur, essayer de vous reconnecter", {
        status: 401,
      });
    }

    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId as string,
      return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard-user`,
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[MANAGE_SRIPE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
