import GetUser from "@/server-actions/get-user";
import { TestStripe } from "./test-stripe";
import { stripe } from "@/lib/strip";
import { redirect } from "next/navigation";
import { StripeElementsOptions } from "@stripe/stripe-js";
import Stripe from "stripe";

const StripePage = async () => {
  const user = await GetUser();

  if (!user) {
    redirect("/login");
  }

  // const paymentIntent = await stripe.paymentIntents.create({
  //   currency: "eur",
  //   amount: 1099,
  //   automatic_payment_methods: { enabled: true },
  // });
  // console.log(paymentIntent.client_secret);
  // if (!paymentIntent.client_secret) return null;

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  const subscription = {
    id: "4ebc8a90-20b9-4e07-8075-44253acce933",
    name: "T1",
    description: "test1",
    productSpecs: "sp",
    priceHT: 10,
    priceTTC: 12,
    fraisActivation: 5.99,
    recurrence: "month",
    dataCap: 1,
    isFeatured: false,
    isArchived: false,
    createdAt: "2023-11-22T09:44:37.806Z",
    updatedAt: "2024-02-13T17:50:27.289Z",
  };

  line_items.push({
    quantity: 1,

    price_data: {
      currency: "EUR",
      tax_behavior: "exclusive",

      product_data: {
        tax_code: "txcd_99999999",
        name: subscription.name,
        metadata: {
          sim: 111111111,
        },
      },
      unit_amount: Math.round(subscription.priceHT * 100),
      recurring: {
        interval: subscription.recurrence as Stripe.Price.Recurring.Interval,
      },
    },
  });
  line_items.push({
    quantity: 1,
    price_data: {
      currency: "EUR",
      tax_behavior: "exclusive",

      product_data: {
        tax_code: "txcd_99999999",

        name: "Frais d'activation",
      },
      unit_amount: Math.round(subscription.fraisActivation * 100),
    },
  });

  const isAdresse = Boolean(JSON.parse(user?.adresse as string)?.label);
  if (!user.stripeCustomerId) {
    console.log("customer not exist");
    return null;
  }

  const sessionStripe = await stripe.checkout.sessions.create({
    line_items,
    mode: "subscription",
    automatic_tax: {
      enabled: true,
    },
    customer: user.stripeCustomerId,
    customer_update: {
      name: "never",
      address: isAdresse ? "never" : "auto",
    },
    billing_address_collection: isAdresse ? "auto" : "required",
    payment_method_types: ["sepa_debit"],
    phone_number_collection: {
      enabled: false,
    },

    ui_mode: "embedded",
    return_url: `${process.env.NEXTAUTH_URL}/`,
  });

  if (!sessionStripe.client_secret) {
    console.log("client secret not exist");
    console.log(sessionStripe);
    return null;
  }

  const options: {
    clientSecret: string | null;
    onComplete?: (() => void) | undefined;
  } = {
    // mode: "subscription",
    // currency: "eur",
    // amount: 1099,

    // passing the client secret obtained from the server
    clientSecret: sessionStripe.client_secret,
  };

  return (
    <TestStripe
      options={options}
      user={{
        address: user.adresse || "",
        name: user.name || "",
        surname: user.surname || "",
        email: user.email || "",
        phone: user.phone || "",
      }}
    />
  );
};

export default StripePage;
