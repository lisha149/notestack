export type NoteFormType = { title: string; content: string; tags: string[] };
export type NoteStoreType = NoteFormType & {
  id: string;
  createdDate: string;
  isFavorite?: boolean;
};
