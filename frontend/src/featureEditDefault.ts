import { Feature } from "./types";

export const ID_EDITED_FEATURE = "editedFeature";

const filterLimeGreen = "hue-rotate(90deg) saturate(2.5) brightness(2)";
const filterBlue = "hue-rotate(-132deg)";

const hawaiianVideoSrc =
  "https://videos.pexels.com/video-files/28828609/12487971_1920_1080_60fps.mp4";
const hawaiianChainImgSrc =
  "https://upload.wikimedia.org/wikipedia/commons/1/1b/ISS-38_Hawaiian_Island_chain.jpg";

export function defaultInitialFeature(): Feature {
  return {
    id: ID_EDITED_FEATURE,
    infoGroup: "",
    // info properties
    infoTitle: "Untitled",
    infoDescription: "This is a new feature.",
    infoTitleHawaiian: "",
    infoDescriptionHawaiian: "",
    mediaImgSrc: hawaiianChainImgSrc,
    mediaVideoSrc: hawaiianVideoSrc,
    // point properties
    pointLat: 0,
    pointLon: 0,
    pointFilter: "",
    // map properties
    mapImgSrc: "",
    mapImgFilter: "",
    mapVideoSrc: "",
    mapVideoFilter: "",
    mapMaskFilterPositive: filterLimeGreen,
    mapMaskFilterNegative: filterBlue,
  };
}
