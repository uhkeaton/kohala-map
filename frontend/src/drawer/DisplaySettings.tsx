import { Button, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useGlobal } from "../global/useGlobal";

export function DisplaySettings() {
  const { displaySettings, setDisplaySettings } = useGlobal();

  const { showMapOutline, showFeatureList, showMapAlignmentMask } =
    displaySettings;

  function enterDisplayMode() {
    setDisplaySettings((s) => ({
      ...s,
      showMapOutline: false,
      showFeatureList: false,
      showMapAlignmentMask: false,
    }));
  }

  const isDisplayMode =
    !showMapOutline && !showFeatureList && !showMapAlignmentMask;

  return (
    <div>
      <div className="my-2">
        <Button
          disabled={isDisplayMode}
          className="w-full"
          onClick={enterDisplayMode}
          variant="outlined"
        >
          Enter Display Mode
        </Button>
      </div>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={displaySettings.showMapOutline}
              onChange={() =>
                setDisplaySettings((s) => ({
                  ...s,
                  showMapOutline: !s.showMapOutline,
                }))
              }
              slotProps={{ input: { "aria-label": "controlled" } }}
            />
          }
          label="Show Map Outline"
        />
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
        <FormControlLabel
          control={
            <Switch
              checked={displaySettings.showMapAlignmentMask}
              onChange={() =>
                setDisplaySettings((s) => ({
                  ...s,
                  showMapAlignmentMask: !s.showMapAlignmentMask,
                }))
              }
              slotProps={{ input: { "aria-label": "controlled" } }}
            />
          }
          label="Show Map Alignment Mask"
        />
      </FormGroup>
    </div>
  );
}
