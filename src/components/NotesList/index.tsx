import { useMemo, useState } from "react";

import NoteCard from "@notestack/components/Card";
import NoDataAvailable from "@notestack/components/NoData";
import SearchInput from "@notestack/components/Form/SearchInput";

import {
  handleDelete,
  handleFavoriteToggle,
  sortNotes,
} from "@notestack/utils/action";
import type { NotesListProps } from "@notestack/@types/props";
import { MessageEditIcon } from "@notestack/assets/svg";

import NoteModal from "../NoteModal";
import Button from "../Button";
import SortInput from "../Form/Sort";

const NotesList = ({
  title,
  notes,
  refetchNotes,
  showAddButton,
}: NotesListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const [editId, setEditId] = useState<string | undefined>();

  const [searchText, setSearchText] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<"date" | "title" | undefined>("date");

  const filteredAndSortedNotes = useMemo(() => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchText?.toLowerCase() ?? "") ||
        note.tags?.some((tag) =>
          tag.toLowerCase().includes(searchText?.toLowerCase() ?? "")
        )
    );

    return sortNotes(filtered, sortBy);
  }, [notes, searchText, sortBy]);

  return (
    <div className="flex gap-4 flex-col lg:h-full">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-(--primary) border-b-2 font-medium cursor-auto max-w-fit">
          {title}
        </div>

        <div
          className={`flex ${
            showAddButton ? "flex-col sm:flex-row" : "sm:flex-row"
          } md:flex-row gap-2 sm:items-center sm:gap-4 justify-between`}
        >
          <SearchInput setSearchText={setSearchText} />

          {showAddButton ? (
            <div className="flex flex-row items-center gap-2 justify-between">
              <SortInput onSort={setSortBy} />
              <Button
                icon={<MessageEditIcon />}
                label="Add"
                onClick={() => {
                  setIsViewMode(false);
                  setIsModalOpen(true);
                }}
              />
            </div>
          ) : (
            <SortInput onSort={setSortBy} />
          )}
        </div>
      </div>

      <div className="rounded-md bg-(--layer-fill) dark:bg-(--grey) shadow-sm h-full">
        {filteredAndSortedNotes.length === 0 ? (
          <NoDataAvailable content={`No ${title.toLowerCase()} yet.`} />
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onView={() => {
                  setIsViewMode(true);
                  setEditId(note.id);
                  setIsModalOpen(true);
                }}
                onEdit={() => {
                  setIsViewMode(false);
                  setEditId(note.id);
                  setIsModalOpen(true);
                }}
                onDelete={() => {
                  handleDelete(note.id);
                  refetchNotes();
                }}
                onFavorite={() => {
                  handleFavoriteToggle(note.id);
                  refetchNotes();
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
        refetchNotes={refetchNotes}
        isViewMode={isViewMode}
      />
    </div>
  );
};

export default NotesList;
