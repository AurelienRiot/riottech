"use client";
import type { FullAdress } from "@/components/adress-form";
import { Button } from "@/components/ui/button";
// import {
//   AddressElement,
//   EmbeddedCheckout,
//   EmbeddedCheckoutProvider,
//   PaymentElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

export const TestStripe = ({
  options,
  user,
}: {
  options: {
    clientSecret: string | null;
    onComplete?: (() => void) | undefined;
  };
  user: {
    address: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
}) => {
  // const stripePromise = loadStripe(
  //   process.env.NEXT_PUBLIC_STRIPE_API_KEY as string,
  // );

  return (
    // <Elements stripe={stripePromise} options={options}>
    //   <CheckoutForm user={user} />
    // </Elements>
    // <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
    //   <EmbeddedCheckout className="p-8" />
    // </EmbeddedCheckoutProvider>
    <></>
  );
};

const CheckoutForm = ({
  user,
}: {
  user: {
    address: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
}) => {
  // const stripe = useStripe();
  // const elements = useElements();
  const fullAdress: FullAdress = JSON.parse(user.address);

  // const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!stripe || !elements) {
  //     return;
  //   }
  //   console.log(elements.getElement("payment"));
  //   toast.success("Paiement réussi");
  // };

  return (
    <form
      className="flex  items-center justify-center gap-4 p-8"
      //  onSubmit={handlePayment}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        {/* <AddressElement
          options={{
            display: {
              name: "split",
            },
            mode: "billing",
            defaultValues: {
              address: {
                line1: fullAdress.line1,
                line2: fullAdress.line2,
                city: fullAdress.city,
                state: fullAdress.state,
                postal_code: fullAdress.postalCode,
                country: fullAdress.country,
              },
              firstName: user.surname,
              lastName: user.name,
              phone: user.phone,
            },
          }}
        /> */}
        <Button>Payer</Button>
      </div>

      {/* <PaymentElement
        options={{
          paymentMethodOrder: ["sepa_debit", "card"],
          defaultValues: { billingDetails: { email: user.email } },
        }}
      /> */}
    </form>
  );
};
