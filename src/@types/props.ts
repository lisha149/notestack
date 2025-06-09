import type { Dispatch, SetStateAction } from "react";

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
