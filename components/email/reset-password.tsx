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
import * as React from "react";

export interface ResetPasswordEmailProps {
  baseUrl: string;
  fullName: string;
  resetToken: string;
}

export const ResetPasswordEmail = ({
  fullName,
  resetToken,
  baseUrl,
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Réinitialiser le mot de passe</Preview>
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
        <Text style={paragraph}>Bonjour {fullName} </Text>
        <Text style={paragraph}>
          {
            "Quelqu'un a récemment demandé un changement de mot de passe pour votre compte RIOT TECH. Si c'était vous, vous pouvez définir un nouveau mot de passe ici :"
          }
        </Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href={`${baseUrl}/reset-password/${resetToken}`}
            target="_blank"
          >
            Réinitialiser le mot de passe
          </Button>
        </Section>
        <Text style={paragraph}>
          {
            "Si vous ne voulez pas changer votre mot de passe ou si vous ne l'avez pas demandé, ignorez et supprimez simplement ce message."
          }
        </Text>
        <Text style={paragraph}>
          Pour la sécurité de votre compte, veuillez ne pas transmettre cet
          e-mail à qui que ce soit.
        </Text>
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

export default ResetPasswordEmail;

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
