import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ButtonRedirection = () => {
  const button = [
    {
      name: "Vous/votre entreprise ?",
      url: "#",
    },
    {
      name: "Vos clients afin qu’ils puissent utiliser vos produits ?",
      url: "#",
    },
  ];

  return (
    <>
      <h2 className="mb-8 text-3xl font-bold">
        Vous avez besoin d’internet pour :
      </h2>
      <div className="flex w-full flex-wrap items-center justify-center gap-4 pb-10 pl-6 pr-6 ">
        {button.map((item) => (
          <Button
            key={item.name}
            asChild
            className="h-fit w-full max-w-[500px] py-5 text-lg font-bold"
          >
            <Link href={item.url}>{item.name}</Link>
          </Button>
        ))}
      </div>
      <ButtonRedirectionV2 />
    </>
  );
};

const ButtonRedirectionV2 = () => {
  return (
    <Accordion type="single" collapsible className="w-full max-w-4xl px-6">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ButtonRedirection;
