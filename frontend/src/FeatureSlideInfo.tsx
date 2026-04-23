import { Feature } from "./types";
import { AutoScale } from "./AutoScale";
import cx from "classnames";
import { Aspect } from "./Aspect";

export function FeatureSlideInfo({
  feature,
  visible,
}: {
  feature: Feature;
  visible: boolean;
}) {
  return (
    <div
      className={cx(
        "w-full h-full absolute inset-0 flex flex-col justify-center items-center overflow-hidden",
        {
          "opacity-0": !visible,
          "transition-opacity duration-900": visible,
        },
      )}
    >
      <div className="flex-1 overflow-hidden">
        <AutoScale>
          {(scale) => {
            return (
              <div
                style={{
                  padding: 16 * scale,
                  gap: 16 * scale,
                }}
                className={"w-full h-full flex flex-col justify-center"}
              >
                <div>
                  <div
                    style={{
                      fontSize: 32 * scale,
                    }}
                    className="lexend-600 mb-2 font-bold"
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
              </div>
            );
          }}
        </AutoScale>
      </div>
      <div className="flex-0 w-full p-4">
        <Aspect ratioX={5} ratioY={4}>
          <Media feature={feature} />
        </Aspect>
      </div>
    </div>
  );
}

function Media({ feature }: { feature: Feature }) {
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
}
