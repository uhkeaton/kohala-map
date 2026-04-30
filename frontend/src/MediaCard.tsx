import { slideFadeInClasses, slideFadeOutClasses } from "./fade";
import { MediaItem } from "./media";
import cx from "classnames";

export function MediaCard({
  item,
  visible,
}: {
  item: MediaItem;

  visible: boolean;
}) {
  if (item.type == "video") {
    return (
      <video
        className={cx(
          "absolute inset-0 w-full h-full object-cover rounded-lg",
          {
            "opacity-0": !visible,
            [slideFadeOutClasses]: !visible,
            [slideFadeInClasses]: visible,
          },
        )}
        src={item.src}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }

  if (item.type == "img") {
    return (
      <img
        className={cx(
          "absolute inset-0 w-full h-full object-cover rounded-lg",
          {
            "opacity-0": !visible,
            [slideFadeOutClasses]: !visible,
            [slideFadeInClasses]: visible,
          },
        )}
        src={item.src}
      />
    );
  }

  return null;
}
