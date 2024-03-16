import { redirect } from "next/navigation";
import { LoginForm } from "./components/login-form";
import GetUser from "@/server-actions/get-user";
import { GoogleButton } from "@/components/auth/auth-button";

export default async function LoginPage() {
  const user = await GetUser();

  if (user) {
    redirect("/dashboard-user");
  }

  return (
    <div className="h-sccreen flex w-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="space-y-12 rounded-xl px-8 pb-8 pt-12 sm:bg-white sm:shadow-xl  sm:dark:bg-black">
        <h1 className="text-2xl font-semibold"> Se connecter</h1>
        <LoginForm />
      </div>
      <GoogleButton callbackUrl="/dashboard-user" />
    </div>
  );
}
