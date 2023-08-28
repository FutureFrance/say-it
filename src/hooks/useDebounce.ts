'use client'

import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState<string>();

  useEffect(() => {
    const timer = setTimeout(async () => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    }
  }, [value, delay]);

  return debouncedValue;
}