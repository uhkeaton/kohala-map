import type { DisplaySettings, Feature } from "../types/types";

export function renderFeatureTitle(
  feature: Feature,
  settings: DisplaySettings
) {
  switch (settings.language) {
    case "haw": {
      return feature.titleHawaiian || feature.title;
    }
    case "eng":
    default: {
      return feature.title;
    }
  }
}

export function renderFeatureDescription(
  feature: Feature,
  settings: DisplaySettings
) {
  switch (settings.language) {
    case "haw": {
      return feature.descriptionHawaiian || feature.description;
    }
    case "eng":
    default: {
      return feature.description;
    }
  }
}
