import { useEffect } from "react";

import {
  LovelyIcon,
  TickCircleIcon,
  CrossCircleIcon,
} from "@notestack/assets/svg";
import type { ModalProps } from "@notestack/@types/props";

const Modal = ({
  isOpen,
  title = "",
  children,
  handleSaveSubmit,
  handleFavoriteSubmit,
  hasSave = true,
  onClose,
  isFavorite,
}: ModalProps) => {
  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen flex justify-center items-start py-10 transition-all duration-300 0.5s ease-in ${
        isOpen ? "z-[50]" : "-z-10"
      }`}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isOpen ? "bg-(--bg-light-color) overflow-auto" : "overflow-hidden"
        } `}
        onClick={onClose}
      ></div>

      <div
        className={
          "relative  bg-(--layer-fill) rounded-2xl shadow-xl transition-all duration-300 sm:w-[480px] w-[350px]"
        }
        style={{ top: isOpen ? "0" : "-100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 px-4 py-3 relative">
          <button className="cursor-pointer" onClick={onClose}>
            <CrossCircleIcon />
          </button>
          <h2 className=" font-semibold text-(--primary)">{title}</h2>

          <div className="flex gap-2">
            {handleFavoriteSubmit && (
              <button
                onClick={() => handleFavoriteSubmit()}
                className="cursor-pointer"
                title="Favorite"
              >
                <LovelyIcon className={isFavorite ? "fill-red-500" : ""} />
              </button>
            )}
            {hasSave && handleSaveSubmit && (
              <button
                onClick={() => handleSaveSubmit()}
                className="cursor-pointer"
                title="Save"
              >
                <TickCircleIcon />
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-4 pt-4 pb-6">{children} </div>
      </div>
    </div>
  );
};

export default Modal;
