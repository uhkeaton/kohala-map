import cx from "classnames";
import { useGlobal } from "./useGlobal";
import { Feature } from "./types";
import { toCssFilterString } from "./filter";
import { ID_EDITED_FEATURE } from "./featureEditDefault";
import { Point } from "./Point";

export function FeatureSlideMap({ feature }: { feature: Feature }) {
  const { mapConfig, visibleFeatureId, isEditingRow } = useGlobal();

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
      {mapConfig?.mapImgSrc && (
        <img
          className={cx("w-full absolute inset-0")}
          src={mapConfig?.mapImgSrc}
          style={{
            transform: `${mapConfig.mapTransform}`,
          }}
        />
      )}

      {mapConfig?.mapRedMaskPositiveSrc && (
        <img
          className={cx("w-full absolute inset-0")}
          src={mapConfig?.mapRedMaskPositiveSrc}
          style={{
            transform: `${mapConfig.mapTransform}`,
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
      {mapConfig?.mapRedMaskNegativeSrc && (
        <img
          className={cx("w-full absolute inset-0")}
          src={mapConfig?.mapRedMaskNegativeSrc}
          style={{
            transform: `${mapConfig.mapTransform}`,
            ...(filterNegative && { filter: filterNegative }),
          }}
        />
      )}
      {imgSrc && (
        <img
          style={{
            transform: `${mapConfig.mapTransform}`,
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
          transform: `${mapConfig.mapTransform}`,
        }}
      >
        <Point point={feature} />
      </div>
    </div>
  );
}
