import { Feature } from "./types";

export const ID_EDITED_FEATURE = "editedFeature";

const filterLimeGreen = "hue-rotate(90deg) saturate(2.5) brightness(2)";
const filterBlue = "hue-rotate(-141deg)";
// const filterWheat =
//   "hue-rotate(54deg) saturate(0.59) brightness(2.37) opacity(0.7)";

const hawaiianVideoSrc =
  "https://videos.pexels.com/video-files/28828609/12487971_1920_1080_60fps.mp4";
const hawaiianChainImgSrc =
  "https://upload.wikimedia.org/wikipedia/commons/1/1b/ISS-38_Hawaiian_Island_chain.jpg";

export const defaultInitialFeature: Feature = {
  id: ID_EDITED_FEATURE,
  infoGroup: "",
  // info properties
  infoTitle: "Kohala Map",
  infoDescription:
    "Edit your map features here, then paste the result into Google Sheets. Customize map colors, background color, point latitude and longitude, and add overlay images or videos.",
  mediaImgSrc: hawaiianChainImgSrc,
  mediaVideoSrc: hawaiianVideoSrc,
  // point properties
  pointLat: NaN,
  pointLon: NaN,
  pointFilter: "",
  // map properties
  mapImgSrc: "",
  mapImgFilter: "",
  mapVideoSrc: "",
  mapVideoFilter: "",
  mapMaskFilterPositive: filterLimeGreen,
  mapMaskFilterNegative: filterBlue,
  mapTerrainFilter: "saturate(2.0)",
  mapDescriptionBottomLeft: "E hoʻokomo i ka ʻōlelo ma ʻaneʻi nō kekahi.",
};

export function featuresByGroup(features: Feature[]) {
  const grouped = features.reduce<Map<string, Feature[]>>((acc, item) => {
    const key = item.infoGroup.trim() || "Other";

    if (!acc.has(key)) {
      acc.set(key, []);
    }

    acc.get(key)!.push(item);
    return acc;
  }, new Map());

  return Array.from(grouped.entries());
}
