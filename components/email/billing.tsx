import { Text } from "@react-email/components";
import MainBody from "./common";

export interface BillingEmailProps {
  baseUrl: string;
  date: string;
  price: string;
  email: string;
}

export const BillingEmail = ({ date, baseUrl, price, email }: BillingEmailProps) => (
  <MainBody baseUrl={baseUrl} previewText="Votre facture RIOT TECH">
    <BillingBody price={price} email={email} baseUrl={baseUrl} date={date} />
  </MainBody>
);

BillingEmail.PreviewProps = {
  date: "01/01/2022",
  baseUrl: "https://riottech.vercel.app",
  price: "50€",
  email: "admin@admin.fr",
} as BillingEmailProps;

export const BillingBody = ({ date, price, email, baseUrl }: BillingEmailProps) => (
  <>
    <Text className="text-center text-base ">{`Bonjour, veuillez trouver ci-joint votre facture du ${date} d'un montant de ${price}.`}</Text>

    <Text className="text-center text-base ">
      {" "}
      {`Vous pouvez consulter et gérer vos factures dans la rubrique « Factures » de votre `}{" "}
      <a href={`${baseUrl}/dashboard-user`} target="_blank" rel="noreferrer">
        espace client
      </a>
      {". "}
      {`L'accès à votre espace client s'effectue avec votre adresse e-mail ${email} et votre mot de passe.
        Vous ne vous souvenez plus de ces identifiants ? Retrouvez-les facilement en suivant les instructions sur la page de connexion.`}
    </Text>
  </>
);

export default BillingEmail;
