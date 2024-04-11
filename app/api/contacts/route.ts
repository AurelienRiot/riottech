import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, phone, subject, message } = await req.json();

  if (!name) {
    return new NextResponse("Le nom est nécessaire", { status: 400 });
  }

  if (!email) {
    return new NextResponse("L'email est nécessaire", { status: 400 });
  }

  if (!subject) {
    return new NextResponse("Le sujet est nécessaire", { status: 400 });
  }

  if (!message) {
    return new NextResponse("Le message est nécessaire", { status: 400 });
  }

  const contact = await prismadb.contact.create({
    data: {
      name: name,
      email: email,
      phone: phone,
      subject: subject,
      message: message,
    },
  });

  return NextResponse.json(contact);
}
