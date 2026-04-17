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
export type Longitude = number;
export type Latitude = number;
export type Coordinates = [Longitude, Latitude];

export type Point = {
  coordinates: Coordinates;
  pointFilter?: string;
};

export type MapLayer = {
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
  videoSrc: string;
  point: Point | null;
  mapLayer: MapLayer | null;
};

export type FilterValue =
  | string
  | {
      hueRotate?: number; // deg
      saturate?: number;
      brightness?: number; // 1 = 100%
      grayscale?: number; // 0–1
      //
      blur?: number; // px
      contrast?: number;
      invert?: number; // 0–1
      opacity?: number; // 0–1
      sepia?: number; // 0–1
    };

export function toCssFilter(filter?: FilterValue): string | undefined {
  if (!filter) return undefined;
  if (typeof filter === "string") return filter;

  const parts: string[] = [];

  if (filter.blur != null) parts.push(`blur(${filter.blur}px)`);
  if (filter.brightness != null) parts.push(`brightness(${filter.brightness})`);
  if (filter.contrast != null) parts.push(`contrast(${filter.contrast})`);
  if (filter.grayscale != null) parts.push(`grayscale(${filter.grayscale})`);
  if (filter.hueRotate != null)
    parts.push(`hue-rotate(${filter.hueRotate}deg)`);
  if (filter.invert != null) parts.push(`invert(${filter.invert})`);
  if (filter.opacity != null) parts.push(`opacity(${filter.opacity})`);
  if (filter.saturate != null) parts.push(`saturate(${filter.saturate})`);
  if (filter.sepia != null) parts.push(`sepia(${filter.sepia})`);

  return parts.join(" ");
}
