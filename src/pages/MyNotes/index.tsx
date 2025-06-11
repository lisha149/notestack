import { useEffect, useState } from "react";

import { MessageEditIcon } from "@notestack/assets/svg";
import Button from "@notestack/components/Button";
import NoDataAvailable from "@notestack/components/NoData";
import NoteCard from "@notestack/components/Card";
import type { NoteStoreType } from "@notestack/@types/form.types";
import { getNotes } from "@notestack/services";

import NoteModal from "./NoteModal";

const MyNotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<NoteStoreType[]>([]);
  const getAllNotes = getNotes();

  useEffect(() => {
    setNotes(getNotes());
  }, [getAllNotes]);

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
          <NoDataAvailable />
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard note={note} />
            ))}
          </div>
        )}
      </div>

      <NoteModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default MyNotes;
