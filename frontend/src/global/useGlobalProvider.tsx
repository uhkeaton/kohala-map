import React, { useCallback, useState } from "react";
import { GlobalContext } from "./useGlobal";
import type { DisplaySettings, FormData} from "../types/types";
import { defaultDisplaySettings } from "../constants";
import { useRoomCode } from "../room/room";
import { GenericSocketMessage, useWebSocketConnection } from "../socket";
import { dataSourceOptions } from "../spreadsheet/dataSourceOptions";
import { useSearchParams } from "react-router";
import { FeatureNonSerializable, initialMapConfig, MapConfig } from "../spreadsheet/spreadsheet";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchSpreadsheet } from "../api";

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

  // Pasting contents of body of useSpreadsheets
  const [, setSearchParams] = useSearchParams();
  const { send } = useWebSocketConnection(roomCode);

  const query = useQuery({
    queryKey: ["spreadsheet", spreadsheetId],
    queryFn: () => fetchSpreadsheet(spreadsheetId),
    placeholderData: keepPreviousData,
  });

  const features = query.data?.features ?? [];
  const mapConfig = query.data?.mapConfig ?? initialMapConfig;

  const[editMode, setEditMode] = useState(false)
  const [editedMapConfig, setEditedMapConfig] = useState<MapConfig | null>(null) // when editing, can look if null
  const [editiedFeatures, setEditingFeatures] = useState<FeatureNonSerializable[] | null>(null) // When editing, will use "fake" features that are a copy
  let visibleFeature;

  if (editiedFeatures)
  {
    visibleFeature = editiedFeatures.find((item) => item.id === visibleFeatureId);
  }
  else
  {
    visibleFeature = features.find((item) => item.id === visibleFeatureId);
  }
    

  const handleEnterEditMapConfig = () => {
    setEditedMapConfig(mapConfig);
    setEditingFeatures(features.map(f => f.clone()));
  };

  const handleExitEditMapConfig = () => {
    setEditedMapConfig(null);
    setEditingFeatures(null);
  };

  const changeFeature = (formData: FormData) => {
    if (editiedFeatures) {
      let targetFeature = editiedFeatures.find((item) => item.id === formData.id);
      if (targetFeature)
      {
        targetFeature.title = formData.title;
        targetFeature.description = formData.description;
        targetFeature.titleHawaiian = formData.titleHawaiian;
        targetFeature.descriptionHawaiian = formData.descriptionHawaiian;
        targetFeature.imgSrc = formData.imgSrc;
      }
    };
    
  };

  const handleChangeSpreadsheetId = (id: string) => {
    setSpeadsheetId(id);
    send?.({
      action: "selectSpreadsheetId",
      payload: {
        id: id,
      },
    });
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sheet_id", String(id));
      return next;
    });
  };

  return {
    visibleFeatureId,
    setVisibleFeatureId,
    displaySettings,
    setDisplaySettings,
    socketConnected,
    spreadsheetId,
    setSpeadsheetId,
    query,
    visibleFeature,
    features: editiedFeatures? editiedFeatures : features,
    mapConfig: editedMapConfig? editedMapConfig: mapConfig, // when edit mode, take mapConfig, into editedMapConfig
    handleChangeSpreadsheetId,
    handleEnterEditMapConfig,
    handleExitEditMapConfig,
    setEditedMapConfig,
    editMode,
    setEditMode,
    changeFeature
  };
}

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const value = useGlobalContext();

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
