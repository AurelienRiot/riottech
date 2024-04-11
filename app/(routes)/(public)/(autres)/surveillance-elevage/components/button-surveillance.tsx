"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ButtonSurveillance = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-10 p-6">
      <CardSurveillance
        title="Pour surveillance de stabulation, robots de traite, vêlages, poulinages, poulaillers…"
        content="Avec notre caméra 360°, zoom X25 et vision nocturne 100m ! Pilotez à distance la camera 360° aux 4 coins de votre bâtiment, avec cette camera, vous ne raterez aucuns détails !"
      />
      <CardSurveillance
        title="  Pour surveillance sécurité aux abords et à l’intérieur des bâtiments"
        content=" En optant pour nos caméras fix grand angle, couplé avec un
          enregistreur, vous ne raterez aucunes intrusions ou mouvement suspect,
          vous pouvez même choisir d’être alerté en direct sur votre smartphone
          en cas d’intrusion ou d’anomalie."
      />
    </div>
  );
};

export default ButtonSurveillance;

const CardSurveillance = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const scrollToForm = () => {
    const form = document.getElementById("form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Card className="max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex items-center justify-center ">
        {" "}
        <Button className="hover:underline" onClick={scrollToForm}>
          Parlez nous de votre projet
        </Button>
      </CardFooter>
    </Card>
  );
};
