"use client";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

export const LoginButton = () => {
  return (
    <Button title="Se connecter" onClick={() => signIn()}>
      {" "}
      <LogIn className="h-6 w-6" />{" "}
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button
      title="Se deconnecter"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOut className="h-6 w-6" />
    </Button>
  );
};
