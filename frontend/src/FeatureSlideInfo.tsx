import { Feature } from "./types";
import { AutoScale } from "./AutoScale";
import { useGlobal } from "./useGlobal";
import cx from "classnames";
import { ID_EDITED_FEATURE } from "./feature";
import { Aspect } from "./Aspect";

export function FeatureSlideInfo({ feature }: { feature: Feature }) {
  const { visibleFeatureId, isEditingRow } = useGlobal();

  const visible = (function () {
    if (isEditingRow) return feature.id === ID_EDITED_FEATURE;
    return visibleFeatureId == feature.id;
  })();

  return (
    <div className="w-full absolute inset-0 flex flex-col justify-center items-center overflow-hidden">
      <AutoScale>
        {(scale) => {
          return (
            <div
              style={{
                padding: 16 * scale,
                gap: 16 * scale,
              }}
              className={cx("w-full h-full flex flex-col justify-center", {
                "opacity-0": !visible,
                "transition-opacity duration-900": visible,
              })}
            >
              <div>
                <div
                  style={{
                    fontSize: 32 * scale,
                  }}
                  className="mb-2 font-bold"
                >
                  {feature && feature.infoTitle}
                </div>
                <div
                  style={{
                    fontSize: 16 * scale,
                  }}
                >
                  {feature && feature.infoDescription}
                </div>
              </div>
              <Aspect ratioX={5} ratioY={4}>
                <Media feature={feature} scale={scale} />
              </Aspect>
            </div>
          );
        }}
      </AutoScale>
    </div>
  );
}

function Media({ feature, scale }: { feature: Feature; scale: number }) {
  if (feature?.mediaVideoSrc) {
    return (
      <video
        className="w-full h-full object-cover rounded-lg"
        src={feature.mediaVideoSrc}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }

  if (feature?.mediaImgSrc) {
    return (
      <img
        className="w-full h-full object-cover rounded-lg"
        src={feature.mediaImgSrc}
      />
    );
  }

  return null;
  if (feature?.mediaVideoSrc) {
    return (
      <>
        {feature?.mediaVideoSrc && (
          <video
            className={cx("w-full rounded-lg")}
            src={feature?.mediaVideoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </>
    );
  }
  if (feature?.mediaImgSrc) {
    return (
      <>
        {feature?.mediaImgSrc && (
          <img
            style={{
              marginTop: 16 * scale,
              marginBottom: 16 * scale,
            }}
            className="w-full rounded-lg"
            src={feature?.mediaImgSrc}
          />
        )}
      </>
    );
  }
  return <></>;
}
