import { CssFilter } from "./filter";

export type DisplaySettings = {
  /**
   * Map Display
   */
  showFeatureList: boolean;
  /**
   * Drawer
   */
  showMainDrawer: boolean;
  /**
   * Dialogs
   */
  showDialogShareRoom: boolean;
  showDialogCreateRoom: boolean;
  showDialogManualJoinRoom: boolean;
  showDialogDataSource: boolean;
};

// [long, lat] follows the GeoJSON convention
type Longitude = number;
type Latitude = number;
export type Coordinates = [Longitude, Latitude];

export type FeaturePointProperties = {
  pointLon: number;
  pointLat: number;
  pointFilter?: CssFilter | string;
};

type FeatureInfoProperties = {
  infoGroup: string;
  infoTitle: string;
  infoDescription: string;
  infoTitleHawaiian: string;
  infoDescriptionHawaiian: string;
  mediaImgSrc: string;
  mediaVideoSrc: string;
};

type FeatureMapProperties = {
  mapImgSrc?: string;
  mapImgFilter?: CssFilter | string;
  mapVideoSrc?: string;
  mapVideoFilter?: CssFilter | string;
  mapMaskFilterPositive?: CssFilter | string;
  mapMaskFilterNegative?: CssFilter | string;
};

export type Feature = {
  id: string; // generated on the frontend, not stored
} & FeatureInfoProperties &
  FeatureMapProperties &
  FeaturePointProperties;
