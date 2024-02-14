"use client";
import MainNav from "@/components/navbar-public/main-nav";
import NavbarAction from "@/components/navbar-public/navbar-actions";
import Container from "@/components/ui/container";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileNav from "./mobile-nav";

const NavBar = () => {
  const [isNavbar, setIsNavbar] = useState(true);

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
              <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-4">
                <div className="flex ">
                  <Link
                    href="/"
                    className="ml-4 hidden items-center transition-all hover:scale-105 sm:flex lg:ml-0"
                  >
                    <p className="text-lg font-bold text-primary sm:text-xl">
                      {" "}
                      RIOT TECH
                    </p>
                  </Link>
                  <div className="hidden lg:flex lg:items-center">
                    <MainNav />
                  </div>
                  <MobileNav className="ml-2 lg:hidden" />
                </div>

                <NavbarAction />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
