import { Feature } from "./types";
import cx from "classnames";
import { Aspect } from "./Aspect";
import { AutoFitText } from "./AutoFitText";
import { useGlobal } from "./useGlobal";
import { toDescriptions, toMediaItems } from "./media";
import { SlideCountdown } from "./SlideCountdown";
import { slideFadeInClasses, slideFadeOutClasses } from "./fade";
import { MediaCard } from "./MediaCard";

export function FeatureVisibleInfo({ feature }: { feature: Feature }) {
  const { slideCount, visibleFeatureState } = useGlobal();

  const mediaItems = toMediaItems(feature);
  const mediaIdxToShow = slideCount % mediaItems.length;
  const descriptions = toDescriptions(feature);
  const descriptionIdxToShow = slideCount % descriptions.length;

  // for the purposes of fading
  const isRecent = visibleFeatureState.recentlyVisibleIds[feature.id];

  return (
    <div
      className={cx(
        "w-full h-full absolute inset-0 flex flex-col justify-center items-center overflow-hidden",
      )}
    >
      <div
        className={cx(
          "overflow-hidden w-full min-h-[20%] flex flex-col justify-end items-center",
          "opacity-0 fade-in-delay",
        )}
      >
        <div className="lexend-600 mb-2 font-bold text-center  md:text-3xl sm:text-2xl xs:text-xl xs:line-clamp-2 line-clamp-1">
          {feature && feature.infoTitle}
        </div>
      </div>

      <div
        className={cx(
          "relative flex-1 p-2 w-full box-border",
          "opacity-0 fade-in-delay",
        )}
      >
        {descriptions.map((d, i) => {
          const vis = i == descriptionIdxToShow;
          return (
            <div
              className={cx(
                "p-2 absolute inset-0 w-full h-full object-cover rounded-lg",
                {
                  "opacity-0": !vis,
                  [slideFadeOutClasses]: !vis,
                  [slideFadeInClasses]: vis,
                },
              )}
            >
              {isRecent && <AutoFitText text={d} />}
            </div>
          );
        })}
      </div>
      <div className={cx("flex-0 w-full p-4")}>
        <div>
          <Aspect ratioX={5} ratioY={4}>
            {mediaItems.map((item, i) => {
              return (
                <MediaCard
                  key={`${i}-${item.src}`}
                  item={item}
                  visible={i == mediaIdxToShow}
                />
              );
            })}
          </Aspect>
        </div>
        <SlideCountdown feature={feature} />
      </div>
    </div>
  );
}
