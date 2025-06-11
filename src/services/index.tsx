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

export const getNotes = (): NoteStoreType[] => {
  const notesJSON = localStorage.getItem("notes");
  return notesJSON ? JSON.parse(notesJSON) : [];
};
