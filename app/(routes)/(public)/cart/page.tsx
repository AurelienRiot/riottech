import Container from "@/components/ui/container";
import { ToastSearchParams } from "@/lib/toast-search-params";
import { getDbUser } from "@/server-actions/get-user";
import { redirect } from "next/navigation";
import CartItems from "./components/cart-items";
import Summary from "./components/summary";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Panier",
    description: "Consultez votre panier RIOT TECH",
  };
}

const CartPage = async () => {
  const user = await getDbUser();
  if (user && !user.stripeCustomerId && user.role !== "admin") {
    redirect(`/dashboard-user/settings?callbackUrl=${encodeURIComponent(`/cart`)}`);
  }

  return (
    <>
      <ToastSearchParams searchParam="canceled" message="Erreur de paiement." url="/cart" toastType="error" />
      <Container>
        <div className="px-2 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold ">Panier</h1>
          <div className="mt-12 gap-x-12 lg:grid lg:grid-cols-12 lg:items-start ">
            <CartItems />
            <Summary userId={user?.id} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default CartPage;
