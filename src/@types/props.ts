import type { Dispatch, SetStateAction } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

import type { NoteStoreType } from "./form.types";

export type NavbarProps = {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isSidebarOpen: boolean;
};

export type SidebarProps = {
  isSidebarOpen: boolean;
  handleClick: () => void;
};

export type SidebarItemProps = {
  link: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
};

export type SidebarItemWrapperType = SidebarItemProps & SidebarProps;

export type ButtonProps = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

export type ModalProps = {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  handleFavoriteSubmit?: () => void;
  handleSaveSubmit?: () => void;
  containerWidth?: string;
  hasSave?: boolean;
  hasFavorite?: boolean;
  onClose: () => void;
};

export type GenericInputProps<TFieldValues extends FieldValues> = {
  placeholder?: string;
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export type NoteCardProps = {
  note: NoteStoreType;
  onEdit?: () => void;
  onFavorite?: () => void;
  onDelete?: () => void;
};

export type NoteModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editId?: string;
  setEditId: React.Dispatch<React.SetStateAction<string | undefined>>;
  refetchNotes: () => void;
};
