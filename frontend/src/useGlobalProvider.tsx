import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { GlobalContext } from "./useGlobal";
import type { DisplaySettings, Feature, View } from "./types";
import { defaultDisplaySettings } from "./constants";
import { useRoomCode } from "./room/room";
import {
  GenericSocketMessage,
  useWebSocketConnection,
} from "./room/roomSocket";
import { useNavigate, useSearchParams } from "react-router";
import { initialWorldConfig } from "./data/spreadsheet";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchSpreadsheet } from "./api";
import { defaultInitialFeature } from "./feature";
import {
  DataSource,
  localStorageKeyDataSource,
  permanentDataSources,
} from "./data/dataSource";
import { useLocalStorage } from "./useLocalStorage";
import { useResettableInterval } from "./useResettableInterval";
import {
  dispatchVisibleFeatureId,
  initialVisibilityState,
  VisibleFeatureState,
} from "./fade";

export type GlobalContextValue = ReturnType<typeof useGlobalContext>;

function useGlobalContext() {
  const navigate = useNavigate();

  const [savedDataSources, setSavedDataSources] = useLocalStorage<DataSource[]>(
    localStorageKeyDataSource,
    [],
  );

  const [slideCount, setSlideCount] = useState(0);

  const [isEditingRow, setIsEditingRow] = useState(false);
  const [editedFeature, setEditedFeature] = useState<Feature>(
    defaultInitialFeature,
  );

  const [visibleFeatureState, setVisibleFeatureState] =
    useState<VisibleFeatureState>(initialVisibilityState);

  // the first item in the list is the visible one
  const visibleFeatureId = visibleFeatureState.visibleId;

  const [searchParams] = useSearchParams();
  const urlSheetId = searchParams.get("sheet_id");
  const [spreadsheetId, setSpeadsheetId] = useState(
    urlSheetId ?? permanentDataSources[0]?.id ?? "",
  );

  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>(
    defaultDisplaySettings,
  );

  const { roomCode } = useRoomCode();

  const callback = useCallback(
    (msg: GenericSocketMessage) => {
      switch (msg.action) {
        case "selectFeature":
          setVisibleFeatureState(
            dispatchVisibleFeatureId(msg.payload?.id || ""),
          );
          break;
        case "selectSpreadsheetId":
          setSpeadsheetId(msg.payload?.id || "");
          break;
        default:
          break;
        // console.log("Unhandled action:", msg);
      }
    },
    [setVisibleFeatureState],
  );

  const { socketConnected } = useWebSocketConnection(roomCode, callback);

  const [, setSearchParams] = useSearchParams();
  const { send } = useWebSocketConnection(roomCode);

  const featuresQuery = useQuery({
    queryKey: ["spreadsheet", spreadsheetId],
    queryFn: () => fetchSpreadsheet(spreadsheetId),
    placeholderData: keepPreviousData,
  });

  // on load
  useEffect(() => {
    if (featuresQuery.data) {
      const first = (featuresQuery.data?.features ?? [])[0];
      if (first?.id) {
        setVisibleFeatureState(dispatchVisibleFeatureId(first?.id));
      }
    }
  }, [featuresQuery.data]);

  const { features, worldConfig, headers } = useMemo(() => {
    const features = featuresQuery.data?.features ?? [];
    const worldConfig = featuresQuery.data?.worldConfig ?? initialWorldConfig;
    const headers = featuresQuery.data?.headers ?? [];
    return { features, worldConfig, headers };
  }, [featuresQuery.data]);

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

  // the slide counter increases every 10 seconds
  const reset = useResettableInterval(() => {
    // fires every 10 seconds
    setSlideCount((c) => c + 1);
  }, 15000);

  // when the visible feature changes, reset the slide counter to 0
  useLayoutEffect(() => {
    setSlideCount(0);
    reset();
  }, [reset, visibleFeatureId]);

  const goTo = (view: View) => {
    if (view === "welcome") {
      navigate({
        pathname: "/welcome",
      });
    }
    if (view === "map-connect") {
      navigate({
        pathname: "/welcome/map",
      });
    }
    if (view === "map") {
      navigate({
        pathname: "/map",
      });
    }
    if (view === "controller-connect") {
      navigate({
        pathname: "/welcome/controller",
      });
    }
    if (view === "controller") {
      navigate({
        pathname: "/controller",
      });
    }
    if (view === "editor") {
      navigate({
        pathname: "/editor",
      });
    }
  };

  return {
    visibleFeatureId,
    visibleFeatureState,
    setVisibleFeatureState,
    displaySettings,
    setDisplaySettings,
    socketConnected,
    spreadsheetId,
    setSpeadsheetId,
    featuresQuery,
    //
    features,
    worldConfig,
    headers,
    //
    handleChangeSpreadsheetId,
    editedFeature,
    setEditedFeature,
    isEditingRow,
    setIsEditingRow,

    //
    savedDataSources,
    setSavedDataSources,

    //
    slideCount,
    setSlideCount,

    //
    goTo,
  };
}

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const value = useGlobalContext();

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
