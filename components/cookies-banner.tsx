"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import Link from "next/link";

const CookiesBanner = () => {
  const { getValue, setValue } = useLocalStorage("cookies-banner");
  const [isVisible, setIsVisible] = useState<boolean>(!getValue());

  const handleAccept = () => {
    setValue({ accept: true });
    setIsVisible(false);
  };

  const handleReject = () => {
    setValue({ accept: false });
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }
  return (
    <div className="fixed bottom-0  z-50 inset-x-0     bg-black text-white p-8 flex flex-col lg:flex-row justify-between items-center text-sm gap-2 rounded-t-lg">
      <p className="max-w-4xl">
        En cliquant sur « Accepter tous les cookies », vous acceptez le stockage
        de cookies sur votre appareil pour améliorer la navigation sur le site,
        analyser son utilisation et contribuer à nos efforts de marketing.{" "}
        <Link
          href="/pdf/Politique-de-confidentialite.pdf"
          className=" underline font-bold"
          target="_blank"
        >
          Politique de confidentialité
        </Link>
        .
      </p>
      <div className="flex gap-2">
        <Button
          onClick={handleReject}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Tout refuser
        </Button>
        <Button
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Autoriser tous les cookies
        </Button>
      </div>
    </div>
  );
};

export default CookiesBanner;
