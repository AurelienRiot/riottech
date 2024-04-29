import { GoogleButton } from "@/components/auth/auth-button";
import { LoginForm } from "./components/login-form";

export default async function LoginPage() {
  return (
    <div className="h-sccreen flex w-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="space-y-12 rounded-xl px-8 pb-8 pt-12 sm:bg-white sm:shadow-xl  sm:dark:bg-black">
        <h1 className="text-2xl font-semibold"> Se connecter</h1>
        <GoogleButton />
        <div
          className={`my-4 flex h-4 flex-row  items-center gap-4 self-stretch whitespace-nowrap
        before:h-0.5 before:w-full 
        before:flex-grow before:bg-primary/30  after:h-0.5  after:w-full 
        after:flex-grow  after:bg-primary/30  `}
        >
          ou
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
