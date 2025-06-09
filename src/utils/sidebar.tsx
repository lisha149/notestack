import {
  FavoriteNoteIcon,
  NoteIcon,
  TrashNoteIcon,
} from "@notestack/assets/svg";
import { ROUTES } from "@notestack/routes/route.constant";

export const sidebarItems = [
  {
    label: "My Notes",
    icon: <NoteIcon />,
    link: ROUTES.MY_NOTES,
  },
  {
    label: "Favorite Notes",
    icon: <FavoriteNoteIcon />,
    link: ROUTES.FAVORITE_NOTES,
  },
  {
    label: "Trash Notes",
    icon: <TrashNoteIcon />,
    link: ROUTES.TRASH_NOTES,
  },
];
