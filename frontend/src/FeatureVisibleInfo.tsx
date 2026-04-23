import { Feature } from "./types";
import cx from "classnames";
import { Aspect } from "./Aspect";
import { AutoFitText } from "./AutoFitText";
import { useGlobal } from "./useGlobal";
import { MediaItem, toMediaItems } from "./media";

export function FeatureVisibleInfo({
  feature,
  visible,
}: {
  feature: Feature;
  visible: boolean;
}) {
  const { slideCount } = useGlobal();
  const text = feature.infoDescription;

  const mediaItems = toMediaItems(feature);
  const idxToShow = slideCount % mediaItems.length;

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
          {mediaItems.map((item, i) => {
            return (
              <Media
                key={`${i}-${item.src}`}
                item={item}
                visible={i == idxToShow}
              />
            );
          })}
        </Aspect>
      </div>
    </div>
  );
}

function Media({
  item,
  visible,
}: {
  item: MediaItem;

  visible: boolean;
}) {
  if (item.type == "video") {
    return (
      <video
        className={cx(
          "absolute inset-0 w-full h-full object-cover rounded-lg",
          {
            "opacity-0": !visible,
            "transition-opacity duration-900": visible,
          },
        )}
        src={item.src}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }

  if (item.type == "img") {
    return (
      <img
        className={cx(
          "absolute inset-0 w-full h-full object-cover rounded-lg",
          {
            "opacity-0": !visible,
            "transition-opacity duration-900": visible,
          },
        )}
        src={item.src}
      />
    );
  }

  return null;
}
