import React, { useCallback, useState } from "react";
import { GlobalContext } from "./useGlobal";
import type { DisplaySettings } from "../types/types";
import { defaultDisplaySettings } from "../constants";
import { useRoomCode } from "../room/room";
import { GenericSocketMessage, useWebSocketConnection } from "../socket";
import { dataSourceOptions } from "../spreadsheet/dataSourceOptions";
import { useSearchParams } from "react-router";

export type GlobalContextValue = ReturnType<typeof useGlobalContext>;

function useGlobalContext() {
  const [visibleFeatureId, setVisibleFeatureId] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const urlSheetId = searchParams.get("sheet_id");
  const [spreadsheetId, setSpeadsheetId] = useState(
    urlSheetId ?? dataSourceOptions[0].id
  );

  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>(
    defaultDisplaySettings
  );

  const { roomCode } = useRoomCode();

  const callback = useCallback((msg: GenericSocketMessage) => {
    switch (msg.action) {
      case "selectFeature":
        setVisibleFeatureId(msg.payload?.id || "");
        break;
      case "selectSpreadsheetId":
        setSpeadsheetId(msg.payload?.id || "");
        break;
      default:
        console.log("Unhandled action:", msg);
    }
  }, []);

  const { socketConnected } = useWebSocketConnection(roomCode, callback);

  return {
    visibleFeatureId,
    setVisibleFeatureId,
    displaySettings,
    setDisplaySettings,
    socketConnected,
    spreadsheetId,
    setSpeadsheetId,
  };
}

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const value = useGlobalContext();

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
