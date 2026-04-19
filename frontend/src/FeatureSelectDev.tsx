import { useGlobal } from "./useGlobal";
import { Box, FormControl, NativeSelect } from "@mui/material";
import { useRoomCode } from "./room/room";
import { useWebSocketConnection } from "./room/socket";
import { ChangeEventHandler } from "react";
import { featuresByGroup } from "./feature";

export function FeatureSelectDev() {
  const { features, visibleFeatureId, setVisibleFeatureId, isEditingRow } =
    useGlobal();

  const { roomCode } = useRoomCode();
  const { send } = useWebSocketConnection(roomCode);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (event.target.value) {
      setVisibleFeatureId(event.target.value);
    }

    //
    if (visibleFeatureId == event.target.value) {
      return;
    }

    //
    const feature = features.find(
      (item) => item.id === (event.target.value as string),
    );

    //
    if (feature) {
      send?.({
        action: "selectFeature",
        payload: {
          id: feature.id,
        },
      });
    }
  };

  if (isEditingRow) return <></>;

  // group by group property
  const groupedFeatures = featuresByGroup(features);

  return (
    <div className="w-full h-full p-4 bg-neutral-600/50 rounded-lg">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <NativeSelect
            id="feature-native"
            value={visibleFeatureId || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a feature
            </option>

            {groupedFeatures.map(([group, items]) => (
              <optgroup key={group} label={group}>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.infoTitle}
                  </option>
                ))}
              </optgroup>
            ))}
          </NativeSelect>
        </FormControl>
      </Box>
    </div>
  );
}
