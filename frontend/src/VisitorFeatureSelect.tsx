import { useGlobal } from "./useGlobal";
import { useWebSocketConnection } from "./socket";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRoomCode } from "./room/room";

export function VisitorFeatureSelect() {
  const { features, visibleFeatureId } = useGlobal();
  const { roomCode } = useRoomCode();

  const { send } = useWebSocketConnection(roomCode);

  const Options = features.map((item) => {
    return <MenuItem value={item.id}>{item.description}</MenuItem>;
  });

  const handleChange = (event: SelectChangeEvent) => {
    const feature = features.find(
      (item) => item.id === (event.target.value as string),
    );
    if (feature) {
      send?.({
        action: "selectFeature",
        payload: {
          id: feature.id,
        },
      });
    }
  };

  return (
    <div className="w-full h-full">
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
