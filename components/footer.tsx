import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="border-t bg-background/90">
        <div className="mx-auto pb-2 pt-10">
          <p className="text-center text-xs text-primary">
            &copy; {currentYear} RIOT TECH, Inc All right reserved.
          </p>
        </div>
        <nav>
          <ul className="flex flex-col justify-center gap-6 pb-6 pt-2 text-center text-muted-foreground sm:flex-row ">
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
    </>
  );
};

export default Footer;
