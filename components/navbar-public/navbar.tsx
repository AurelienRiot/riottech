"use client";
import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/navbar-public/main-nav";
import NavbarAction from "@/components/navbar-public/navbar-actions";
import MobileNav from "./mobile-nav";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Category } from "@prisma/client";
import { useCategories } from "@/hooks/use-categories";

type NavBarProps = {
  role: string | undefined;
};

const NavBar: React.FC<NavBarProps> = ({ role }) => {
  const [isNavbar, setIsNavbar] = useState(true);
  const categories = useCategories((s) => s.categories);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction === "down" && scrollY > 0) {
        setIsNavbar(false);
      } else {
        setIsNavbar(true);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isNavbar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isNavbar ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`fixed top-0 z-30 w-full bg-background border-b-2 border-border  `}
          >
            <Container>
              <div className="relative flex items-center justify-between h-16 px-4 sm:px-6 lg:px-4">
                <div className="flex ">
                  <Link
                    href="/"
                    className="items-center hidden ml-4 sm:flex lg:ml-0 hover:scale-105"
                  >
                    <p className="text-lg font-bold sm:text-xl text-primary">
                      {" "}
                      Riot Tech
                    </p>
                  </Link>
                  <div className="hidden lg:flex lg:items-center">
                    <MainNav data={categories} />
                  </div>
                  <MobileNav data={categories} className="ml-2 lg:hidden" />
                </div>

                <NavbarAction role={role} />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
