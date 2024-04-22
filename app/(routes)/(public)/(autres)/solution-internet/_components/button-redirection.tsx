"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Reseau4GPage from "./reseau-4G";
import { useState } from "react";
import { FcHome } from "react-icons/fc";
import { TbBusinessplan } from "react-icons/tb";

const ButtonRedirectionV2 = () => {
  const [display, setDisplay] = useState<string | undefined>(undefined);
  const button = [
    {
      name: "Internet pour vous/votre entreprise ?",
      content: " Yes. It adheres to the WAI-ARIA design pattern.",
      Icone: FcHome,
    },
    {
      name: "Vos clients afin qu’ils puissent utiliser vos produits ?",
      content:
        "  Yes. It comes with default styles that matches the other components' aesthetic.",
      Icone: TbBusinessplan,
    },
  ];
  return (
    <>
      <h2 className="mb-8 text-3xl font-bold">
        Vous avez besoin d’internet pour :
      </h2>
      <Accordion
        type="single"
        className="w-full max-w-4xl space-y-4 px-6"
        value={display}
        collapsible
        onValueChange={setDisplay}
      >
        {button.map(({ name, content, Icone }) => (
          <AccordionItem key={name} value={name}>
            <AccordionTrigger
              className="justify-center gap-4 rounded-lg bg-primary text-xl text-primary-foreground"
              classNameIcon=" size-6"
            >
              <Icone className="mr-2  size-6 shrink-0 " />
              {name}
            </AccordionTrigger>
            <AccordionContent>{content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Reseau4GPage display={!!display} />
    </>
  );
};

export default ButtonRedirectionV2;
