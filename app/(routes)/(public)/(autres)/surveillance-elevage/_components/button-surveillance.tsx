import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import ImageSurveillance1 from "@/public/surveillance-elevage/camera_surveillance1.webp";
import ImageSurveillance2 from "@/public/surveillance-elevage/camera_surveillance2.webp";

const ButtonSurveillance = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="grid w-full max-w-5xl grid-cols-1 items-stretch justify-center gap-8 p-0 md:grid-cols-2">
        <CardSurveillance
          title="Surveillance de stabulation, robots de traite, vêlages, poulinages, poulaillers…"
          content={
            <>
              <p>
                {
                  "Avec notre caméra 360°, zoom X25 et vision nocturne 100m ! Pilotez à distance la caméra 360° aux 4 coins de votre bâtiment, avec cette camera, vous ne raterez aucun détail !"
                }
              </p>
              <Button asChild variant={"link"} className="text-lg font-bold">
                <Link href="/demo-cam">Voir en LIVE</Link>
              </Button>
            </>
          }
          image={ImageSurveillance2}
        />
        <CardSurveillance
          title="Surveillance sécurité aux abords et à l’intérieur des bâtiments"
          content={
            <>
              <p>
                {
                  "En optant pour nos caméras fixes grand angle, couplées avec un enregistreur, vous ne raterez aucune intrusion ou mouvement suspect. Vous pouvez même choisir d’être alerté en direct sur votre smartphone en cas d’intrusion ou d’anomalie."
                }
              </p>
            </>
          }
          image={ImageSurveillance1}
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
  content: React.ReactNode;
  image: StaticImageData;
}) => {
  return (
    <Card className="relative flex h-full w-full flex-col justify-between">
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-center text-xl font-semibold leading-snug">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative text-center leading-relaxed">{content}</CardContent>
      <div className="group relative z-10 mx-auto size-24">
        <Image
          src={image}
          alt={title}
          width={160}
          height={160}
          placeholder="blur"
          className="pointer-events-none object-contain opacity-100 transition-transform group-hover:scale-[1.8]"
        />
      </div>
      <CardFooter className="relative flex items-center justify-center">
        <Button className={"cursor-pointer text-base hover:underline"} asChild>
          <Link href="#contact-form"> Parlez-nous de votre projet</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
