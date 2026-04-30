import { useEffect, useRef, useCallback } from "react";

export function useResettableInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(callback);
  const intervalId = useRef<number | null>(null);

  // keep latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const reset = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    intervalId.current = window.setInterval(() => {
      savedCallback.current();
    }, delay);
  }, [delay]);

  // start on mount
  useEffect(() => {
    reset();
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [reset]);

  return reset;
}
