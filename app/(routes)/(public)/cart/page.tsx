import Container from "@/components/ui/container";
import Summary from "./components/summary";
import CartItems from "./components/cart-items";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth/authOptions";
import { ToastSearchParams } from "@/lib/toast-search-params";

const CartPage = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  return (
    <>
      <ToastSearchParams
        searchParam="canceled"
        message="Erreur de paiement."
        url="/cart"
        toastType="error"
      />
      <Container>
        <div className="px-2 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold ">Pannier</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <CartItems />
            <Summary userId={userId} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default CartPage;
