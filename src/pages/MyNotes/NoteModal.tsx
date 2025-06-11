import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import TagsInput from "@notestack/components/Form/TagsInput";
import TextArea from "@notestack/components/Form/TextArea";
import TextInput from "@notestack/components/Form/TextInput";
import Modal from "@notestack/components/Modal";
import type { NoteFormType } from "@notestack/@types/form.types";
import type { NoteModalProps } from "@notestack/@types/props";
import { addUpdateNote, getNoteById } from "@notestack/services";

const defaultValues = { tags: [], title: "", content: "" };

const NoteModal = ({
  isModalOpen,
  setIsModalOpen,
  editId,
  setEditId,
  refetchNotes,
}: NoteModalProps) => {
  const { control, handleSubmit, setValue, reset } = useForm<NoteFormType>({
    defaultValues,
  });

  const handleCloseModal = () => {
    reset(defaultValues);
    setIsModalOpen(false);
    setEditId(undefined);
  };

  const onSubmit = (data: NoteFormType) => {
    const uniqueid = crypto.randomUUID();
    const createdDate = new Date().toISOString();
    const isEmpty =
      !data.title?.trim() &&
      !data.content?.trim() &&
      (!data.tags || data.tags.length === 0);
    if (isEmpty) return toast.error("Fields are empty.");

    const noteId = editId ? editId : uniqueid;
    const payload = {
      ...data,
      id: noteId,
      createdDate,
      isFavorite: note?.isFavorite,
    };

    addUpdateNote(payload);
    refetchNotes();
    handleCloseModal();
  };

  const note = getNoteById(editId);

  useEffect(() => {
    if (editId && note) {
      setValue("title", note.title);
      setValue("content", note.content);
      setValue("tags", note.tags);
    }
  }, [setValue, editId, note]);

  return (
    <Modal
      isOpen={isModalOpen}
      title="Note"
      onClose={handleCloseModal}
      handleSaveSubmit={handleSubmit(onSubmit)}
    >
      <form className="flex flex-col gap-0">
        <TextInput name="title" placeholder="Title" control={control} />
        <TextArea name="content" placeholder="Content..." control={control} />
        <TagsInput name="tags" placeholder="Add tags here" control={control} />
      </form>
    </Modal>
  );
};

export default NoteModal;
