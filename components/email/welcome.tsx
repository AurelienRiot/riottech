import { Button, Section, Text } from "@react-email/components";
import { Footer, MainBody } from "./common";

export interface WelcomeEmailProps {
  fullName: string;
  baseUrl: string;
}

export const WelcomeEmail = ({ fullName, baseUrl }: WelcomeEmailProps) => (
  <MainBody baseUrl={baseUrl} previewText="Bienvenue sur RIOT TECH">
    <WelcomeBody baseUrl={baseUrl} />
    <Footer />
  </MainBody>
);

export default WelcomeEmail;

WelcomeEmail.PreviewProps = {
  fullName: "Alan Turing",
  baseUrl: "https://riottech.vercel.app",
} as WelcomeEmailProps;

const WelcomeBody = ({ baseUrl }: { baseUrl: string }) => (
  <>
    <Text className="text-center text-base ">Bienvenue sur RIOT TECH</Text>
    <Text className="text-center text-base ">
      Vous venez de créer un compte sur riottech.fr
    </Text>
    <Section className="text-center">
      <Button
        className="rounded-lg bg-primary px-6 py-3 text-center text-base text-white "
        href={`${baseUrl}/login`}
        target="_blank"
      >
        Connectez-vous ici
      </Button>
    </Section>
  </>
);
