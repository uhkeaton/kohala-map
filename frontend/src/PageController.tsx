import debounce from "lodash.debounce";
import { useGlobal } from "./useGlobal";
import { useRoomCode } from "./room/room";
import { useEffect, useMemo } from "react";
import { useWebSocketConnection } from "./room/roomSocket";
import { VisitorFeatureSelect } from "./VisitorFeatureSelect";
import { DrawerApp } from "./DrawerApp";
import { dispatchVisibleFeatureId } from "./fade";

export function PageController() {
  const { features, setVisibleFeatureState, featuresQuery } = useGlobal();
  const { roomCode } = useRoomCode();
  const { send } = useWebSocketConnection(roomCode);

  useEffect(() => {
    const root = document.documentElement;
    root.style.backgroundColor = "white";
    return () => {
      root.style.backgroundColor = "black";
    };
  }, []);

  const handleChange = useMemo(
    () =>
      debounce((id: string) => {
        if (!id) return;

        const feature = features.find((item) => item.id === id);
        if (!feature) return;

        setVisibleFeatureState(dispatchVisibleFeatureId(id));

        send?.({
          action: "selectFeature",
          payload: {
            id: feature.id,
          },
        });
      }, 50),
    [features, send, setVisibleFeatureState],
  );

  if (featuresQuery?.isLoading) {
    return (
      <div className="p-32">
        <img className="visible-dark h-16 w-16 m-auto" src="/loader-dark.gif" />
      </div>
    );
  }

  return (
    <>
      <DrawerApp mode="controller" />
      <VisitorFeatureSelect onChange={handleChange} />
    </>
  );
}
