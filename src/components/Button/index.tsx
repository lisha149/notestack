import type { ButtonProps } from "@notestack/@types/props";

const Button = ({ icon, label, onClick }: ButtonProps) => {
  return (
    <button
      className="flex items-center gap-1 p-2 bg-(--primary) text-white rounded-lg text-sm cursor-pointer"
      onClick={onClick}
    >
      {icon && icon}
      {label}
    </button>
  );
};

export default Button;
