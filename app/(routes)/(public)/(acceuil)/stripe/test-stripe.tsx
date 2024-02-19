"use client";
import { Button } from "@/components/ui/button";
import {
  AddressElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const TestStripe = ({
  options,
}: {
  options: StripeElementsOptions | undefined;
}) => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

  useEffect(() => {
    const fetchStripe = async () => {
      setStripePromise(
        await loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY as string)
      );
    };

    fetchStripe();
  }, []);

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="w-full max-w-md mx-auto">
        <CheckoutForm />
      </div>
    </Elements>
  );
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  return (
    <form
      className="flex flex-col gap-4 justify-center items-center p-8"
      onSubmit={async (e) => {
        e.preventDefault();
        toast.success("Paiement réussi");
      }}
    >
      <PaymentElement
        options={{ paymentMethodOrder: ["sepa_debit", "card"] }}
      />
      <Button>Payer</Button>
    </form>
  );
};
