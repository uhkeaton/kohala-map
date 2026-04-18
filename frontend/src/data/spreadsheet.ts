import toast from "react-hot-toast";
import { Feature } from "../types";
import { Database } from "./database";
import { toCssFilterString } from "../filter";

export const knownSpreadsheetKeys = [
  // features
  "info_group",
  "info_title",
  "info_description",
  "info_title_hawaiian",
  "info_description_hawaiian",
  "info_img_src",
  "info_video_src",
  // points
  "point_lat",
  "point_lon",
  "point_filter",
  // featured map image
  "feature_img_src",
  "feature_img_filter",
  "feature_video_src",
  "feature_video_filter",
  "feature_mask_filter_positive",
  "feature_mask_filter_negative",
  // map
  "world_min_lon",
  "world_min_lat",
  "world_max_lat",
  "world_max_lon",
  "world_aspect_ratio",
  "world_width_percent",
  "world_img_src",
  "world_red_mask_positive_src",
  "world_red_mask_negative_src",
  "world_transform",
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
  mapImgSrc: string;
  mapRedMaskPositiveSrc: string;
  mapRedMaskNegativeSrc: string;
  mapTransform: string;
};

export const initialWorldConfig = {
  minLon: NaN,
  minLat: NaN,
  maxLon: NaN,
  maxLat: NaN,
  mapAspectRatioX: NaN,
  mapAspectRatioY: NaN,
  mapWidthPercent: NaN,
  mapImgSrc: "",
  mapRedMaskPositiveSrc: "",
  mapRedMaskNegativeSrc: "",
  mapTransform: "",
};

export type SpreadsheetRow = Record<SpreadsheetKey, string>;

function rowToFeature(row: SpreadsheetRow, id: string): Feature {
  return {
    id: id,

    // info properties
    infoGroup: row.info_group,
    infoTitle: row.info_title,
    infoDescription: row.info_description,
    infoTitleHawaiian: row.info_title_hawaiian,
    infoDescriptionHawaiian: row.info_description_hawaiian,
    mediaImgSrc: row.info_img_src,
    mediaVideoSrc: row.info_video_src,
    // point properties
    pointLat: parseFloat(row.point_lat),
    pointLon: parseFloat(row.point_lon),
    pointFilter: removeSemicolon(row.point_filter),
    // map properties
    mapImgSrc: row.feature_img_src,
    mapImgFilter: removeSemicolon(row.feature_img_filter),
    mapVideoSrc: row.feature_video_src,
    mapVideoFilter: removeSemicolon(row.feature_video_filter),
    mapMaskFilterPositive: removeSemicolon(row.feature_mask_filter_positive),
    mapMaskFilterNegative: removeSemicolon(row.feature_mask_filter_negative),
  };
}

export function featureToRow(feature: Feature, headers: string[]): string {
  const row: SpreadsheetRow = {
    info_group: feature?.infoGroup || "",
    info_title: feature?.infoTitle || "",
    info_description: feature?.infoDescription || "",
    info_title_hawaiian: feature?.infoTitleHawaiian || "",
    info_description_hawaiian: feature?.infoDescriptionHawaiian || "",
    info_img_src: feature?.mediaImgSrc || "",
    info_video_src: feature?.mediaVideoSrc || "",
    point_lat: String(feature?.pointLat),
    point_lon: String(feature?.pointLon),
    point_filter: toCssFilterString(feature?.pointFilter) || "",
    feature_img_src: feature?.mapImgSrc || "",
    feature_img_filter: toCssFilterString(feature?.mapImgFilter) || "",
    feature_video_src: feature?.mapVideoSrc || "",
    feature_video_filter: toCssFilterString(feature?.mapVideoFilter) || "",
    feature_mask_filter_positive:
      toCssFilterString(feature?.mapMaskFilterPositive) || "",
    feature_mask_filter_negative:
      toCssFilterString(feature?.mapMaskFilterNegative) || "",
    // world config properties
    world_min_lon: "",
    world_min_lat: "",
    world_max_lat: "",
    world_max_lon: "",
    world_aspect_ratio: "",
    world_width_percent: "",
    world_img_src: "",
    world_red_mask_positive_src: "",
    world_red_mask_negative_src: "",
    world_transform: "",
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
      console.log({ row });
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
        mapImgSrc: row.world_img_src,
        mapRedMaskPositiveSrc: row.world_red_mask_positive_src,
        mapRedMaskNegativeSrc: row.world_red_mask_negative_src,
        mapTransform: row.world_transform,
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
