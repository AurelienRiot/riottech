import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="pt-10 pb-2 mx-auto">
        <p className="text-xs text-center text-primary">
          &copy; 2023 Riot Tech, Inc All right reserved.
        </p>
      </div>
      <nav>
        <ul className="flex flex-col justify-center gap-6 pt-2 mb-6 text-center sm:flex-row text-muted-foreground ">
          <li>
            <Link
              href="/mention-legal"
              className="text-sm font-medium hover:text-primary"
            >
              Mention légales
            </Link>
          </li>
          <li>
            <a
              href="/pdf/Politique-de-confidentialite.pdf"
              className="text-sm font-medium hover:text-primary"
              target="_blank"
            >
              Politique de confidentialité
            </a>
          </li>
          <li>
            <Link
              href="/conditions-generales-de-vente"
              className="text-sm font-medium hover:text-primary"
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
