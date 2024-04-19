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
        Vous avez besoin d’internet pour
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
    </>
  );
};

export default ButtonRedirection;
