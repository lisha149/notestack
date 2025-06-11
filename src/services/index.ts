import type { NoteStoreType } from "@notestack/@types/form.types";

export const addUpdateNote = (data: NoteStoreType) => {
  const existingNotesJSON = localStorage.getItem("notes");
  const existingNotes = existingNotesJSON ? JSON.parse(existingNotesJSON) : [];

  // check if the note already exists
  const noteIndex = existingNotes.findIndex(
    (note: NoteStoreType) => note.id === data.id
  );

  if (noteIndex !== -1) {
    //replace the note
    existingNotes[noteIndex] = data;
  } else {
    // add new
    existingNotes.push(data);
  }

  localStorage.setItem("notes", JSON.stringify(existingNotes));
};

export const getAllNotes = (): NoteStoreType[] => {
  const notesJSON = localStorage.getItem("notes");
  return notesJSON ? JSON.parse(notesJSON) : [];
};

export const getFavoriteNotes = (): NoteStoreType[] => {
  const notesJSON = localStorage.getItem("notes");
  return notesJSON
    ? JSON.parse(notesJSON)?.filter((note: NoteStoreType) => note?.isFavorite)
    : [];
};

export const getNoteById = (id?: string): NoteStoreType | undefined => {
  const notes = getAllNotes();
  if (id) return notes.find((note) => note.id === id);
};

export const deleteNote = (id: string): void => {
  const notes = getAllNotes();
  const updatedNotes = notes.filter((note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
};

export const addToFavorite = (id: string): void => {
  const notes = getAllNotes();
  const updatedNotes = notes.map((note) => {
    if (note.id === id) {
      return {
        ...note,
        isFavorite: !note.isFavorite, // Toggle the favorite flag
      };
    }
    return note;
  });

  localStorage.setItem("notes", JSON.stringify(updatedNotes));
};
