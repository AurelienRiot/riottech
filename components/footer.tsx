"use client";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="space-y-4 border-t bg-background/90 py-6">
        <div className="mx-auto ">
          <p className="text-center text-xs text-primary">&copy; {currentYear} RIOT TECH. Tous droits réservés.</p>
        </div>
        <div className="mx-auto">
          <p className="text-center text-xs text-primary">
            Ligne directe :{" "}
            <a className="hover:underline" href="tel:+33644839083">
              06.44.83.90.83
            </a>{" "}
            ou{" "}
            <a className="hover:underline" href="mailto:contact@riottech.fr">
              contact@riottech.fr
            </a>
          </p>
        </div>
        <nav>
          <ul className="flex flex-col justify-center gap-6  text-center text-muted-foreground sm:flex-row ">
            <li>
              <Link
                prefetch={false}
                href="/mention-legal"
                className="text-sm font-medium hover:text-primary hover:underline"
              >
                Mention légales
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href="/pdf/Politique-de-confidentialite.pdf"
                className="text-sm font-medium hover:text-primary hover:underline"
                target="_blank"
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href="/conditions-generales-de-vente"
                className="text-sm font-medium hover:text-primary hover:underline"
              >
                Conditions générales de vente
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
