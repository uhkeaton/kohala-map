import toast from "react-hot-toast";
import { Feature } from "../types";
import { Database } from "./database";
import { toCssFilterString } from "../filter";

export const knownSpreadsheetKeys = [
  // features
  "info_group",
  "info_title",
  "info_description",
  "info_img_src",
  "info_video_src",

  // points
  "point_lat",
  "point_lon",
  "point_filter",

  // featured map image
  "map_img_src",
  "map_img_filter",
  "map_video_src",
  "map_video_filter",
  "map_mask_filter_positive",
  "map_mask_filter_negative",
  "map_terrain_filter",
  "map_description_bottom_left",

  // map
  "world_min_lon",
  "world_min_lat",
  "world_max_lat",
  "world_max_lon",
  "world_aspect_ratio",
  "world_width_percent",
  "world_terrain_img_src",
  "world_red_mask_positive_src",
  "world_red_mask_negative_src",
  "world_flip",
] as const;

export type SpreadsheetKey = (typeof knownSpreadsheetKeys)[number];

export type WorldConfig = {
  minLon: number;
  minLat: number;
  maxLon: number;
  maxLat: number;
  mapAspectRatioX: number;
  mapAspectRatioY: number;
  mapWidthPercent: number;
  mapTerrainImgSrc: string;
  mapRedMaskPositiveSrc: string;
  mapRedMaskNegativeSrc: string;
  mapFlip: boolean;
};

export const initialWorldConfig: WorldConfig = {
  minLon: NaN,
  minLat: NaN,
  maxLon: NaN,
  maxLat: NaN,
  mapAspectRatioX: NaN,
  mapAspectRatioY: NaN,
  mapWidthPercent: NaN,
  mapTerrainImgSrc: "",
  mapRedMaskPositiveSrc: "",
  mapRedMaskNegativeSrc: "",
  mapFlip: false,
};

export type SpreadsheetRow = Record<SpreadsheetKey, string>;

export function rowToFeature(row: SpreadsheetRow, id: string): Feature {
  return {
    id: id,

    // info properties
    infoGroup: row.info_group,
    infoTitle: row.info_title,
    infoDescription: row.info_description,
    mapDescriptionBottomLeft: row.map_description_bottom_left,
    mediaImgSrc: row.info_img_src,
    mediaVideoSrc: row.info_video_src,

    // point properties
    pointLat: parseFloat(row.point_lat),
    pointLon: parseFloat(row.point_lon),
    pointFilter: removeSemicolon(row.point_filter),

    // map properties
    mapImgSrc: row.map_img_src,
    mapImgFilter: removeSemicolon(row.map_img_filter),
    mapVideoSrc: row.map_video_src,
    mapVideoFilter: removeSemicolon(row.map_video_filter),
    mapMaskFilterPositive: removeSemicolon(row.map_mask_filter_positive),
    mapMaskFilterNegative: removeSemicolon(row.map_mask_filter_negative),
    mapTerrainFilter: removeSemicolon(row.map_terrain_filter),
  };
}

export function featureToRow(feature: Feature, headers: string[]): string {
  const row: SpreadsheetRow = {
    info_group: feature?.infoGroup || "",
    info_title: feature?.infoTitle || "",
    info_description: feature?.infoDescription || "",
    info_img_src: feature?.mediaImgSrc || "",
    info_video_src: feature?.mediaVideoSrc || "",
    point_lat: String(feature?.pointLat),
    point_lon: String(feature?.pointLon),
    point_filter: toCssFilterString(feature?.pointFilter) || "",
    map_img_src: feature?.mapImgSrc || "",
    map_img_filter: toCssFilterString(feature?.mapImgFilter) || "",
    map_video_src: feature?.mapVideoSrc || "",
    map_video_filter: toCssFilterString(feature?.mapVideoFilter) || "",
    map_mask_filter_positive:
      toCssFilterString(feature?.mapMaskFilterPositive) || "",
    map_mask_filter_negative:
      toCssFilterString(feature?.mapMaskFilterNegative) || "",
    map_terrain_filter: toCssFilterString(feature?.mapTerrainFilter) || "",
    map_description_bottom_left: feature?.mapDescriptionBottomLeft || "",

    // world config properties
    world_min_lon: "",
    world_min_lat: "",
    world_max_lat: "",
    world_max_lon: "",
    world_aspect_ratio: "",
    world_width_percent: "",
    world_terrain_img_src: "",
    world_red_mask_positive_src: "",
    world_red_mask_negative_src: "",
    world_flip: "",
  };

  return headers
    .map((h) => {
      const header = h as SpreadsheetKey;
      if (!knownSpreadsheetKeys.includes(header)) {
        toast.error(`Unkown header (${header}) during copy.`);
      }
      const val = row[header] || "";
      return val;
    })
    .join("\t");
}

export function parseSheet(tsv: string) {
  const features: Feature[] = [];

  const db = new Database<SpreadsheetRow>(tsv, knownSpreadsheetKeys);

  let worldConfig: WorldConfig = initialWorldConfig;

  db.forEachItem((row, i) => {
    // Skip the Header
    if (i === 0) {
      return;
    }

    // The Map Config should be the first row in the sheet under the header
    else if (i === 1) {
      worldConfig = {
        minLon: parseFloat(row.world_min_lon),
        minLat: parseFloat(row.world_min_lat),
        maxLon: parseFloat(row.world_max_lon),
        maxLat: parseFloat(row.world_max_lat),
        mapAspectRatioX: parseFloat(row.world_aspect_ratio.split(":")[0]),
        mapAspectRatioY: parseFloat(row.world_aspect_ratio.split(":")[1]),
        mapWidthPercent: parseFloat(row.world_width_percent),
        mapTerrainImgSrc: row.world_terrain_img_src,
        mapRedMaskPositiveSrc: row.world_red_mask_positive_src,
        mapRedMaskNegativeSrc: row.world_red_mask_negative_src,
        mapFlip: strIsTrue(row.world_flip),
      };
    }

    // All other rows are features
    else {
      features.push(
        rowToFeature(row, `${slugify(row.info_title)}-${String(i)}`),
      );
    }
  });

  // Check that all Map Config values are present
  (
    [
      "mapAspectRatioX",
      "mapAspectRatioY",
      "mapWidthPercent",
      "maxLat",
      "maxLon",
      "minLat",
      "minLon",
    ] as const
  ).forEach((key) => {
    if (isNaN(worldConfig[key])) {
      toast.error(`Missing value for ${key} in map config`);
    }
  });

  return {
    worldConfig: worldConfig,
    features: features,
    headers: db.headers,
  };
}

function removeSemicolon(str: string) {
  return str.replace(/;/g, "");
}

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      // keep letters and spaces only
      .replace(/[^a-z\s]/g, "")
      // trim and replace spaces with dash
      .trim()
      .replace(/\s+/g, "-")
  );
}

function strIsTrue(str: string | undefined) {
  return (str || "").toLowerCase() === "true";
}
