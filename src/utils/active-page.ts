import { sidebarItems } from "./sidebar";

export const getActivePage = (pathname: string) => {
  return sidebarItems.find((item) => item?.link === pathname);
};
