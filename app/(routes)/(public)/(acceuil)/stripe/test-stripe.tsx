"use client";
import { FullAdress } from "@/components/adress-form";
import { Button } from "@/components/ui/button";
import {
  AddressElement,
  CardElement,
  Elements,
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
  PaymentElement,
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";
import { FormEvent } from "react";
import toast from "react-hot-toast";

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
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_API_KEY as string
  );

  return (
    // <Elements stripe={stripePromise} options={options}>
    //   <CheckoutForm user={user} />
    // </Elements>
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout className="p-8" />
    </EmbeddedCheckoutProvider>
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
  const stripe = useStripe();
  const elements = useElements();
  const fullAdress: FullAdress = JSON.parse(user.address);

  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    console.log(elements.getElement("payment"));
    toast.success("Paiement réussi");
  };

  return (
    <form
      className="flex  gap-4 justify-center items-center p-8"
      onSubmit={handlePayment}
    >
      <div className="flex flex-col gap-4 justify-center items-center">
        <AddressElement
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
        />
        <Button>Payer</Button>
      </div>

      <PaymentElement
        options={{
          paymentMethodOrder: ["sepa_debit", "card"],
          defaultValues: { billingDetails: { email: user.email } },
        }}
      />
    </form>
  );
};
