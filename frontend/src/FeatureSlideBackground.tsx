import cx from "classnames";
import { Feature } from "./types";
import { toCssFilterString } from "./filter";
import { useGlobal } from "./useGlobal";
import { ID_EDITED_FEATURE } from "./feature";

export function FeatureSlideBackground({ feature }: { feature: Feature }) {
  const { visibleFeatureId, isEditingRow } = useGlobal();
  const filterNegative = toCssFilterString(feature?.mapMaskFilterNegative);

  const visible = (function () {
    if (isEditingRow) return feature.id === ID_EDITED_FEATURE;
    return visibleFeatureId == feature.id;
  })();

  return (
    <div
      className={cx("w-full absolute inset-0", {
        hidden: !visible,
      })}
      style={{
        // the negative mask image should also be solid red, so they change together
        background: "red",
        ...(filterNegative && { filter: filterNegative }),
      }}
    />
  );
}
