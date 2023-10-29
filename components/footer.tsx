import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-background/90">
      <div className="pt-10 pb-2 mx-auto">
        <p className="text-xs text-center text-primary">
          &copy; 2023 Riot Tech, Inc All right reserved.
        </p>
      </div>
      <nav>
        <ul className="flex flex-col justify-center gap-6 pt-2 pb-6 text-center sm:flex-row text-muted-foreground ">
          <li>
            <Link
              href="/mention-legal"
              className="text-sm font-medium hover:text-primary hover:underline"
            >
              Mention légales
            </Link>
          </li>
          <li>
            <Link
              href="/pdf/Politique-de-confidentialite.pdf"
              className="text-sm font-medium hover:text-primary hover:underline"
              target="_blank"
            >
              Politique de confidentialité
            </Link>
          </li>
          <li>
            <Link
              href="/conditions-generales-de-vente"
              className="text-sm font-medium hover:text-primary hover:underline"
            >
              Conditions générales de vente
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
