import { useState } from "react";
import { getAllNotes } from "@notestack/services";

import type { NoteStoreType } from "@notestack/@types/form.types";
import NotesList from "@notestack/components/NotesList";

const MyNotes = () => {
  const [notes, setNotes] = useState<NoteStoreType[]>(getAllNotes());

  const refetchAllNotes = () => {
    setNotes(getAllNotes());
  };

  return (
    <NotesList
      title="Notes"
      notes={notes}
      refetchNotes={refetchAllNotes}
      showAddButton
    />
  );
};

export default MyNotes;
