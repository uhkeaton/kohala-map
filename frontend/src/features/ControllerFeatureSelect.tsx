import { useGlobal } from "../global/useGlobal";
import { useWebSocketConnection } from "../socket";
import { renderFeatureTitle } from "./feature";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRoomCode } from "../room/room";

export function ControllerFeatureSelect() {
  const { displaySettings, features, visibleFeature } = useGlobal();
  const { data: roomId } = useRoomCode();

  //   const socketMutation = useSocketMutation();
  const { send } = useWebSocketConnection(roomId);

  const Options = features.map((item) => {
    return (
      <MenuItem value={item.id}>
        {renderFeatureTitle(item, displaySettings)}
      </MenuItem>
    );
  });

  const handleChange = (event: SelectChangeEvent) => {
    const feature = features.find(
      (item) => item.id === (event.target.value as string)
    );
    if (feature) {
      send?.({
        room_code: roomId || "",
        action: "selectFeature",
        payload: {
          id: feature.id,
        },
      });
    }
  };

  return (
    <div className="w-full h-full p-4">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Feature</InputLabel>
          <Select
            value={visibleFeature?.id}
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
