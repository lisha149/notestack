import { useForm } from "react-hook-form";

import TagsInput from "@notestack/components/Form/TagsInput";
import TextArea from "@notestack/components/Form/TextArea";
import TextInput from "@notestack/components/Form/TextInput";
import Modal from "@notestack/components/Modal";
import type { NoteFormType } from "@notestack/@types/form.types";
import { addUpdateNote } from "@notestack/services";

const defaultValues = { tags: [], title: "", content: "" };

const NoteModal = ({
  isModalOpen,
  setIsModalOpen,
  editId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editId?: string;
}) => {
  const { control, handleSubmit, reset } = useForm<NoteFormType>({
    defaultValues,
  });

  const handleCloseModal = () => {
    reset(defaultValues);
    setIsModalOpen(false);
  };

  const onSubmit = (data: NoteFormType) => {
    const uniqueid = crypto.randomUUID();
    const createdDate = new Date().toISOString().split("T")[0];

    const noteId = editId ? editId : uniqueid;
    const payload = { ...data, id: noteId, createdDate };

    addUpdateNote(payload);
    handleCloseModal();
  };

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
