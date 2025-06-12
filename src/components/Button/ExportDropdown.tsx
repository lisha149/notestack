import { useEffect, useRef, useState } from "react";

import type { NoteStoreType } from "@notestack/@types/form.types";
import { MenuIcon } from "@notestack/assets/svg";
import { exportNotesAsCSV, exportNotesAsJSON } from "@notestack/utils/action";
import Button from ".";

const ExportDropdown = ({ notes }: { notes: NoteStoreType[] }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <Button icon={<MenuIcon />} onClick={() => setOpen(!open)} label="" />

      {open && (
        <div className="absolute right-0 mt-2 w-30 bg-(--layer-fill) dark:bg-gray-600 rounded-lg shadow-lg z-50 text-(--text-color)">
          <button
            onClick={() => {
              exportNotesAsJSON(notes);
              setOpen(false);
            }}
            className="block w-full text-left text-sm px-4 py-2 hover:bg-gray-100  dark:hover:bg-(--card-bg) cursor-pointer"
          >
            Export JSON
          </button>
          <button
            onClick={() => {
              exportNotesAsCSV(notes);
              setOpen(false);
            }}
            className="block w-full text-left text-sm px-4 py-2 hover:bg-gray-100  dark:hover:bg-(--card-bg) cursor-pointer"
          >
            Export CSV
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportDropdown;
