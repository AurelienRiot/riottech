import { TestStripe } from "./test-stripe";
import { stripe } from "@/lib/strip";

const StripePage = async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    currency: "eur",
    amount: 1099,
    automatic_payment_methods: { enabled: true },
  });

  if (!paymentIntent.client_secret) return null;
  const options = {
    // passing the client secret obtained from the server
    clientSecret: paymentIntent.client_secret,
  };

  console.log(paymentIntent.id);

  return <TestStripe options={options} />;
};

export default StripePage;
