import toast from "react-hot-toast";
import { Feature } from "../types";
import { Database } from "./database";

// @ts-expect-error enum
export enum SpreadSheetItemType {
  config = "config",
  feature = "feature",
  point = "point",
  layer_img = "layer_img",
}

export const knownSpreadsheetKeys = [
  // added in code
  "row_index",
  // features
  "info_group",
  "info_title",
  "info_description",
  "info_title_hawaiian",
  "info_description_hawaiian",
  "info_img_src",
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

export type MapConfig = {
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

export const initialMapConfig = {
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

export type SpreadsheetRow = Record<
  (typeof knownSpreadsheetKeys)[number],
  string
>;

function rowToFeature(row: SpreadsheetRow, id: string): Feature {
  return {
    id: id,
    title: row.info_title,
    description: row.info_description,
    titleHawaiian: row.info_title_hawaiian,
    descriptionHawaiian: row.info_description_hawaiian,
    imgSrc: row.info_img_src,
    point: {
      coordinates: [parseFloat(row.point_lon), parseFloat(row.point_lat)],
      pointFilter: removeSemicolon(row.point_filter),
    },
    imgLayer: {
      featureImgSrc: row.feature_img_src,
      featureImgFilter: removeSemicolon(row.feature_img_filter),
      featureVideoSrc: row.feature_video_src,
      featureVideoFilter: removeSemicolon(row.feature_video_filter),
      featureMaskFilterPositive: removeSemicolon(
        row.feature_mask_filter_positive,
      ),
      featureMaskFilterNegative: removeSemicolon(
        row.feature_mask_filter_negative,
      ),
    },
  };
}

export function parseSheet(tsv: string) {
  const features: Feature[] = [];

  const db = new Database<SpreadsheetRow>(tsv, knownSpreadsheetKeys);

  let mapConfig: MapConfig = initialMapConfig;

  db.forEachItem((row, i) => {
    // Skip the Header
    if (i === 0) {
      return;
    }

    // The Map Config should be the first row in the sheet under the header
    else if (i === 1) {
      mapConfig = {
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
      features.push(rowToFeature(row, String(i)));
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
    if (isNaN(mapConfig[key])) {
      toast.error(`Missing value for ${key} in map config`);
    }
  });

  return {
    mapConfig: mapConfig,
    features: features,
  };
}

function removeSemicolon(str: string) {
  return str.replace(/;/g, "");
}
