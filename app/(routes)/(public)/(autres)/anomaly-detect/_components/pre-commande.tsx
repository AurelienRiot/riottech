"use client";
import { VisibleElement } from "@/components/animations/visible-element";
import { Button } from "@/components/ui/button";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiSolidBellRing } from "react-icons/bi";

const PreOrderBox = () => {
  return (
    <div className="p-2 mt-10 text-center bg-white rounded-lg shadow-lg dark:bg-blue-900 sm:p-6">
      <h2 className="mb-4 text-2xl font-bold border-spacing-2">AnomalyDetect est disponible en pré-commande !</h2>
      <VisibleElement variant="left">
        <Button className="flex flex-col w-full pt-16 pb-16 mb-5 text-white bg-blue-500 rounded-3xl md:text-xl xl:text-2xl hover:bg-blue-950">
          <div className="flex items-center mb-2 space-x-2 font-semibold">
            <BiSolidBellRing className="shrink-0 w-6 h-6" />
            <p>{"Acheter dès sa sortie"}</p>
          </div>
          <p> {"S'inscrire pour recevoir un mail pour acheter AnomalyDetect dès sa sortie, au prix public."} </p>
        </Button>
      </VisibleElement>
      <VisibleElement variant="right">
        <Button className="flex flex-col w-full pt-16 pb-16 text-white bg-blue-500 rounded-3xl md:text-xl xl:text-2xl hover:bg-blue-950">
          <div className="flex items-center mb-2 space-x-2 font-semibold">
            <AiFillCheckCircle className="shrink-0 w-6 h-6" />
            <p>{"Pré-commander moins cher"}</p>
          </div>
          <p>
            {" "}
            {
              "Pré-commandez AnomalyDetect, recevez-le avant sa sortie publique, profitez d'une remise de 30% et changez d'avis à tout moment."
            }{" "}
          </p>
        </Button>
      </VisibleElement>
    </div>
  );
};

export default PreOrderBox;
