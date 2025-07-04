import prismadb from "@/lib/prismadb";
import { compare, hash } from "bcryptjs";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/components/auth/authOptions";

export async function PATCH(req: NextRequest) {
  try {
    const body = (await req.json()) as { oldPassword: string | undefined; newPassword: string | undefined };
    const { oldPassword, newPassword } = body;

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Erreur, essayer de vous reconnecter", {
        status: 401,
      });
    }

    if (!newPassword) {
      return new NextResponse("Le nouveau mot de passe est nécessaire", {
        status: 400,
      });
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return new NextResponse("L'utilisateur n'existe pas", { status: 400 });
    }

    if (user.password) {
      if (!oldPassword) {
        return new NextResponse("Veuillez entrer votre mot de passe", {
          status: 400,
        });
      }
      const compareOldPassword = await compare(oldPassword, user.password);

      if (!compareOldPassword) {
        return new NextResponse("L'ancien mot de passe est incorrect", {
          status: 400,
        });
      }

      const compareNewPassword = await compare(newPassword, user.password);
      if (compareNewPassword) {
        return new NextResponse("Le nouveau mot de passe est identique à l'ancien", { status: 400 });
      }
    }

    const hashpassword = await hash(newPassword, 12);
    await prismadb.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: hashpassword,
      },
    });

    return NextResponse.json(null);
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
