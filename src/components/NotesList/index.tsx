import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import NoteCard from "@notestack/components/Card";
import NoDataAvailable from "@notestack/components/NoData";
import SearchInput from "@notestack/components/Form/SearchInput";

import {
  handleDelete,
  handleFavoriteToggle,
  sortNotes,
} from "@notestack/utils/action";
import type { NotesListProps } from "@notestack/@types/props";
import { MessageEditIcon, TrashIcon } from "@notestack/assets/svg";
import { deleteNote } from "@notestack/services";

import ExportDropdown from "../Button/ExportDropdown";
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

  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);

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

  const handleDeleteSelectedNotes = () => {
    if (selectedNoteIds.length === 0) {
      return toast.warn("No notes selected.");
    }

    selectedNoteIds.forEach((id) => deleteNote(id));
    refetchNotes();

    setSelectedNoteIds([]);
    toast.success("Selected notes deleted.");
  };

  return (
    <div className="flex gap-4 flex-col lg:h-full">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-(--primary) border-b-2 text-md font-medium cursor-auto max-w-fit p-1">
          {title}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <SearchInput setSearchText={setSearchText} />

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {showAddButton ? (
              <div className="w-full sm:w-auto flex justify-between sm:justify-start gap-3">
                <SortInput onSort={setSortBy} />
                <div className="flex gap-2 sm:gap-3 justify-end sm:justify-start">
                  {showAddButton && (
                    <Button
                      icon={<MessageEditIcon />}
                      label="Add"
                      onClick={() => {
                        setIsViewMode(false);
                        setIsModalOpen(true);
                      }}
                    />
                  )}
                  <ExportDropdown notes={notes} />
                </div>{" "}
              </div>
            ) : (
              <div className="w-full sm:w-auto flex justify-end sm:justify-start gap-2">
                <SortInput onSort={setSortBy} />
                <ExportDropdown notes={notes} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-md bg-(--layer-fill) dark:bg-(--grey) shadow-sm h-full">
        {filteredAndSortedNotes.length === 0 ? (
          <NoDataAvailable content={`No ${title.toLowerCase()} added yet.`} />
        ) : (
          <div className="flex flex-col gap-4 p-4">
            <button
              className="cursor-pointer flex justify-end"
              title="Delete Selected"
              onClick={handleDeleteSelectedNotes}
            >
              <TrashIcon />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  selectedNoteIds={selectedNoteIds}
                  setSelectedNoteIds={setSelectedNoteIds}
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
