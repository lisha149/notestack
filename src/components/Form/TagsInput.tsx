import { useState } from "react";
import { useController, type FieldValues } from "react-hook-form";

import type { GenericInputProps } from "@notestack/@types/props";
import { CrossIcon } from "@notestack/assets/svg";

const TagsInput = <TFieldValues extends FieldValues>({
  name,
  control,
  placeholder = "Add tags (press Enter or ,)",
  disabled,
}: GenericInputProps<TFieldValues>) => {
  const {
    field: { value = [], onChange },
  } = useController({ name, control });

  const [input, setInput] = useState("");

  const tags = value as string[];

  const addTag = (tag?: string) => {
    const newTag: string = (tag ?? input).trim();
    if (newTag && !tags.includes(newTag)) {
      onChange([...tags, newTag]);
    }
    setInput("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag: string) => tag !== tagToRemove));
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.includes(",")) {
      const parts = val.split(",");
      parts.forEach((part) => {
        const trimmed = part.trim();
        if (trimmed) addTag(trimmed);
      });
      setInput("");
    } else {
      setInput(val);
    }
  };

  const handleBlur = () => {
    if (input.trim()) {
      addTag();
    }
  };

  return (
    <div
      className={`flex flex-wrap gap-2 ${
        disabled ? "" : "border"
      } border-gray-200 dark:border-gray-600 rounded-xl p-2 w-full`}
    >
      {value.map((tag: string) => (
        <span
          key={tag}
          className={`flex items-end gap-[3px] bg-(--secondary) dark:bg-(--primary) text-(--primary) dark:text-white ${
            !disabled ? "pl-2 pr-1 py-1" : "p-2"
          }  rounded-lg text-sm`}
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="cursor-pointer"
            >
              <CrossIcon />
            </button>
          )}
        </span>
      ))}

      <input
        type="text"
        className="flex-1 border-none outline-none text-sm text-(--text-color)"
        name={name}
        value={input}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TagsInput;
