import { useState } from "react";

import type { NoteStoreType } from "@notestack/@types/form.types";
import NoteCard from "@notestack/components/Card";
import NoDataAvailable from "@notestack/components/NoData";
import {
  addToFavorite,
  deleteNote,
  getFavoriteNotes,
} from "@notestack/services";

import NoteModal from "../MyNotes/NoteModal";

const FavoriteNotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | undefined>();
  const [favNotes, setFavNotes] = useState<NoteStoreType[]>(getFavoriteNotes());

  const refetchFavNotes = () => {
    setFavNotes(getFavoriteNotes());
  };

  const handleFavoriteToggle = (id: string) => {
    addToFavorite(id);
    refetchFavNotes();
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
    refetchFavNotes();
  };

  return (
    <div className="flex gap-4 flex-col h-124 lg:h-full">
      <div className="text-(--primary) border-b-2 font-medium cursor-auto max-w-fit">
        Favorite Notes
      </div>

      <div className="rounded-md bg-(--layer-fill) shadow-sm h-full">
        {favNotes?.length === 0 ? (
          <NoDataAvailable content="No favorite note added yet." />
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onFavorite={() => {
                  handleFavoriteToggle(note.id);
                }}
                onEdit={() => {
                  setEditId(note.id);
                  setIsModalOpen(true);
                }}
                onDelete={() => {
                  handleDelete(note.id);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <NoteModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editId={editId}
        setEditId={setEditId}
        refetchNotes={refetchFavNotes}
      />
    </div>
  );
};

export default FavoriteNotes;
