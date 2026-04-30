import cx from "classnames";
import { Feature } from "./types";
import { toCssFilterString } from "./filter";
import redSquare from "/red-square.png";

export function FeatureVisibleBackground({ feature }: { feature: Feature }) {
  const filterNegative = toCssFilterString(feature?.mapMaskFilterNegative);

  return (
    <img
      className={cx("w-full h-full absolute inset-0")}
      src={redSquare}
      style={{
        // in Safari, force GPU compositing.
        // This is done to match the color of the negative mask filter, which
        // also uses GPU compositing in Safari when placed over a video
        // and there doesn't seem to be a way to disable that
        transform: "translate3d(0,0,0)",
        objectFit: "cover",
        ...(filterNegative && { filter: filterNegative }),
      }}
    />
  );
}
