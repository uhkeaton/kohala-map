import cx from "classnames";
import { useGlobal } from "./useGlobal";
import { Feature } from "./types";
import { toCssFilterString } from "./filter";
import { ID_EDITED_FEATURE } from "./feature";
import { Point } from "./Point";

export function FeatureSlideMap({ feature }: { feature: Feature }) {
  const { worldConfig, visibleFeatureId, isEditingRow } = useGlobal();

  const filterImg = toCssFilterString(feature?.mapImgFilter);
  const filterVideo = toCssFilterString(feature?.mapVideoFilter);
  const filterPositive = toCssFilterString(feature?.mapMaskFilterPositive);
  const filterNegative = toCssFilterString(feature?.mapMaskFilterNegative);

  const videoSrc = feature?.mapVideoSrc;
  const imgSrc = feature?.mapImgSrc;

  const visible = (function () {
    if (isEditingRow) return feature.id === ID_EDITED_FEATURE;
    return visibleFeatureId == feature.id;
  })();

  return (
    <div
      className={cx("w-full absolute inset-0", {
        // only show the visible feature
        hidden: !visible,
      })}
    >
      {/*  */}
      {worldConfig?.mapImgSrc && (
        <img
          className={cx("w-full absolute inset-0")}
          src={worldConfig?.mapImgSrc}
          style={{
            transform: `${worldConfig.mapTransform}`,
          }}
        />
      )}

      {worldConfig?.mapRedMaskPositiveSrc && (
        <img
          className={cx("w-full absolute inset-0")}
          src={worldConfig?.mapRedMaskPositiveSrc}
          style={{
            transform: `${worldConfig.mapTransform}`,
            ...(filterPositive && { filter: filterPositive }),
          }}
        />
      )}
      {/* Video does not receive map transform.*/}
      {videoSrc && (
        <video
          className={cx("absolute inset-0 w-full h-full object-cover")}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          style={{
            ...(filterVideo && { filter: filterVideo }),
          }}
        />
      )}
      {/*  */}
      {worldConfig?.mapRedMaskNegativeSrc && (
        <img
          className={cx("w-full absolute inset-0")}
          src={worldConfig?.mapRedMaskNegativeSrc}
          style={{
            transform: `${worldConfig.mapTransform}`,
            ...(filterNegative && { filter: filterNegative }),
          }}
        />
      )}
      {imgSrc && (
        <img
          style={{
            transform: `${worldConfig.mapTransform}`,
            ...(filterImg && {
              filter: filterImg,
            }),
          }}
          className={cx("w-full absolute inset-0")}
          src={imgSrc}
        />
      )}
      <div
        className={cx("w-full absolute inset-0")}
        style={{
          transform: `${worldConfig.mapTransform}`,
        }}
      >
        <Point point={feature} />
      </div>
    </div>
  );
}
