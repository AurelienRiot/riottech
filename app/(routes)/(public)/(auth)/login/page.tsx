import { LoginForm } from "./components/login-form";

export default function LoginPage() {
  return (
    <div className="h-sccreen w-screen flex justify-center items-center bg-slate-100 dark:bg-slate-900">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white sm:dark:bg-black rounded-xl  space-y-12">
      <h1 className="font-semibold text-2xl">  Se connecter</h1>
      <LoginForm />
      </div>
    </div>
  )
}