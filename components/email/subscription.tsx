import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

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
  <Html>
    <Head />
    <Preview>Bienvenue sur RIOT TECH</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={redZone}>
          <Text style={paragraphRedZone}>
            {" "}
            {`Votre souscription à l'abonnement ${subscription}`}
          </Text>
          <Text style={paragraphRedZone}> est validée !</Text>
        </Section>
        <Text style={paragraph}>Paiement en cours de validation</Text>
        <Text style={paragraph}>
          Retrouvez les détails et factures de votre abonnement sur
        </Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href={`${baseUrl}/dashboard-user/invoices`}
            target="_blank"
          >
            riottech.fr
          </Button>
        </Section>

        <Text style={paragraph}>sim : {sim} </Text>
        <Text style={paragraph}>
          Cordialement,
          <br />
          RIOT TECH
        </Text>
        <Hr style={hr} />
        <Text style={footer}>RIOT TECH - Kervihan 56930 Pluméliau-Bieuzy</Text>
      </Container>
    </Body>
  </Html>
);

export default SubscriptionEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "center" as const,
};

const paragraphRedZone = {
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "center" as const,
  fontHeight: 700,
};

const btnContainer = {
  textAlign: "center" as const,
  itemAlign: "center" as const,
  display: "flex",
  justifyContent: "center" as const,
};

const redZone = {
  textAlign: "center" as const,
  background: "#FFF",
  margin: "10px",
  borderRadius: "10px",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  width: "fit-content",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
