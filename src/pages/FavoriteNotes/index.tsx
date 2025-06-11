import { useState } from "react";
import { getFavoriteNotes } from "@notestack/services";
import type { NoteStoreType } from "@notestack/@types/form.types";
import NotesList from "@notestack/components/NotesList";

const FavoriteNotes = () => {
  const [favNotes, setFavNotes] = useState<NoteStoreType[]>(getFavoriteNotes());

  const refetchFavNotes = () => {
    setFavNotes(getFavoriteNotes());
  };

  return (
    <NotesList
      title="Favorite Notes"
      notes={favNotes}
      refetchNotes={refetchFavNotes}
    />
  );
};

export default FavoriteNotes;
