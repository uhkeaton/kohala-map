import cx from "classnames";
import { useGlobal } from "./useGlobal";
import { Feature } from "./types";
import { toCssFilterString } from "./filter";
import { Point } from "./Point";
import { FeatureBottomLeftInfo } from "./FeatureBottomLeftInfo";

export function FeatureSlideMap({
  feature,
  visible,
}: {
  feature: Feature;
  visible: boolean;
}) {
  const { worldConfig } = useGlobal();

  const filterImg = toCssFilterString(feature?.mapImgFilter);
  const filterVideo = toCssFilterString(feature?.mapVideoFilter);
  const filterPositive = toCssFilterString(feature?.mapMaskFilterPositive);
  const filterNegative = toCssFilterString(feature?.mapMaskFilterNegative);
  const filterTerrain = toCssFilterString(feature?.mapTerrainFilter);

  const videoSrc = feature?.mapVideoSrc;
  const imgSrc = feature?.mapImgSrc;

  return (
    <div
      className={cx("w-full absolute inset-0", {
        // only show the visible feature
        hidden: !visible,
      })}
    >
      {/*  */}

      {worldConfig?.mapRedMaskPositiveSrc && (
        <img
          className={cx("w-full absolute inset-0")}
          src={worldConfig?.mapRedMaskPositiveSrc}
          style={{
            transform: flipTransform(worldConfig.mapFlip),
            ...(filterPositive && { filter: filterPositive }),
          }}
        />
      )}
      {worldConfig?.mapTerrainImgSrc && (
        <img
          className={cx("w-full absolute inset-0")}
          src={worldConfig?.mapTerrainImgSrc}
          style={{
            transform: flipTransform(worldConfig.mapFlip),
            ...(filterTerrain && { filter: filterTerrain }),
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
            transform: flipTransform(worldConfig.mapFlip),
            ...(filterNegative && { filter: filterNegative }),
          }}
        />
      )}
      {imgSrc && (
        <img
          style={{
            transform: flipTransform(worldConfig.mapFlip),
            ...(filterImg && {
              filter: filterImg,
            }),
          }}
          className={cx("w-full absolute inset-0")}
          src={imgSrc}
        />
      )}
      {feature.mapDescriptionBottomLeft && (
        <FeatureBottomLeftInfo feature={feature} />
      )}
      <div
        className={cx("w-full absolute inset-0")}
        style={{
          transform: flipTransform(worldConfig.mapFlip),
        }}
      >
        <Point point={feature} />
      </div>
    </div>
  );
}

function flipTransform(flip: boolean) {
  if (flip) return "rotate(180deg)";
  return "";
}
