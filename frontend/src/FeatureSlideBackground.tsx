import cx from "classnames";
import { Feature } from "./types";
import { toCssFilterString } from "./filter";
import redSquare from "/red-square.png";

export function FeatureSlideBackground({
  feature,
  visible,
}: {
  feature: Feature;
  visible: boolean;
}) {
  const filterNegative = toCssFilterString(feature?.mapMaskFilterNegative);

  return (
    <img
      className={cx("w-full h-full absolute inset-0", {
        hidden: !visible,
      })}
      src={redSquare}
      style={{
        objectFit: "cover",
        ...(filterNegative && { filter: filterNegative }),
      }}
    />
  );
}
