import { motion } from "framer-motion";

import {
  CalendarIcon,
  LovelyIcon,
  MessageEditIcon,
  TrashIcon,
} from "@notestack/assets/svg";
import type { NoteCardProps } from "@notestack/@types/props";
import { formatDateTime } from "@notestack/utils/format-date-time";

import Checkbox from "../Form/Checkbox";

const MAX_VISIBLE_TAGS = 3;

const NoteCard = ({
  note,
  onEdit,
  onFavorite,
  onDelete,
  onView,
  selectedNoteIds,
  setSelectedNoteIds,
}: NoteCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-(--card-bg) rounded-xl shadow-md border-l-4 border-(--secondary) p-4 flex flex-col justify-between"
    >
      <div className="cursor-pointer" onClick={onView}>
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-(--primary) truncate sm:max-w-[144px] md:max-w-[143px] lg:max-w-[214px]">
            {note.title}
          </h3>

          <div className="flex items-center gap-2">
            <div className="text-(--text-color)">
              <CalendarIcon />
            </div>
            <div className="flex flex-col gap-0 text-xs text-(--text-color)">
              <div>{formatDateTime(note.createdDate)?.split(",")?.[0]}</div>
              <div>{formatDateTime(note.createdDate)?.split(",")?.[1]}</div>
            </div>
          </div>
        </div>

        <p
          className={`text-(--text-color) text-sm mb-4 mt-2 wrap-break-word line-clamp-4 ${
            note.tags.length > 0 ? "pb-0" : "pb-3"
          }`}
        >
          {note.content}
        </p>

        {note?.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-3">
            {note?.tags?.slice(0, MAX_VISIBLE_TAGS).map((tag, index) => (
              <div
                key={index}
                className="text-xs font-medium px-2 py-1 rounded-full bg-(--secondary) dark:bg-(--primary) text-(--primary) dark:text-white cursor-auto"
              >
                {tag}
              </div>
            ))}
            {note?.tags?.length > MAX_VISIBLE_TAGS && (
              <div
                title={note.tags.slice(MAX_VISIBLE_TAGS).join(", ")}
                className="text-xs font-medium px-2 py-1 rounded-full bg-(--secondary) dark:bg-(--primary) text-(--primary) dark:text-white cursor-pointer"
              >
                +{note.tags.length - MAX_VISIBLE_TAGS}
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className={`flex items-center ${
          onFavorite ? "justify-between" : "justify-end"
        } gap-2 pt-2`}
      >
        <div className="flex gap-2 items-center">
          <Checkbox
            noteId={note?.id}
            selectedNoteIds={selectedNoteIds}
            setSelectedNoteIds={setSelectedNoteIds}
          />
          {onFavorite && (
            <button
              className="cursor-pointer"
              title="Favorite"
              onClick={onFavorite}
            >
              <LovelyIcon
                className={
                  note?.isFavorite
                    ? "fill-red-500 text-red-500"
                    : "fill-none text-gray-400"
                }
              />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              className="cursor-pointer text-(--primary)"
              title="Edit"
              onClick={onEdit}
            >
              <MessageEditIcon />
            </button>
          )}
          {onDelete && (
            <button
              className="cursor-pointer"
              title="Delete"
              onClick={onDelete}
            >
              <TrashIcon />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;
