import { useLocation } from "react-router-dom";

import type { NavbarProps } from "@notestack/@types/props";
import { HamburgerLeftIcon, HamburgerRightIcon } from "@notestack/assets/svg";
import { getActivePage } from "@notestack/utils/active-page";

export default function Navbar({
  setIsSidebarOpen,
  isSidebarOpen,
}: NavbarProps) {
  const { pathname } = useLocation();
  const currentPage = getActivePage(pathname);

  return (
    <header className="h-12 flex items-center px-4 gap-2 text-gray-600">
      {isSidebarOpen ? (
        <HamburgerLeftIcon
          cursor="pointer"
          onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}
        />
      ) : (
        <HamburgerRightIcon
          cursor="pointer"
          onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}
        />
      )}

      <div className="flex items-center">
        <span className="text-(--primary)">{currentPage?.label}</span>
      </div>
    </header>
  );
}
