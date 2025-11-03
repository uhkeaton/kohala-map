import React, { useState } from "react";
import { GlobalContext } from "./useGlobal";
import type { DisplaySettings, Feature } from "../types";
import { defaultDisplaySettings } from "../constants";

export type GlobalContextValue = ReturnType<typeof useGlobalContext>;

function useGlobalContext() {
  const [visibleFeature, setVisibleFeature] = useState<Feature | null>(null);
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>(
    defaultDisplaySettings
  );

  return {
    visibleFeature,
    setVisibleFeature,
    displaySettings,
    setDisplaySettings,
  };
}

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const value = useGlobalContext();

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
