import { Feature } from "./types";

export const ID_EDITED_FEATURE = "editedFeature";

const filterLimeGreen = "hue-rotate(90deg) saturate(2.5) brightness(2)";
const filterBlue = "hue-rotate(-132deg)";
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
  infoTitle: "Untitled",
  infoDescription: "This is a new feature.",
  infoTitleHawaiian: "",
  infoDescriptionHawaiian: "",
  mediaImgSrc: hawaiianChainImgSrc,
  mediaVideoSrc: hawaiianVideoSrc,
  // point properties
  pointLat: NaN,
  pointLon: NaN,
  pointFilter: "",
  // map properties
  mapImgSrc:
    "https://pub-152d85f2b45343dd9221cf5d705d3ddb.r2.dev/volcano-mask.png",
  mapImgFilter: "",
  mapVideoSrc:
    "https://videos.pexels.com/video-files/10470719/10470719-hd_1920_1080_24fps.mp4",
  mapVideoFilter: "opacity(0.3)",
  mapMaskFilterPositive: filterLimeGreen,
  mapMaskFilterNegative: filterBlue,
  mapTerrainFilter: "saturate(2.0)",
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
