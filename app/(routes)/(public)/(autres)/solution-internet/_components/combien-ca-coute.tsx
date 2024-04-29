import { VisibleElement } from "@/components/animations/visible-element";
import Currency from "@/components/ui/currency";
import { ScrollToTargetSpan } from "./scroll-to-target";

const CombienCoute = () => {
  return (
    <VisibleElement className="rounded-t-lg bg-primary-foreground/95 p-4 text-center  text-primary">
      <h2 id="cout 2" className="mb-4 text-2xl text-primary">
        Combien ça coûte
      </h2>
      <p className="mb-4">
        {"Prix de la Box 4G : à partir de "}
        <Currency displayLogo={false} value={195} className="inline" />
        <ScrollToTargetSpan
          target="La garantie à vie, ça signifie quoi ?"
          text="- Garantie à vie"
        />
        <br />
        {"Prix de l'abonnement 4G : à partir de "}
        <Currency displayLogo={false} value={24.99} className="inline" />
        {"/mois en usage spécifique et "}
        <Currency displayLogo={false} value={39.99} className="inline" />
        {" en usage générale"}
        <br />
        Service réservé aux professionnels
      </p>
    </VisibleElement>
  );
};

export default CombienCoute;
