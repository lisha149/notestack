import { useState } from "react";

import { MessageEditIcon } from "@notestack/assets/svg";
import Button from "@notestack/components/Button";
import NoDataAvailable from "@notestack/components/NoData";
import NoteCard from "@notestack/components/Card";
import { addToFavorite, getAllNotes, deleteNote } from "@notestack/services";
import type { NoteStoreType } from "@notestack/@types/form.types";

import NoteModal from "./NoteModal";

const MyNotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | undefined>();

  const [notes, setNotes] = useState<NoteStoreType[]>(getAllNotes());

  const refetchAllNotes = () => {
    setNotes(getAllNotes());
  };

  const handleFavoriteToggle = (id: string) => {
    addToFavorite(id);
    refetchAllNotes();
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
    refetchAllNotes();
  };

  return (
    <div className="flex gap-4 flex-col h-124 lg:h-full">
      <div className="flex items-end justify-between">
        <div className="text-(--primary) border-b-2 font-medium cursor-auto">
          My Notes
        </div>
        <Button
          icon={<MessageEditIcon />}
          label={"Add"}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
      </div>

      <div className="rounded-md bg-(--layer-fill) shadow-sm h-full">
        {notes?.length === 0 ? (
          <NoDataAvailable content="No notes added yet." />
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={() => {
                  setEditId(note.id);
                  setIsModalOpen(true);
                }}
                onFavorite={() => {
                  handleFavoriteToggle(note.id);
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
        refetchNotes={refetchAllNotes}
      />
    </div>
  );
};

export default MyNotes;
