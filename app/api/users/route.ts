import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { WelcomeEmail } from "@/components/email/welcome";
import { transporter } from "@/lib/nodemailer";
import { render } from "@react-email/render";

const baseUrl = process.env.NEXT_PUBLIC_URL as string;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      password,
      name,
      surname,
      phone,
      adresse,
      tva,
      raisonSocial,
      isPro,
    } = body;

    const fullAdress = JSON.parse(adresse);
    const isEmailPresent = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });
    if (isEmailPresent) {
      return new NextResponse(
        "Un compte existe déjà avec cette adresse e-mail, veuillez vous connecter.",
        {
          status: 400,
        },
      );
    }

    const hashpassword = await hash(password, 12);
    const customer = await stripe.customers.create({
      name: raisonSocial ? raisonSocial : name + " " + surname,
      email: email,
      phone: phone,
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
        tva: tva,
      },
    });

    const user = await prismadb.user.create({
      data: {
        email: email,
        password: hashpassword,
        name: name,
        surname: surname,
        phone: phone,
        adresse: adresse,
        stripeCustomerId: customer.id,
        tva: tva,
        raisonSocial: raisonSocial,
        role: isPro === "true" ? "pro" : "user",
      },
    });

    const fullName = name + " " + surname;

    await transporter.sendMail({
      from: "contact@riottech.fr",
      to: email,
      subject: "Création de votre compte RIOT TECH",
      html: render(WelcomeEmail({ fullName, baseUrl })),
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USERS_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
