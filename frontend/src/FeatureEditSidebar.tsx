import { Button } from "@mui/material";
import { Feature } from "./types";
import { useGlobal } from "./useGlobal";
import { ButtonClose } from "./ButtonClose";

export const ID_EDITED_FEATURE = "editedFeature";

function defaultInitialFeature(): Feature {
  return {
    id: ID_EDITED_FEATURE,
    title: "Untitled",
    description: "This is a new feature.",
    titleHawaiian: "",
    descriptionHawaiian: "",
    imgSrc: "",
    point: {
      coordinates: [0, 0],
      pointFilter: "",
    },
    imgLayer: {
      featureImgSrc: "",
      featureImgFilter: "",
      featureVideoSrc: "",
      featureVideoFilter: "",
      featureMaskFilterPositive: "",
      featureMaskFilterNegative: "",
    },
  };
}

export function ButtonCreateFeature() {
  const { setEditedFeature, setDisplaySettings, setIsEditingRow } = useGlobal();
  return (
    <div>
      <Button
        className="w-full"
        onClick={() => {
          // initialize edited feature if there is none already
          setEditedFeature((s) => (s ? s : defaultInitialFeature()));
          setDisplaySettings((s) => ({
            ...s,
            showMainDrawer: false,
          }));
          setIsEditingRow(true)
        }}
        variant="contained"
      >
        Create a Row
      </Button>
    </div>
  );
}

export function FeatureEditSidebar() {
  const { setIsEditingRow } = useGlobal();
  return (
    <div>
      <ButtonClose
        onClick={() => {
          setIsEditingRow(false);
        }}
      />
    </div>
  );
}
