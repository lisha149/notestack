import { useState } from "react";

const SortInput = ({
  onSort,
}: {
  onSort: (sortBy: "date" | "title") => void;
}) => {
  const [sortBy, setSortBy] = useState<"date" | "title">("date");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "date" | "title";
    setSortBy(value);
    onSort(value);
  };

  return (
    <select
      value={sortBy}
      onChange={handleChange}
      className="text-sm border-1 border-gray-200 dark:border-gray-600 outline-0 rounded-lg cursor-pointer block w-full p-2.5 focus:outline-none bg-(--layer-fill) text-(--text-color) max-w-fit"
    >
      <option value="date">Date</option>
      <option value="title">Title</option>
    </select>
  );
};

export default SortInput;
