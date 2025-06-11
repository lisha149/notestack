import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

import TagsInput from "@notestack/components/Form/TagsInput";
import TextArea from "@notestack/components/Form/TextArea";
import TextInput from "@notestack/components/Form/TextInput";
import Modal from "@notestack/components/Modal";

import type { NoteFormType } from "@notestack/@types/form.types";
import type { NoteModalProps } from "@notestack/@types/props";
import { addUpdateNote, getNoteById } from "@notestack/services";
import { handleFavoriteToggle } from "@notestack/utils/action";
import { ROUTES } from "@notestack/routes/route.constant";

const defaultValues: NoteFormType = { title: "", content: "", tags: [] };

const NoteModal = ({
  isModalOpen,
  setIsModalOpen,
  editId,
  setEditId,
  refetchNotes,
  isViewMode,
}: NoteModalProps) => {
  const { pathname } = useLocation();

  const { control, handleSubmit, setValue, reset } = useForm<NoteFormType>({
    defaultValues,
  });

  const note = useMemo(() => getNoteById(editId), [editId]);

  const handleClose = () => {
    reset(defaultValues);
    setIsModalOpen(false);
    setEditId(undefined);
  };

  const handleFavorite = () => {
    if (!editId) return;

    handleFavoriteToggle(editId);
    const updatedNote = getNoteById(editId);

    if (!updatedNote?.isFavorite && pathname === ROUTES.FAVORITE_NOTES) {
      handleClose();
    }

    refetchNotes();
  };

  const handleFormSubmit = (data: NoteFormType) => {
    const isEmpty =
      !data.title.trim() && !data.content.trim() && data.tags.length === 0;

    if (isEmpty) return toast.error("Fields are empty.");

    const noteId = editId || crypto.randomUUID();
    const payload = {
      ...data,
      id: noteId,
      createdDate: new Date().toISOString(),
      isFavorite: note?.isFavorite ?? false,
    };

    addUpdateNote(payload);
    refetchNotes();
    handleClose();
  };

  useEffect(() => {
    if (note) {
      setValue("title", note.title);
      setValue("content", note.content);
      setValue("tags", note.tags);
    }
  }, [note, setValue]);

  return (
    <Modal
      isOpen={isModalOpen}
      title="Note"
      onClose={handleClose}
      handleSaveSubmit={handleSubmit(handleFormSubmit)}
      hasSave={!isViewMode}
      handleFavoriteSubmit={editId ? handleFavorite : undefined}
      isFavorite={note?.isFavorite ?? false}
    >
      <form className="flex flex-col gap-0">
        <TextInput
          name="title"
          placeholder="Title"
          control={control}
          disabled={isViewMode}
        />
        <TextArea
          name="content"
          placeholder="Content..."
          control={control}
          disabled={isViewMode}
        />
        <TagsInput
          name="tags"
          placeholder={isViewMode ? "" : "Add tags here"}
          control={control}
          disabled={isViewMode}
        />
      </form>
    </Modal>
  );
};

export default NoteModal;
