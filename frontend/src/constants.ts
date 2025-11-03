import type { DisplaySettings } from "./types";

// real latitude coordinate range
export const mapMinX = -155.905;
export const mapMaxX = -155.58;

// real longitude coordinate range
export const mapMinY = 20.01;
export const mapMaxY = 20.27;

// calculations for web
export const mapRealWidthInches = 29.5;
export const tableRealWidthInches = 42.666;

export const defaultDisplaySettings: DisplaySettings = {
  language: "eng",
  showMapOutline: true,
  showFeatureList: true,
};
