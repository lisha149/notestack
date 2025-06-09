import { Link, useLocation } from "react-router-dom";
import type { SidebarItemWrapperType } from "@notestack/@types/props";

const LinkItem = ({
  label,
  icon,
  isActive,
  handleClick,
  isSidebarOpen,
}: SidebarItemWrapperType) => {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg w-full  ${
        isSidebarOpen ? "px-8 py-3" : "py-2 justify-center"
      } ${
        isActive
          ? "text-white bg-gradient-to-r from-[#fd7210] via-[#fca311] to-[#fcd34d]"
          : "hover:bg-gray-200"
      } cursor-pointer transition-all duration-200`}
      onClick={handleClick}
      title={label}
    >
      <div className={`${isActive ? "text-white" : "text-gray-600"}`}>
        {icon}
      </div>
      {isSidebarOpen && (
        <span
          className={`text-sm font-medium whitespace-nowrap
          ${isActive ? "text-white" : "text-gray-600"}
        `}
        >
          {label}
        </span>
      )}
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
