import React from "react";
import { type GlobalContextValue } from "./useGlobalProvider";

// https://kentcdodds.com/blog/how-to-use-react-context-effectively
export const GlobalContext = React.createContext<
  GlobalContextValue | undefined
>(undefined);

export function useGlobal() {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}
