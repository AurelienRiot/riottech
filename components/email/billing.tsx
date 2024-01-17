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

export interface BillingProps {
    baseUrl: string;
    date: string;
    price: string;
    email: string;
}

export const Billing = ({ date, price, email, baseUrl }: BillingProps) => (
    <Html>
        <Head />
        <Preview>Bienvenue sur RIOT TECH</Preview>
        <Body style={main}>
            <Container style={container}>
                <a href={baseUrl} target="_blank">
                    <Img
                        src={`${baseUrl}/icon-riot-tech.png`}
                        width="50"
                        height="50"
                        alt="RIOT TECH Logo"
                        style={logo}
                    />
                </a>
                <Text
                    style={paragraph}
                >{`Bonjour, veuillez trouver ci-joint votre facture du ${date} d'un montant de ${price}.`}</Text>

                <Text style={paragraph}>
                    {`Vous pouvez consulter et gérer vos factures dans la rubrique « Factures » de votre `}{" "}
                    <a href={`${baseUrl}/dashboard-user`} target="_blank">
                        espace client
                    </a>
                    {". "}
                    {`L'accès à votre espace client s'effectue avec votre adresse e-mail ${email} et votre mot de passe.
        Vous ne vous souvenez plus de ces identifiants ? Retrouvez-les facilement en suivant les instructions sur la page de connexion.`}
                </Text>

                <Text style={paragraph}>
                    Cordialement,
                    <br />
                    RIOT TECH
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    RIOT TECH - Kervihan 56930 Pluméliau-Bieuzy
                </Text>
            </Container>
        </Body>
    </Html>
);

export default Billing;

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
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
