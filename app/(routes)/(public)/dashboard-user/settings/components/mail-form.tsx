"use client";

import { Button, LoadingButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type FormEvent, useState } from "react";
import changeEmail from "../_actions/change-email";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

function MailForm({ email }: { email: string | null }) {
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSumbit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const newEmail = new FormData(e.target as HTMLFormElement).get("email");
    await changeEmail(newEmail as string)
      .then((result) => {
        if (!result.success) {
          toast.error(result.message, { position: "top-center" });
          return;
        }
        toast.success("Email changé");
        signOut({ callbackUrl: "/login" });
      })
      .catch((error) => {
        toast.error("Une erreur est survenue", { position: "top-center" });
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className="py-4 space-y-4">
      <p className="font-bold">{email}</p>
      <Button onClick={() => setDisplay(!display)}>Changer l'email</Button>
      {display && (
        <form className="flex gap-4" onSubmit={onSumbit}>
          <Input disabled={loading} name="email" className="max-w-xs" placeholder="Entrer votre nouvel mail" />
          <LoadingButton type="submit" disabled={loading}>
            Valider
          </LoadingButton>
        </form>
      )}
    </div>
  );
}

export default MailForm;
