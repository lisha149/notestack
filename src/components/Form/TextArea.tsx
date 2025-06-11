import type { GenericInputProps } from "@notestack/@types/props";

import { useController, type FieldValues } from "react-hook-form";

const TextArea = <TFieldValues extends FieldValues>({
  name,
  control,
  placeholder = "",
  disabled = false,
}: GenericInputProps<TFieldValues>) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <textarea
      {...field}
      name="content"
      className="p-2 outline-0 text-md text-(--text-color) resize-none border-t-1 border-gray-200 dark:border-gray-600"
      placeholder={placeholder}
      rows={7}
      disabled={disabled}
    />
  );
};

export default TextArea;
