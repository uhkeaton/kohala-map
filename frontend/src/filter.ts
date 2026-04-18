export type CssFilter = {
  hueRotate?: number; // deg
  saturate?: number;
  brightness?: number; // 1 = 100%
  opacity?: number; // 0–1
};

export type FilterProperty =
  | "hue-rotate"
  | "saturate"
  | "brightness"
  | "opacity";

export const colorFilters: FilterProperty[] = [
  "hue-rotate",
  "saturate",
  "brightness",
];

export function toCssFilterString(
  filter?: CssFilter | string,
): string | undefined {
  if (!filter) return undefined;
  if (typeof filter === "string") return filter;

  const parts: string[] = [];

  if (
    filter.hueRotate != null &&
    filter.hueRotate !== IDENTITY_FILTER.hueRotate
  ) {
    parts.push(`hue-rotate(${filter.hueRotate}deg)`);
  }

  if (filter.saturate != null && filter.saturate !== IDENTITY_FILTER.saturate) {
    parts.push(`saturate(${filter.saturate})`);
  }

  if (
    filter.brightness != null &&
    filter.brightness !== IDENTITY_FILTER.brightness
  ) {
    parts.push(`brightness(${filter.brightness})`);
  }

  if (filter.opacity != null && filter.opacity !== IDENTITY_FILTER.opacity) {
    parts.push(`opacity(${filter.opacity})`);
  }

  return parts.length ? parts.join(" ") : undefined;
}

export const IDENTITY_FILTER: Required<CssFilter> = {
  hueRotate: 0, // no rotation
  saturate: 1, // 100%
  brightness: 1, // 100%
  opacity: 1, // fully visible
};

export function fromCssFilterString(input?: string | CssFilter): CssFilter {
  if (!input) return IDENTITY_FILTER;

  if (typeof input !== "string") {
    return { ...IDENTITY_FILTER, ...input };
  }

  const result: CssFilter = { ...IDENTITY_FILTER };

  const regex = /(\w+-?\w*)\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input))) {
    const [, name, rawValue] = match;
    const value = rawValue.trim();

    switch (name) {
      case "hue-rotate":
        result.hueRotate = parseFloat(value.replace("deg", ""));
        break;

      case "saturate":
        result.saturate = parseFloat(value);
        break;

      case "brightness":
        result.brightness = parseFloat(value);
        break;

      case "opacity":
        result.opacity = parseFloat(value);
        break;
    }
  }

  return result;
}
