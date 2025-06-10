import { useLocation } from "react-router-dom";

import type { NavbarProps } from "@notestack/@types/props";
import { HamburgerLeftIcon, HamburgerRightIcon } from "@notestack/assets/svg";
import { getActivePage } from "@notestack/utils/active-page";

import ToggleTheme from "../ToggleTheme";

const Navbar = ({ setIsSidebarOpen, isSidebarOpen }: NavbarProps) => {
  const { pathname } = useLocation();

  const currentPage = getActivePage(pathname);

  const isClickable = window.innerWidth >= 768;

  return (
    <header className="h-12 flex items-center justify-between px-4 text-gray-600 dark:text-gray-200">
      <div className="flex items-center gap-2">
        {isSidebarOpen ? (
          <HamburgerLeftIcon
            cursor={isClickable ? "pointer" : "auto"}
            onClick={
              isClickable ? () => setIsSidebarOpen((prev) => !prev) : undefined
            }
          />
        ) : (
          <HamburgerRightIcon
            cursor={isClickable ? "pointer" : "auto"}
            onClick={
              isClickable ? () => setIsSidebarOpen((prev) => !prev) : undefined
            }
          />
        )}
        <span className="text-(--primary)">{currentPage?.label}</span>
      </div>
      <ToggleTheme />
    </header>
  );
};

export default Navbar;
