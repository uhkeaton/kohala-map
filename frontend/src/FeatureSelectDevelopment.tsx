import { useGlobal } from "./useGlobal";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRoomCode } from "./room/room";
import { useWebSocketConnection } from "./socket";

export function FeatureSelectDevelopment() {
  const { features, visibleFeatureId, setVisibleFeatureId, isEditingRow } =
    useGlobal();

  const { roomCode } = useRoomCode();
  const { send } = useWebSocketConnection(roomCode);

  const Options = features.map((item) => {
    return (
      <MenuItem key={item.id} value={item.id}>
        {item.infoTitle}
      </MenuItem>
    );
  });

  const handleChange = (event: SelectChangeEvent) => {
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

  return (
    <div className="w-full h-full p-4">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Feature</InputLabel>
          <Select
            value={visibleFeatureId || ""}
            label="Feature"
            onChange={handleChange}
          >
            {Options}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
