import prismadb from "@/lib/prismadb";
import { ContactClient } from "./components/client";
import { ContactColumn } from "./components/columns";

export const dynamic = "force-dynamic";

const ContactsPage = async () => {
  const contacts = await prismadb.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedContacts: ContactColumn[] = contacts.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone ?? "",
    email: item.email,
    postalCode: item.postalCode?.toString() ?? "",
    subject: item.subject,
    text: item.message,
    createdAt: item.createdAt,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ContactClient data={formattedContacts} />
      </div>
    </div>
  );
};

export default ContactsPage;
