import { Metadata } from "next";
import ResetPasswordForm from "./_components/reset-password-form";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Reinitialiser votre mot de passe",
    description: "Reinitialiser votre mot de passe RIOT TECH",
  };
}

const ResetPasswordPage = () => {
  return (
    <div className="h-sccreen flex w-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="text space-y-12 rounded-xl px-8 pb-8 pt-12 sm:bg-white sm:shadow-xl sm:dark:bg-black">
        <h1 className="text-center text-2xl font-semibold">
          {" "}
          Réinitialiser votre mot de passe
        </h1>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
