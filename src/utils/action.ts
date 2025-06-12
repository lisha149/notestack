import { toast } from "react-toastify";

import type { NoteStoreType } from "@notestack/@types/form.types";
import { addToFavorite, deleteNote } from "@notestack/services";

export const handleFavoriteToggle = (id: string) => {
  addToFavorite(id);
};

export const handleDelete = (id: string) => {
  deleteNote(id);
  toast.success("Note deleted.");
};

export const sortNotes = (
  notes: NoteStoreType[],
  sortBy: "date" | "title" = "date"
): NoteStoreType[] => {
  return [...notes].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    return (
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
  });
};

export const exportNotesAsJSON = (notes: NoteStoreType[]) => {
  if (notes.length === 0) return toast.error("No notes to export.");
  const jsonString = JSON.stringify(notes, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "notes-json.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportNotesAsCSV = (notes: NoteStoreType[]) => {
  if (notes.length === 0) return toast.error("No notes to export.");

  const headers = Object.keys(notes[0]);
  const csvRows = [
    headers.join(","),
    ...notes.map((note) =>
      headers
        .map((header) => {
          let val = note[header as keyof NoteStoreType];
          if (Array.isArray(val)) {
            val = val.join(";");
          }
          if (typeof val === "string") {
            val = `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        })
        .join(",")
    ),
  ];

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "notes-csv.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
