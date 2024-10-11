import BillingEmail from "@/components/email/billing";
import { transporter } from "@/lib/nodemailer";
import prismadb from "@/lib/prismadb";
import { currencyFormatter, dateFormatter } from "@/lib/utils";
import { render } from "@react-email/render";
import { NextResponse, type NextRequest } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_URL as string;
const PDF_URL = process.env.PDF_URL;

export async function POST(req: NextRequest) {
  try {
    const { charge_id: chargeId, customer_id: customerId } = (await req.json()) as {
      charge_id: string | undefined;
      customer_id: string | undefined;
    };

    console.log("chargeId :", chargeId);
    console.log("customerId :", customerId);

    // const response = await axios.get(`${PDF_URL}/get_pdf?charge_id=${chargeId}`, {
    //   responseType: "arraybuffer",
    // });
    const response = await fetch(`${PDF_URL}/get_pdf?charge_id=${chargeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return new NextResponse("Erreur, la facture n'a pas pu être récupérée", { status: 400 });
    }

    const contentDisposition = response.headers.get("content-disposition");
    let filename = "unknown";
    if (contentDisposition) {
      const matches = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (matches) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }

    const pdfContent = await response.arrayBuffer();
    const pdfBuffer = Buffer.from(pdfContent);

    const order = await prismadb.order.findMany({
      where: {
        pdfUrl: `${PDF_URL}/get_pdf?mode=inline&charge_id=${chargeId}`,
      },
    });

    const histories = await prismadb.subscriptionHistory.findMany({
      where: {
        pdfUrl: `${PDF_URL}/get_pdf?mode=inline&charge_id=${chargeId}`,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const user = await prismadb.user.findUnique({
      where: {
        stripeCustomerId: customerId,
      },
    });

    if (order.length > 0) {
      if (order[0].mailSend) {
        console.log("Facture deja envoyée");

        return new NextResponse("Facture deja envoyée", {
          status: 200,
        });
      }
      const email = user?.email ? user?.email : "";
      const price = currencyFormatter.format(Number(order[0].totalPrice));
      const date = dateFormatter(new Date());

      await transporter.sendMail({
        from: "facturation@riottech.fr",
        to: email,
        subject: "Votre facture RIOT TECH",
        html: await render(
          BillingEmail({
            email,
            price,
            date,
            baseUrl,
          }),
        ),
        attachments: [
          {
            filename: filename,
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      });

      await prismadb.order.update({
        where: {
          id: order[0].id,
        },
        data: {
          mailSend: true,
        },
      });
      console.log("Facture envoyée");
      return new NextResponse("Facture envoyée", { status: 200 });
    }

    if (histories.length > 0) {
      if (histories[0].mailSend) {
        console.log("Facture deja envoyée");

        return new NextResponse("Facture deja envoyée", {
          status: 200,
        });
      }
      const email = user?.email ? user?.email : "";
      const price = currencyFormatter.format(Number(histories[0].price));
      const date = dateFormatter(new Date());

      await transporter.sendMail({
        from: "facturation@riottech.fr",
        to: user?.email || undefined,
        subject: "Votre facture RIOT TECH",
        html: await render(
          BillingEmail({
            email,
            price,
            date,
            baseUrl,
          }),
        ),
        attachments: [
          {
            filename: filename,
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      });

      await prismadb.subscriptionHistory.update({
        where: {
          id: histories[0].id,
        },
        data: {
          mailSend: true,
        },
      });
      console.log("Facture envoyée");

      return new NextResponse("Facture envoyée", { status: 200 });
    }

    console.log("chargeId inconnue");

    return new NextResponse("chargeId inconnue", { status: 400 });
  } catch (error) {
    console.log("[WEBHOOK_FACTURE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
