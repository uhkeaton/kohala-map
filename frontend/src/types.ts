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

export type Feature = {
  id: string;
  titleEnglish: string;
  descriptionEnglish: string;
  coordinates: Coordinates;
  imgSrc?: string;
  titleHawaiian?: string;
  descriptionHawaiian?: string;
};
