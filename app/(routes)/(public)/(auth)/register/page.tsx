import { Metadata } from "next";
import { RegisterForm } from "./_components/register-form";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Créer votre compte",
    description: "Créer votre compte RIOT TECH",
  };
}

export default function RegisterPage() {
  return (
    <div className="h-sccreen flex w-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="space-y-12 rounded-xl px-8 pb-8 pt-12 sm:bg-white sm:shadow-xl sm:dark:bg-black">
        <h1 className="text-2xl font-semibold">
          Créer votre compte <br />
          <span className="text-xs text-red-500">*Obligatoire</span>
        </h1>

        <RegisterForm />
      </div>
    </div>
  );
}
