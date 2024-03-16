import { Button } from "@/components/ui/button";
import Link from "next/link";

export const DisplayPdf = ({
  avalaible,
  pdfUrl,
}: {
  avalaible: boolean;
  pdfUrl: string;
}) => {
  return (
    <span className="flex flex-row gap-1">
      {" "}
      {avalaible ? (
        <>
          <Button asChild className="hover:underline">
            <Link href={pdfUrl} target="_blank">
              Ouvrir
            </Link>
          </Button>
          <Button asChild className="hover:underline">
            <Link href={pdfUrl.replace(/mode=inline&/, "")} target="_blank">
              Télécharger
            </Link>
          </Button>
        </>
      ) : (
        "Non disponible"
      )}
    </span>
  );
};
