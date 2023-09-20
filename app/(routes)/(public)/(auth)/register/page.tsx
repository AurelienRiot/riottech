import { RegisterForm } from "./components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center w-screen h-sccreen bg-slate-100 dark:bg-slate-900">
      <div className="px-8 pt-12 pb-8 space-y-12 sm:shadow-xl sm:bg-white sm:dark:bg-black rounded-xl">
        <h1 className="text-2xl font-semibold">Créer votre compte <br/>
        <span className="text-xs text-red-500">*Obligatoire</span></h1>
        
        <RegisterForm />
        
      </div>
    </div>
  )
}