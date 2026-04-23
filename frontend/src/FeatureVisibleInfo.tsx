import { Feature } from "./types";
import cx from "classnames";
import { Aspect } from "./Aspect";
import { AutoFitText } from "./AutoFitText";

export function FeatureVisibleInfo({
  feature,
  visible,
}: {
  feature: Feature;
  visible: boolean;
}) {
  const text = feature.infoDescription;

  if (feature.infoTitle == "Pololu Valley") {
    console.log();
  }

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
      <div className="overflow-hidden w-full min-h-[20%] flex flex-col justify-end items-center">
        <div
          style={{
            fontSize: 36,
          }}
          className="lexend-600 mb-2 font-bold text-center"
        >
          {feature && feature.infoTitle}
        </div>
      </div>
      <div className="flex-1 p-2 w-full box-border overflow-hidden">
        <AutoFitText>{text}</AutoFitText>
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
