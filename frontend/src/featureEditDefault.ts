import { Feature } from "./types";

export const ID_EDITED_FEATURE = "editedFeature";

const filterLimeGreen = "hue-rotate(90deg) saturate(300%) brightness(150%)";
const filterBlue = "hue-rotate(222deg)";

const hawaiianChainImgSrc =
  "https://upload.wikimedia.org/wikipedia/commons/1/1b/ISS-38_Hawaiian_Island_chain.jpg";

export function defaultInitialFeature(): Feature {
  return {
    id: ID_EDITED_FEATURE,
    title: "Untitled",
    description: "This is a new feature.",
    titleHawaiian: "",
    descriptionHawaiian: "",
    imgSrc: hawaiianChainImgSrc,
    videoSrc: "",
    point: {
      coordinates: [0, 0],
      pointFilter: "",
    },
    mapLayer: {
      featureImgSrc: "",
      featureImgFilter: "",
      featureVideoSrc: "",
      featureVideoFilter: "",
      featureMaskFilterPositive: filterLimeGreen,
      featureMaskFilterNegative: filterBlue,
    },
  };
}
