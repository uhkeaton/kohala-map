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
};

export type ImageLayer = {
  imgSrc: string;
  filter?: string;
};

export type Feature = {
  title: string;
  description: string;
  titleHawaiian: string;
  descriptionHawaiian: string;
  imgSrc: string;
  point: Point | null;
  layer: ImageLayer | null;
};
