import { useRoutes } from "react-router-dom";

import MyNotes from "@notestack/pages/MyNotes";
import FavoriteNotes from "@notestack/pages/FavoriteNotes";
import NotFound from "@notestack/components/NotFound";

import { ROUTES } from "./route.constant";

const AppRoutes = () => {
  const allRoutes = [
    {
      path: ROUTES.MY_NOTES,
      element: <MyNotes />,
    },
    {
      path: ROUTES.FAVORITE_NOTES,
      element: <FavoriteNotes />,
    },
    {
      path: ROUTES.NO_MATCH,
      element: <NotFound />,
    },
  ];
  const element = useRoutes(allRoutes);

  return <>{element}</>;
};

export default AppRoutes;
