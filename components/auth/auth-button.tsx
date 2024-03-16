"use client";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Spinner from "../animations/spinner";
import { Icons } from "../icons";

export const LoginButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  return (
    <Button
      className={cn(
        "bg-primary-foreground text-primary hover:bg-accent hover:text-accent-foreground",
        props.className,
      )}
      title="Se connecter"
      onClick={() => signIn()}
      {...props}
    >
      {" "}
      <LogIn className="h-6 w-6 transition-all duration-300 " />{" "}
    </Button>
  );
};

export const LogoutButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  return (
    <Button
      title="Se deconnecter"
      onClick={() => signOut({ callbackUrl: "/" })}
      {...props}
    >
      <LogOut className="h-6 w-6" />
    </Button>
  );
};
export const LogoutButtonText = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  return (
    <Button
      title="Se deconnecter"
      onClick={() => signOut({ callbackUrl: "/" })}
      {...props}
    >
      Déconnexion
    </Button>
  );
};

export const GoogleButton = ({ callbackUrl }: { callbackUrl: string }) => {
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={async () => {
        setLoading(true);
        await signIn("google", {
          callbackUrl,
        });
        setLoading(false);
      }}
      className="relative flex w-[306px] items-center justify-between  gap-4 rounded-sm bg-[#4285F4] shadow-xl  duration-200 ease-linear  hover:bg-[#4285F4]/90 active:scale-95"
    >
      <Icons.google />
      <span className="mr-4 self-center font-medium text-white sm:text-lg">
        {loading ? (
          <Spinner
            size={40}
            className=" absolute left-[135px] top-1   text-white"
          />
        ) : (
          "Se connecter avec Google"
        )}
      </span>
    </button>
  );
};
