import React from "react";
import type { NoteSelectCheckboxProps } from "@notestack/@types/props";

const Checkbox = ({
  noteId,
  selectedNoteIds,
  setSelectedNoteIds,
}: NoteSelectCheckboxProps) => {
  const checked = selectedNoteIds.includes(noteId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectedNoteIds((prev) =>
      isChecked ? [...prev, noteId] : prev.filter((id) => id !== noteId)
    );
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      className="w-5 h-5 accent-(--primary) rounded-full border-gray-300 cursor-pointer"
    />
  );
};

export default Checkbox;
