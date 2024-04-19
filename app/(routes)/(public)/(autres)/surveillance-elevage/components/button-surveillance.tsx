"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const ButtonSurveillance = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="grid max-w-4xl grid-cols-1  items-center justify-center gap-10 p-6 md:grid-cols-2">
        <CardSurveillance
          title="Surveillance de stabulation, robots de traite, vêlages, poulinages, poulaillers…"
          content="Avec notre caméra 360°, zoom X25 et vision nocturne 100m ! Pilotez à distance la camera 360° aux 4 coins de votre bâtiment, avec cette camera, vous ne raterez aucuns détails !"
          image="/surveillance-elevage/camera_surveillance2.webp"
        />
        <CardSurveillance
          title="Surveillance sécurité aux abords et à l’intérieur des bâtiments"
          content=" En optant pour nos caméras fix grand angle, couplé avec un
          enregistreur, vous ne raterez aucunes intrusions ou mouvement suspect,
          vous pouvez même choisir d’être alerté en direct sur votre smartphone
          en cas d’intrusion ou d’anomalie."
          image="/surveillance-elevage/camera_surveillance1.webp"
        />
      </div>
    </div>
  );
};

export default ButtonSurveillance;

const CardSurveillance = ({
  title,
  content,
  image,
}: {
  title: string;
  content: string;
  image: string;
}) => {
  const scrollToForm = () => {
    const form = document.getElementById("form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Card className="relative flex h-full max-w-md flex-col justify-between">
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-center text-xl font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative grid grid-cols-2 text-center">
        <p>{content}</p>{" "}
        <div className="relative ">
          <Image
            src={image}
            alt="image"
            fill
            className="object-contain opacity-100"
          />
        </div>
      </CardContent>
      <CardFooter className="relative flex items-center justify-center">
        {" "}
        <Button className="hover:underline" onClick={scrollToForm}>
          Parlez nous de votre projet
        </Button>
      </CardFooter>
    </Card>
  );
};
