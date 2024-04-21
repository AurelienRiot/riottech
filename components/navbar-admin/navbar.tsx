import { MainNav } from "@/components/navbar-admin/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import MobileNav from "./mobile-nav";
import { LogoutButton } from "@/components/auth/auth-button";

const Navbar = async () => {
  return (
    <header className="border-b ">
      <div className="flex h-16 items-center px-4">
        <MainNav className=" hidden pl-8 lg:block" />
        <MobileNav className="mx-6 lg:hidden" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
