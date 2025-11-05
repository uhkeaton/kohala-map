// [long, lat] follows the GeoJSON convention
export type Longitude = number;
export type Latitude = number;
export type Coordinates = [Longitude, Latitude];

export type DisplaySettings = {
  language: "eng" | "haw";
  showMapOutline: boolean;
  /**
   * Map Alignment Mask to help align the projector with the real map.
   */
  showMapAlignmentMask: boolean;
  showFeatureList: boolean;
  showJoinRoomDialog: boolean;
  showCreateRoomDialog: boolean;
};

type Point = {
  coordinates: Coordinates;
};
type Layer = {
  imgSrc: string;
  filter?: string;
};

export type Feature = {
  id: string;
  titleEnglish: string;
  descriptionEnglish: string;
  points?: Point[];
  layers?: Layer[];
  imgSrc?: string;
  titleHawaiian?: string;
  descriptionHawaiian?: string;
};
