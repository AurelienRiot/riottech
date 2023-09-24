import Billing from "@/components/email/billing";
import { transporter } from "@/lib/nodemailer";
import prismadb from "@/lib/prismadb";
import { dateFormatter, formatter } from "@/lib/utils";
import { render } from "@react-email/render";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { charge_id: chargeId, customer_id: customerId } = await req.json();

    console.log("chargeId :", chargeId);
    console.log("customerId :", customerId);
    const pdfUrl = `https://doligateway.riottech.fr/get_pdf?charge_id=${chargeId}`;
    const pdfSend = `https://doligateway.riottech.fr/get_pdf?mode=inline&charge_id=${chargeId}`;

    const response = await axios.get(pdfUrl, {
      responseType: "arraybuffer",
    });

    const contentDisposition = response.headers["content-disposition"];
    let filename = "unknown";
    if (contentDisposition) {
      const matches = contentDisposition.match(
        /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      );
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }

    const pdfBuffer = response.data;

    const order = await prismadb.order.findMany({
      where: {
        pdfUrl: pdfSend,
      },
    });

    const histories = await prismadb.subscriptionHistory.findMany({
      where: {
        pdfUrl: pdfSend,
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

        return new NextResponse("Facture deja envoyée", { status: 200 });
      } else {
        const email = user?.email ? user?.email : "";
        const price = formatter.format(Number(order[0].totalPrice));
        const date = dateFormatter(new Date());

        await transporter.sendMail({
          from: "facturation@riottech.fr",
          to: email,
          subject: "Votre facture RIOT TECH",
          html: render(
            Billing({
              email,
              price,
              date,
            })
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
    }

    if (histories.length > 0) {
      if (histories[0].mailSend) {
        console.log("Facture deja envoyée");

        return new NextResponse("Facture deja envoyée", { status: 200 });
      } else {
        const email = user?.email ? user?.email : "";
        const price = formatter.format(Number(histories[0].price));
        const date = dateFormatter(new Date());

        await transporter.sendMail({
          from: "facturation@riottech.fr",
          to: user?.email,
          subject: "Votre facture RIOT TECH",
          html: render(
            Billing({
              email,
              price,
              date,
            })
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
    }

    console.log("chargeId inconnue");

    return new NextResponse("chargeId inconnue", { status: 400 });
  } catch (error) {
    console.log("[WEBHOOK_FACTURE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
