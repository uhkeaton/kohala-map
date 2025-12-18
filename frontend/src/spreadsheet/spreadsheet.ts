import toast from "react-hot-toast";
import { ImageLayer, Feature, Point } from "../types/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchSpreadsheet } from "../api";
import { assert } from "../helpers";
import { Database } from "./database";
import { useGlobal } from "../global/useGlobal";
import { useRoomCode } from "../room/room";
import { useWebSocketConnection } from "../socket";
import { useSearchParams } from "react-router";

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
  "type",
  "id",
  "title",
  "description",
  "title_hawaiian",
  "description_hawaiian",
  "img_src",
  // points and img layers
  "feature_id",
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

// row_index: string;
// type: string;
// id: string;
// title: string;
// description: string;
// title_hawaiian: string;
// description_hawaiian: string;
// img_src: string;
// feature_id: string;
// lat: string;
// lon: string;
// layer_img_src: string;
// layer_img_filter: string;

// type SpreadsheetRow = Record,

// type SpreadsheetRow = {
//   row_index: string;
//   type: string;
//   id: string;
//   title: string;
//   description: string;
//   title_hawaiian: string;
//   description_hawaiian: string;
//   img_src: string;
//   feature_id: string;
//   lat: string;
//   lon: string;
//   layer_img_src: string;
//   layer_img_filter: string;
// };

export class FeatureNonSerializable {
  type: string;
  id: string;
  title: string;
  description: string;
  titleHawaiian: string;
  descriptionHawaiian: string;
  imgSrc: string;
  points: Point[] = [];
  layers: ImageLayer[] = [];

  constructor(row: SpreadsheetRow) {
    const index = row.row_index;
    this.type = row.type;
    assert(
      this.type === SpreadSheetItemType.feature,
      `Type must be ${SpreadSheetItemType.feature}`
    );
    this.id = row.id;
    assert(this.id != "", `Feature at row (${index}) is missing id.`);
    this.title = row.title;
    this.description = row.description;
    this.titleHawaiian = row.title_hawaiian;
    this.descriptionHawaiian = row.description_hawaiian;
    this.imgSrc = row.img_src;
  }

  public addPoint(row: SpreadsheetRow) {
    const type = row.type;
    assert(
      type === (SpreadSheetItemType.point as SpreadSheetItemType),
      `Type must be ${SpreadSheetItemType.point}`
    );
    const featureId = row.feature_id;
    assert(
      featureId === this.id,
      `Feature id (${featureId}) must match feature id ${this.id}`
    );
    const point: Point = {
      coordinates: [parseFloat(row.lon), parseFloat(row.lat)],
    };
    this.points.push(point);
  }

  public addImageLayer(row: SpreadsheetRow) {
    const type = row.type;
    assert(
      type === SpreadSheetItemType.layer_img,
      `Type must be ${SpreadSheetItemType.layer_img}`
    );
    const featureId = row.feature_id;
    assert(
      featureId === this.id,
      `Feature id (${featureId}) must match feature id ${this.id}`
    );
    const imageLayer: ImageLayer = {
      imgSrc: row.layer_img_src,
      filter: row.layer_img_filter,
    };
    this.layers.push(imageLayer);
  }

  /** React state should be serializable, not a class like this */
  public toSerializable(): Feature {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      titleHawaiian: this.titleHawaiian,
      descriptionHawaiian: this.descriptionHawaiian,
      points: this.points,
      layers: this.layers,
      imgSrc: this.imgSrc,
    };
  }
}

export function parseSheet(tsv: string) {
  const features = new Map<string, FeatureNonSerializable>();

  const db = new Database<SpreadsheetRow>(tsv, knownSpreadsheetKeys);

  let mapConfig: MapConfig = initialMapConfig;

  db.forEachItem((row) => {
    const type = row.type;
    const id = row.id;

    // there should be one config row
    if (type === SpreadSheetItemType.config) {
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

    if (type === SpreadSheetItemType.feature) {
      if (features.has(id)) {
        toast.error(`Duplicate items with id: (${id})`);
        return;
      } else {
        features.set(id, new FeatureNonSerializable(row));
      }
    }
  });

  db.forEachItem((row) => {
    const index = row.row_index;
    const type = row.type;
    const featureId = row.feature_id;
    if (type === SpreadSheetItemType.point) {
      const feature = features.get(featureId);
      if (feature) {
        feature?.addPoint(row);
        features.set(featureId, feature);
      } else {
        toast.error(
          `Missing feature with id (${featureId}) for point at row (${index})`
        );
      }
    } else if (type === SpreadSheetItemType.layer_img) {
      const feature = features.get(featureId);
      if (feature) {
        feature?.addImageLayer(row);
        features.set(featureId, feature);
      } else {
        toast.error(
          `Missing feature with id (${featureId}) for image layer at row (${index})`
        );
      }
    }
  });

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
    features: [...features.values()],
  };
}

export function useSpreadsheet() {
  const [, setSearchParams] = useSearchParams();
  const { visibleFeatureId, spreadsheetId, setSpeadsheetId } = useGlobal();
  const { roomCode } = useRoomCode();
  const { send } = useWebSocketConnection(roomCode);

  const query = useQuery({
    queryKey: ["spreadsheet", spreadsheetId],
    queryFn: () => fetchSpreadsheet(spreadsheetId),
    placeholderData: keepPreviousData,
  });

  const features = query.data?.features ?? [];
  const mapConfig = query.data?.mapConfig ?? initialMapConfig;

  const visibleFeature = features.find((item) => item.id === visibleFeatureId);

  const handleChangeSpreadsheetId = (id: string) => {
    setSpeadsheetId(id);
    send?.({
      action: "selectSpreadsheetId",
      payload: {
        id: id,
      },
    });
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sheet_id", String(id));
      return next;
    });
  };

  return {
    query,
    visibleFeature,
    features,
    mapConfig,
    handleChangeSpreadsheetId,
  };
}
