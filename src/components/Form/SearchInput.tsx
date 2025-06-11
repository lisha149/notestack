import { useDebouncedCallback } from "@notestack/hooks/useDebounceCallback";

const SearchInput = ({
  setSearchText,
}: {
  setSearchText: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const debouncedSearch = useDebouncedCallback((value) => {
    setSearchText?.(value?.trim());
  }, 300);

  return (
    <input
      className="p-2 min-w-50 outline-0 text-md text-(--text-color) border-b-1 border-gray-200 dark:border-gray-600 w-20"
      placeholder={"Search by title/tags.."}
      onChange={(e) => debouncedSearch(e.target.value)}
    />
  );
};

export default SearchInput;
