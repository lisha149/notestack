import { useController, type FieldValues } from "react-hook-form";

import type { GenericInputProps } from "@notestack/@types/props";

const TextInput = <TFieldValues extends FieldValues>({
  name,
  control,
  placeholder = "",
}: GenericInputProps<TFieldValues>) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <input
      {...field}
      className="border-none p-2 outline-0 text-md text-(--text-color)"
      placeholder={placeholder}
      type="text"
    />
  );
};

export default TextInput;
