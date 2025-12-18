export type DisplaySettings = {
  language: "eng" | "haw";
  showMapOutline: boolean;
  /**
   * Map Alignment Mask to help align the projector with the real map.
   */
  showMapAlignmentMask: boolean;
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
  id: string;
  title: string;
  description: string;
  titleHawaiian: string;
  descriptionHawaiian: string;
  imgSrc: string;
  points: Point[];
  layers?: ImageLayer[];
};
