import { useGlobal } from "../global/useGlobal";
import { renderFeatureTitle } from "./feature";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export function FeatureList() {
  const { displaySettings, features, visibleFeature, setVisibleFeature } =
    useGlobal();

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
      setVisibleFeature(feature);
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
