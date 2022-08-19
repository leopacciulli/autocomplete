import { useState, useEffect } from 'react';

export const useDebounce = (value: string, delay = 600): string => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};
