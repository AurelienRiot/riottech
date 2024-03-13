import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
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
    <Preview>{"Abonnement RIOT TECH"}</Preview>
    <Body style={main}>
      <Container style={container}>
        <a href={baseUrl} target="_blank">
          <Img
            src={`${baseUrl}/icone.png`}
            width="75"
            height="75"
            alt="RIOT TECH Logo"
            style={logo}
          />
        </a>
        {/* <Text style={paragraph}>Bonjour {fullName},</Text> */}
        <Text style={paragraph}>Bienvenue sur RIOT TECH</Text>
        <Text style={paragraph}>
          {"Merci d'avoir souscrit à un abonnement sur RIOT TECH"}
        </Text>
        <Text style={paragraph}>Abonnement : {subscription}</Text>
        <Text style={paragraph}>sim : {sim} </Text>

        <Text style={paragraph}>
          Cordialement,
          <br />
          RIOT TECH
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Kervihan 56930 Pluméliau-Bieuzy</Text>
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

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
