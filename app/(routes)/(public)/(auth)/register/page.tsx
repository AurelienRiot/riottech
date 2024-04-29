import { RegisterForm } from "./_components/register-form";

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
