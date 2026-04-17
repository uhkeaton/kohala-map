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

const isDevMode = import.meta.env.DEV;

export const defaultDisplaySettings: DisplaySettings = {
  showFeatureList: isDevMode,
  //
  showMainDrawer: false,
  //
  showDialogShareRoom: false,
  showDialogCreateRoom: false,
  showDialogManualJoinRoom: false,
  showDialogDataSource: false,
};
