import prismadb from "@/lib/prismadb";
import { type NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/nodemailer";
import { render } from "@react-email/render";
import ResetPasswordEmail from "@/components/email/reset-password";
import { hash } from "bcrypt";
import { randomBytes } from "node:crypto";

const baseUrl = process.env.NEXT_PUBLIC_URL as string;

export async function POST(req: Request) {
  const body = (await req.json()) as {
    email: string | undefined;
  };
  const { email } = body;

  if (!email) {
    return new NextResponse("L'email est nécessaire", { status: 400 });
  }
  try {
    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return new NextResponse("L'utilisateur n'existe pas", {
        status: 400,
      });
    }

    const resetToken = randomBytes(64).toString("hex");
    const fullName = user.surname + " " + user.name;

    await prismadb.user.update({
      where: {
        email,
      },
      data: {
        resetPasswordToken: resetToken,
      },
    });

    await transporter.sendMail({
      from: "contact@riottech.fr",
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: render(ResetPasswordEmail({ fullName, resetToken, baseUrl })),
    });

    return NextResponse.json(null);
  } catch (error) {
    console.log("[RESET_PASSWORD_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      password: string | undefined;
      resetToken: string | undefined;
    };
    const { password, resetToken } = body;

    if (!password) {
      return new NextResponse("Le nouveau mot de passe est nécessaire", {
        status: 400,
      });
    }

    if (!resetToken) {
      return new NextResponse("Erreur, veuillez réessayer", {
        status: 400,
      });
    }

    const user = await prismadb.user.findMany({
      where: {
        resetPasswordToken: resetToken,
      },
    });

    if (!user) {
      return new NextResponse("Erreur, veuillez réessayer", {
        status: 400,
      });
    }

    const hashpassword = await hash(password, 12);
    await prismadb.user.update({
      where: {
        id: user[0].id,
      },
      data: {
        password: hashpassword,
        resetPasswordToken: null,
      },
    });

    return NextResponse.json(null);
  } catch (error) {
    console.log("[RESET_PASSWORD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
