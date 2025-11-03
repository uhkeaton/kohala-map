// [long, lat] follows the GeoJSON convention
export type Longitude = number;
export type Latitude = number;
export type Coordinates = [Longitude, Latitude];

export type Feature = {
  id: string;
  titleEnglish: string;
  descriptionEnglish: string;
  coordinates: Coordinates;
  imgSrc?: string;
  titleHawaiian?: string;
  descriptionHawaiian?: string;
};
