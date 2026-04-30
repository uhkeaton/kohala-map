import cx from "classnames";
import { useGlobal } from "./useGlobal";
import { Feature } from "./types";
import { toCssFilterString } from "./filter";
import { Point } from "./Point";
import { FeatureBottomLeftInfo } from "./FeatureBottomLeftInfo";
import { useRef, useState } from "react";

export function FeatureVisibleMap({ feature }: { feature: Feature }) {
  const { worldConfig, visibleFeatureState } = useGlobal();
  const filterPositive = toCssFilterString(feature?.mapMaskFilterPositive);
  const filterNegative = toCssFilterString(feature?.mapMaskFilterNegative);
  const filterTerrain = toCssFilterString(feature?.mapTerrainFilter);

  const imgSrc = feature?.mapImgSrc;
  const isRecent = visibleFeatureState.recentlyVisibleIds[feature.id];

  return (
    <div className={cx("w-full absolute inset-0")}>
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
      {isRecent && worldConfig?.mapTerrainImgSrc && (
        <img
          className={cx("w-full absolute inset-0")}
          src={worldConfig?.mapTerrainImgSrc}
          style={{
            transform: flipTransform(worldConfig.mapFlip),
            ...(filterTerrain && { filter: filterTerrain }),
          }}
        />
      )}
      {isRecent && <MapVideo feature={feature} />}
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
      {isRecent && imgSrc && <MapImage feature={feature} />}
      {isRecent && feature.mapDescriptionBottomLeft && (
        <FeatureBottomLeftInfo feature={feature} />
      )}
      {isRecent && (
        <div
          className={cx("w-full absolute inset-0")}
          style={{
            transform: flipTransform(worldConfig.mapFlip),
          }}
        >
          <Point point={feature} />
        </div>
      )}
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

function MapVideo({ feature }: { feature: Feature }) {
  /* Video does not receive map transform.*/
  const filterVideo = toCssFilterString(feature?.mapVideoFilter);
  const videoSrc = feature?.mapVideoSrc;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {videoSrc && (
        <video
          ref={videoRef}
          className={cx(
            "opacity-0 absolute inset-0 w-full h-full object-cover",
            {
              "fade-in-slow": loaded,
            },
          )}
          src={videoSrc}
          loop
          muted
          playsInline
          onCanPlay={() => {
            videoRef.current?.play();
            setLoaded(true);
          }}
          style={{
            ...(filterVideo && { filter: filterVideo }),
            // opacity: isVisible ? 1 : 0,
            // transition: "opacity 10s ease",
          }}
        />
      )}
    </>
  );
}

function MapImage({ feature }: { feature: Feature }) {
  const [loaded, setLoaded] = useState(false);
  const { worldConfig } = useGlobal();

  const filterImg = toCssFilterString(feature?.mapImgFilter);
  const imgSrc = feature?.mapImgSrc;

  return (
    <>
      {imgSrc && (
        <img
          onLoad={() => setLoaded(true)}
          style={{
            transform: flipTransform(worldConfig.mapFlip),
            ...(filterImg && {
              filter: filterImg,
            }),
          }}
          className={cx("opacity-0 w-full absolute inset-0", {
            "fade-in": loaded,
          })}
          src={imgSrc}
        />
      )}
    </>
  );
}
