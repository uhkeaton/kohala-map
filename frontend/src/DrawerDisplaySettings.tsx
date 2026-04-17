import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useGlobal } from "./useGlobal";

export function DrawerDisplaySettings() {
  const { displaySettings, setDisplaySettings } = useGlobal();
  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={displaySettings.showFeatureList}
              onChange={() =>
                setDisplaySettings((s) => ({
                  ...s,
                  showFeatureList: !s.showFeatureList,
                }))
              }
              slotProps={{ input: { "aria-label": "controlled" } }}
            />
          }
          label="Show Feature List"
        />
      </FormGroup>
    </div>
  );
}
