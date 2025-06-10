import type { SidebarProps } from "@notestack/@types/props";
import { LogoIcon } from "@notestack/assets/svg";
import { sidebarItems } from "@notestack/utils/sidebar";

import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, handleClick }: SidebarProps) => {
  return (
    <div
      className={`flex flex-col h-screen 
        ${isSidebarOpen ? "w-64" : "w-18"} 
        overflow-hidden relative border-r border-gray-200 dark:border-gray-700`}
    >
      <Link
        to="/"
        className="flex gap-1 items-center justify-center p-4 transition-all duration-300 ease-in-out"
      >
        <LogoIcon color="gray.50" />
        {isSidebarOpen && (
          <span className="flex flex-col">
            <span className="text-(--primary) text-lg font-semibold leading-none">
              NoteStack
            </span>
            <div className="text-sm text-gray-400 italic">
              Stack your thoughts!
            </div>
          </span>
        )}
      </Link>

      <div
        className={`flex flex-col gap-1 overflow-y-auto overflow-x-hidden ${
          isSidebarOpen ? "px-2" : "px-4"
        }`}
        role="list"
      >
        {sidebarItems?.map((sidebarItem) => (
          <SidebarItem
            key={sidebarItem.label}
            isSidebarOpen={isSidebarOpen}
            handleClick={handleClick}
            {...sidebarItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
