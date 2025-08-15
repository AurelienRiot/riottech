import { Logout } from "@/components/auth/auth";
import { GoogleButton } from "@/components/auth/auth-button";
import { getSessionUser } from "@/server-actions/get-user";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "./components/login-form";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Page de connection",
    description: "Connectez-vous à RIOT TECH",
  };
}

export default async function LoginPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined; error: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const callbackUrl = searchParams.callbackUrl || "/dashboard-user";
  const user = await getSessionUser();
  if (user && searchParams.error) {
    return <Logout callbackUrl={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}&error=${searchParams.error}`} />;
  }
  if (user) {
    redirect(callbackUrl);
  }
  return (
    <div className="h-sccreen flex w-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="space-y-12 rounded-xl px-8 pb-8 pt-12 sm:bg-white sm:shadow-xl sm:dark:bg-black">
        <h1 className="text-3xl font-semibold text-center"> Page de Connection</h1>
        <ErrorDisplay error={searchParams.error} />
        <GoogleButton />
        <div
          className={`my-4 flex h-4 flex-row items-center gap-4 self-stretch whitespace-nowrap before:h-0.5 before:w-full before:grow before:bg-primary/30 after:h-0.5 after:w-full after:grow after:bg-primary/30`}
        >
          ou
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

function ErrorDisplay({ error }: { error: string | undefined }) {
  switch (error) {
    case "changedEmail":
      return (
        <p className="text-center font-bold text-sm text-green-500">
          Votre email à bien été modifié, veillez vous reconnecter
        </p>
      );
    case "admin":
      return (
        <p className="text-center font-bold text-sm text-destructive">Vous devez vous connecter en tant qu'admin</p>
      );
    default:
      return null;
  }
}
