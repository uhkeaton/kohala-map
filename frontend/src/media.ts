import { Feature } from "./types";

export type MediaItem = {
  type: "img" | "video";
  src: string;
};

export const DELIM = "|";

export function toMediaItems(feature: Feature): MediaItem[] {
  const items: MediaItem[] = [];
  feature.mediaVideoSrc.split(DELIM).forEach((src) => {
    if (src) items.push({ type: "video", src: src });
  });
  feature.mediaImgSrc.split(DELIM).forEach((src) => {
    if (src) items.push({ type: "img", src: src });
  });
  return items;
}
