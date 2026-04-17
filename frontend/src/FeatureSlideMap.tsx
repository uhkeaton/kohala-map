import cx from "classnames";
import { Point } from "./Point";
import { useGlobal } from "./useGlobal";
import { Feature, toCssFilter } from "./types";
import { ID_EDITED_FEATURE } from "./FeatureEditSidebar";

export function FeatureSlideMap({ feature }: { feature: Feature }) {
  const { mapConfig, visibleFeatureId, isEditingRow } = useGlobal();

  const filterImg = toCssFilter(feature?.mapLayer?.featureImgFilter);
  const filterVideo = toCssFilter(feature?.mapLayer?.featureVideoFilter);
  const filterPositive = toCssFilter(
    feature?.mapLayer?.featureMaskFilterPositive,
  );
  const filterNegative = toCssFilter(
    feature?.mapLayer?.featureMaskFilterNegative,
  );

  const videoSrc = feature?.mapLayer?.featureVideoSrc;
  const imgSrc = feature?.mapLayer?.featureImgSrc;
  const point = feature?.point;

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
      {point && (
        <div
          className={cx("w-full absolute inset-0")}
          style={{
            transform: `${mapConfig.mapTransform}`,
          }}
        >
          <Point point={point} />
        </div>
      )}
    </div>
  );
}
