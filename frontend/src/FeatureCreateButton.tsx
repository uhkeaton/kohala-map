import { Button } from "@mui/material";
import { useGlobal } from "./useGlobal";
import { defaultInitialFeature } from "./feature";

export function FeatureCreateButton() {
  const { setEditedFeature, setDisplaySettings, setIsEditingRow, worldConfig } =
    useGlobal();
  return (
    <div>
      <Button
        className="w-full"
        onClick={() => {
          // initialize edited feature if there is none already
          setEditedFeature((s) => (s ? s : defaultInitialFeature(worldConfig)));
          setDisplaySettings((s) => ({
            ...s,
            showMainDrawer: false,
          }));
          setIsEditingRow(true);
        }}
        variant="contained"
      >
        Create a Row
      </Button>
    </div>
  );
}
