import { Feature } from "./types";
import cx from "classnames";
import { Aspect } from "./Aspect";
import { AutoFitText } from "./AutoFitText";
import { useGlobal } from "./useGlobal";
import { MediaItem, toDescriptions, toMediaItems } from "./media";
import { SlideCountdown } from "./SlideCountdown";

const fadeOutClasses = "transition-opacity duration-1000";
const fadeInClasses = "transition-opacity delay-500 duration-2500";

export function FeatureVisibleInfo({
  feature,
  visible,
}: {
  feature: Feature;
  visible: boolean;
}) {
  const { slideCount } = useGlobal();

  const mediaItems = toMediaItems(feature);
  const mediaIdxToShow = slideCount % mediaItems.length;
  const descriptions = toDescriptions(feature);
  const descriptionIdxToShow = slideCount % descriptions.length;

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
        <div className="lexend-600 mb-2 font-bold text-center  md:text-3xl sm:text-2xl xs:text-xl xs:line-clamp-2 line-clamp-1">
          {feature && feature.infoTitle}
        </div>
      </div>

      <div className="relative flex-1 p-2 w-full box-border">
        {descriptions.map((d, i) => {
          const vis = i == descriptionIdxToShow;
          return (
            <div
              className={cx(
                "p-2 absolute inset-0 w-full h-full object-cover rounded-lg",
                {
                  "opacity-0": !vis,
                  [fadeOutClasses]: !vis,
                  [fadeInClasses]: vis,
                },
              )}
            >
              {visible && <AutoFitText text={d} />}
            </div>
          );
        })}
      </div>
      <div className="flex-0 w-full p-4">
        <Aspect ratioX={5} ratioY={4}>
          {mediaItems.map((item, i) => {
            return (
              <Media
                key={`${i}-${item.src}`}
                item={item}
                visible={i == mediaIdxToShow}
              />
            );
          })}
        </Aspect>
        <SlideCountdown feature={feature} />
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
            [fadeOutClasses]: !visible,
            [fadeInClasses]: visible,
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
            [fadeOutClasses]: !visible,
            [fadeInClasses]: visible,
          },
        )}
        src={item.src}
      />
    );
  }

  return null;
}
