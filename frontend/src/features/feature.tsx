import type { DisplaySettings, Feature } from "../types";

export function renderFeatureTitle(
  feature: Feature,
  settings: DisplaySettings
) {
  switch (settings.language) {
    case "haw": {
      return feature.titleHawaiian || feature.titleEnglish;
    }
    case "eng":
    default: {
      return feature.titleEnglish;
    }
  }
}

export function renderFeatureDescription(
  feature: Feature,
  settings: DisplaySettings
) {
  switch (settings.language) {
    case "haw": {
      return feature.descriptionHawaiian || feature.descriptionEnglish;
    }
    case "eng":
    default: {
      return feature.descriptionEnglish;
    }
  }
}
