import React, { useState } from "react";
import { GlobalContext } from "./useGlobal";
import type { Feature } from "../types";

export type GlobalContextValue = ReturnType<typeof useGlobalContext>;

function useGlobalContext() {
  const [visibleFeature, setVisibleFeature] = useState<Feature | null>(null);
  return {
    visibleFeature,
    setVisibleFeature,
  };
}

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const value = useGlobalContext();

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
