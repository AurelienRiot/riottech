import { Button, Section, Text } from "@react-email/components";
import MainBody from "./common";

export interface ResetPasswordEmailProps {
  baseUrl: string;
  fullName: string;
  resetToken: string;
}

export const ResetPasswordEmail = ({
  resetToken,
  baseUrl,
  fullName,
}: ResetPasswordEmailProps) => (
  <MainBody baseUrl={baseUrl} previewText="Réinitialiser votre mot de passe">
    <ResetPassworBody
      fullName={fullName}
      resetToken={resetToken}
      baseUrl={baseUrl}
    />
  </MainBody>
);

ResetPasswordEmail.PreviewProps = {
  resetToken: "123456789123456789",
  baseUrl: "https://riottech.vercel.app",
  fullName: "Alan Turing",
} as ResetPasswordEmailProps;

const ResetPassworBody = ({
  fullName,
  resetToken,
  baseUrl,
}: ResetPasswordEmailProps) => (
  <>
    <Text className="text-center text-base ">Bonjour {fullName} </Text>
    <Text className="text-center text-base ">
      {
        "Quelqu'un a récemment demandé un changement de mot de passe pour votre compte RIOT TECH. Si c'était vous, vous pouvez définir un nouveau mot de passe ici :"
      }
    </Text>
    <Section className="text-center">
      <Button
        className="rounded-lg bg-primary px-6 py-3 text-center text-base text-white "
        href={`${baseUrl}/reset-password/${resetToken}`}
        target="_blank"
      >
        Réinitialiser le mot de passe
      </Button>
    </Section>
    <Text className="text-center text-base ">
      {
        "Si vous ne voulez pas changer votre mot de passe ou si vous ne l'avez pas demandé, ignorez et supprimez simplement ce message."
      }
    </Text>
    <Text className="text-center text-base ">
      Pour la sécurité de votre compte, veuillez ne pas transmettre cet e-mail à
      qui que ce soit.
    </Text>
  </>
);

export default ResetPasswordEmail;
