export type DisplaySettings = {
  showFeatureList: boolean;
  /**
   * Dialogs
   */
  showDialogShareRoom: boolean;
  showDialogCreateRoom: boolean;
  showDialogManualJoinRoom: boolean;
  showDialogDataSource: boolean;
};

// [long, lat] follows the GeoJSON convention
export type Longitude = number;
export type Latitude = number;
export type Coordinates = [Longitude, Latitude];

export type Point = {
  coordinates: Coordinates;
  pointFilter?: string;
};

export type ImageLayer = {
  featureImgSrc?: string;
  featureImgFilter?: string;
  featureVideoSrc?: string;
  featureVideoFilter?: string;
  featureMaskFilterPositive?: string;
  featureMaskFilterNegative?: string;
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  titleHawaiian: string;
  descriptionHawaiian: string;
  imgSrc: string;
  mapRedMaskPositiveSrc: string;
  mapRedMaskNegativeSrc: string;
  point: Point | null;
  imgLayer: ImageLayer | null;
};
