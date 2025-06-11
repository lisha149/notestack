import type { NoteStoreType } from "@notestack/@types/form.types";
import { addToFavorite, deleteNote } from "@notestack/services";

export const handleFavoriteToggle = (id: string) => {
  addToFavorite(id);
};

export const handleDelete = (id: string) => {
  deleteNote(id);
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
