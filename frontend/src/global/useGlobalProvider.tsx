import React, { useCallback, useState } from "react";
import { GlobalContext } from "./useGlobal";
import type { DisplaySettings } from "../types";
import { defaultDisplaySettings } from "../constants";
import { featuresData } from "../features/features";
import { useRoomCode } from "../room/room";
import { GenericSocketMessage, useWebSocketConnection } from "../socket";

export type GlobalContextValue = ReturnType<typeof useGlobalContext>;

function useGlobalContext() {
  const [visibleFeatureId, setVisibleFeatureId] = useState<string | null>(null);

  const visibleFeature = featuresData.find(
    (item) => item.id === visibleFeatureId
  );

  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>(
    defaultDisplaySettings
  );

  const { data: roomId } = useRoomCode();

  const callback = useCallback((msg: GenericSocketMessage) => {
    switch (msg.action) {
      case "selectFeature":
        setVisibleFeatureId(msg.payload?.id || "");
        break;
      default:
        console.log("Unhandled action:", msg);
    }
  }, []);

  const { socketConnected } = useWebSocketConnection(roomId, callback);

  return {
    visibleFeature,
    visibleFeatureId,
    setVisibleFeatureId,
    displaySettings,
    setDisplaySettings,
    features: featuresData,
    socketConnected,
  };
}

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const value = useGlobalContext();

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
