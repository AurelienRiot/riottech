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
  const button = [
    {
      name: "Internet pour vous/votre entreprise ?",
      content: " Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      name: "Vos clients afin qu’ils puissent utiliser vos produits ?",
      content:
        "  Yes. It comes with default styles that matches the other components' aesthetic.",
    },
  ];
  return (
    <>
      <h2 className="mb-8 text-3xl font-bold">
        Vous avez besoin d’internet pour :
      </h2>
      <Accordion type="single" collapsible className="w-full max-w-4xl px-6">
        {button.map((item) => (
          <AccordionItem key={item.name} value={item.name}>
            <AccordionTrigger
              className="justify-center gap-4 text-xl"
              classNameIcon=" size-6"
            >
              {item.name}
            </AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default ButtonRedirectionV2;
