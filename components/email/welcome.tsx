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

export interface WelcomeEmailProps {
    fullName: string;
    baseUrl: string;
}

export const WelcomeEmail = ({ fullName, baseUrl }: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>Bienvenue sur Riot Tech</Preview>
        <Body style={main}>
            <Container style={container}>
                <a href={baseUrl} target="_blank">
                    <Img
                        src={`${baseUrl}/icon-riot-tech.png`}
                        width="50"
                        height="50"
                        alt="Riot Tech Logo"
                        style={logo}
                    />
                </a>
                <Text style={paragraph}>Bonjour {fullName},</Text>
                <Text style={paragraph}>Bienvenue sur Riot Tech</Text>
                <Section style={btnContainer}>
                    <Button
                        style={button}
                        href={`${baseUrl}/login`}
                        target="_blank"
                    >
                        Connectez-vous ici
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Cordialement,
                    <br />
                    Riot Tech
                </Text>
                <Hr style={hr} />
                <Text style={footer}>Kervihan 56930 Pluméliau-Bieuzy</Text>
            </Container>
        </Body>
    </Html>
);

export default WelcomeEmail;

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
