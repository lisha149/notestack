import { useController, type FieldValues } from "react-hook-form";

import type { GenericInputProps } from "@notestack/@types/props";

const TextInput = <TFieldValues extends FieldValues>({
  name,
  control,
  placeholder = "",
  disabled,
}: GenericInputProps<TFieldValues>) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <input
      {...field}
      className={`border-none p-2 outline-0  ${
        disabled
          ? "text-(--primary) text-lg font-medium"
          : "text-(--text-color) text-md"
      }`}
      placeholder={placeholder}
      type="text"
      disabled={disabled}
    />
  );
};

export default TextInput;
