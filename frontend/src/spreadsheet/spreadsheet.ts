import toast from "react-hot-toast";
import { ImageLayer, Feature, Point } from "../types";
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
  "group",
  "title",
  "description",
  "title_hawaiian",
  "description_hawaiian",
  "img_src",
  // points and img layers
  "lat",
  "lon",
  "layer_img_src",
  "layer_img_filter",
  // map
  "min_lon",
  "min_lat",
  "max_lat",
  "max_lon",
  "map_aspect_ratio",
  "map_width_percent",
  "map_img_src",
  "map_transform",
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
  mapTransform: "",
};

export type SpreadsheetRow = Record<
  (typeof knownSpreadsheetKeys)[number],
  string
>;

export class FeatureNonSerializable {
  id: string;
  title: string;
  description: string;
  titleHawaiian: string;
  descriptionHawaiian: string;
  imgSrc: string;
  point: Point | null;
  imgLayer: ImageLayer | null;

  constructor(row: SpreadsheetRow, id: string) {
    this.id = id;
    this.title = row.title;
    this.description = row.description;
    this.titleHawaiian = row.title_hawaiian;
    this.descriptionHawaiian = row.description_hawaiian;
    this.imgSrc = row.img_src;

    // Point
    const point: Point = {
      coordinates: [parseFloat(row.lon), parseFloat(row.lat)],
    };
    this.point = point;

    // Image Layer
    const imageLayer: ImageLayer = {
      imgSrc: row.layer_img_src,
      filter: row.layer_img_filter,
    };
    this.imgLayer = imageLayer;
  }

  /** React state should be serializable, not a class like this */
  public toSerializable(): Feature {
    return {
      title: this.title,
      description: this.description,
      titleHawaiian: this.titleHawaiian,
      descriptionHawaiian: this.descriptionHawaiian,
      point: this.point,
      layer: this.imgLayer,
      imgSrc: this.imgSrc,
    };
  }
}

// Need to create an inverse of this function. Given mapconfig and feature, give a tsv
export function parseSheet(tsv: string) {
  const features: FeatureNonSerializable[] = [];

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
        minLon: parseFloat(row.min_lon),
        minLat: parseFloat(row.min_lat),
        maxLon: parseFloat(row.max_lon),
        maxLat: parseFloat(row.max_lat),
        mapAspectRatioX: parseFloat(row.map_aspect_ratio.split(":")[0]),
        mapAspectRatioY: parseFloat(row.map_aspect_ratio.split(":")[1]),
        mapWidthPercent: parseFloat(row.map_width_percent),
        mapImgSrc: row.map_img_src,
        mapTransform: row.map_transform,
      };
    }
    // All other rows are features
    else {
      features.push(new FeatureNonSerializable(row, String(i)));
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
