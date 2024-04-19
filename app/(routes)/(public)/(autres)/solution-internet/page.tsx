import { Button } from "@/components/ui/button";
import Image from "next/image";
import CombienCoute from "./_components/combien-ca-coute";
import Reseau4GPage from "./_components/reseau-4G";
import ButtonRedirection from "./_components/button-redirection";

const SolutionInternetPage = () => {
  return (
    <section className="mt-10 flex flex-col items-center text-center ">
      <ButtonRedirection />
      <CombienCoute />
      <div className="relative space-y-10 bg-primary-foreground/95 pb-10 pt-6  ">
        <Reseau4GPage />
      </div>
    </section>
  );
};

export default SolutionInternetPage;
