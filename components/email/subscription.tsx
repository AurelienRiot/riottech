import { Button, Section, Text } from "@react-email/components";
import { Footer, MainBody } from "./common";

export interface SubscriptionEmailProps {
  baseUrl: string;
  subscription: string;
  sim: string;
}

export const SubscriptionEmail = ({
  subscription,
  baseUrl,
  sim,
}: SubscriptionEmailProps) => (
  <MainBody baseUrl={baseUrl} previewText="Abonnement RIOT TECH">
    <SubscriptionBody subscription={subscription} sim={sim} baseUrl={baseUrl} />
    <Footer />
  </MainBody>
);

SubscriptionEmail.PreviewProps = {
  subscription: "50GO mensuel",
  baseUrl: "https://riottech.vercel.app",
  sim: "123456789123456789",
} as SubscriptionEmailProps;

const SubscriptionBody = ({
  subscription,
  baseUrl,
  sim,
}: SubscriptionEmailProps) => (
  <>
    <Section className="m-3 rounded-lg bg-white text-center">
      <Text className="text-center text-base font-bold ">
        {" "}
        {`Votre souscription à l'abonnement ${subscription} est validée !`}
      </Text>
    </Section>
    <Text className="text-center text-base ">
      Paiement en cours de validation
    </Text>
    <Text className="text-center text-base ">
      Retrouvez les détails et factures de votre abonnement sur
    </Text>
    <Section className="text-center">
      <Button
        className="rounded-lg bg-primary px-6 py-3 text-center text-base text-white "
        href={`${baseUrl}/dashboard-user/invoices`}
        target="_blank"
      >
        riottech.fr
      </Button>
    </Section>

    <Text className="text-center text-base ">sim : {sim} </Text>
  </>
);

export default SubscriptionEmail;
