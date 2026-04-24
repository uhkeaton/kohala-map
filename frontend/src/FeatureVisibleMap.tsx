import cx from "classnames";
import { useGlobal } from "./useGlobal";
import { Feature } from "./types";
import { toCssFilterString } from "./filter";
import { Point } from "./Point";
import { FeatureBottomLeftInfo } from "./FeatureBottomLeftInfo";

export function FeatureVisibleMap({
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
        <div
          className={cx("w-full absolute inset-0")}
          style={{
            ...(filterNegative && {
              filter: filterNegative,
            }),
          }}
        >
          <img
            className={cx("w-full absolute inset-0")}
            src={worldConfig?.mapRedMaskNegativeSrc}
            style={{
              transform: flipTransform(worldConfig.mapFlip),
              // this small drop shadow covers up the small (<1px)
              // gap that can occur with the video showing through
              filter: "drop-shadow(-1px -1px 0 red)",
            }}
          />
        </div>
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
  if (flip) return "translate3d(0,0,0) rotate(180deg)";
  // in Safari, force GPU compositing.
  // This is done to match the color of the negative mask filter, which
  // also uses GPU compositing in Safari when placed over a video
  // and there doesn't seem to be a way to disable that
  return "translate3d(0,0,0)";
}
