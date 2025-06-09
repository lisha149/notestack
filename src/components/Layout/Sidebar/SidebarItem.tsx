import { Link, useLocation } from "react-router-dom";

import type { SidebarItemWrapperType } from "@notestack/@types/props";

const LinkItem = ({
  label,
  icon,
  isActive,
  handleClick,
}: SidebarItemWrapperType) => {
  return (
    <div
      className={`flex items-center gap-0 rounded-lg w-full px-8 py-3
        ${
          isActive
            ? "text-white bg-gradient-to-r from-[#fd7210] via-[#fca311] to-[#fcd34d]"
            : "hover:bg-gray-50"
        }
        cursor-pointer
      `}
      onClick={() => {
        handleClick();
      }}
    >
      <div className={`flex items-center gap-2`}>
        {icon && (
          <div className={`${isActive ? "text-white" : "text-gray-600"}`}>
            {icon}
          </div>
        )}

        <span
          className={`text-sm font-medium whitespace-nowrap
            ${isActive ? "text-white" : "text-gray-600"}
          `}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

const SidebarItem = (props: SidebarItemWrapperType) => {
  const { pathname } = useLocation();

  const { link } = props;

  return (
    <Link to={link ?? "#"} className="block">
      <LinkItem {...props} isActive={link === pathname} />
    </Link>
  );
};

export default SidebarItem;
