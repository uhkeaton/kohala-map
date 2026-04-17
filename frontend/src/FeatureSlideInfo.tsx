import { Feature } from "./types";
import { AutoScale } from "./AutoScale";
import { useGlobal } from "./useGlobal";
import cx from "classnames";
import { ID_EDITED_FEATURE } from "./FeatureEditSidebar";

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
                    fontSize: 36 * scale,
                  }}
                  className="mb-2 font-bold"
                >
                  {feature && feature.title}
                </div>
                <div
                  style={{
                    fontSize: 16 * scale,
                  }}
                >
                  {feature && feature.description}
                </div>
              </div>
              <Media feature={feature} scale={scale} />
            </div>
          );
        }}
      </AutoScale>
    </div>
  );
}

function Media({ feature, scale }: { feature: Feature; scale: number }) {
  if (feature?.videoSrc) {
    return (
      <>
        {feature?.videoSrc && (
          <video
            className={cx("w-full rounded-lg")}
            src={feature?.videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </>
    );
  }
  if (feature?.imgSrc) {
    return (
      <>
        {feature?.imgSrc && (
          <img
            style={{
              marginTop: 16 * scale,
              marginBottom: 16 * scale,
            }}
            className="w-full rounded-lg"
            src={feature?.imgSrc}
          />
        )}
      </>
    );
  }
  return <></>;
}
