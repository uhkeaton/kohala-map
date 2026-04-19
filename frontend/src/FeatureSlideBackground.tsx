import cx from "classnames";
import { Feature } from "./types";
import { toCssFilterString } from "./filter";
import { useGlobal } from "./useGlobal";
import { ID_EDITED_FEATURE } from "./feature";
import redSquare from "/red-square.png";

export function FeatureSlideBackground({ feature }: { feature: Feature }) {
  const { visibleFeatureId, isEditingRow } = useGlobal();
  const filterNegative = toCssFilterString(feature?.mapMaskFilterNegative);

  const visible = (function () {
    if (isEditingRow) return feature.id === ID_EDITED_FEATURE;
    return visibleFeatureId == feature.id;
  })();

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
