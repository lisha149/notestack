import { useCallback, useEffect, useRef } from "react";

export function useDebouncedCallback(
  callback: (val: string) => void,
  delay = 500
) {
  const timeoutRef = useRef<number | null>(null);

  const debounced = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(value);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return debounced;
}
