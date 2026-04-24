import { toDescriptions, toMediaItems } from "./media";
import { Feature } from "./types";
import { useGlobal } from "./useGlobal";
import cx from "classnames";

export function SlideCountdown({ feature }: { feature: Feature }) {
  const { slideCount, visibleFeatureId } = useGlobal();

  const mediaItems = toMediaItems(feature);
  const descriptions = toDescriptions(feature);
  const maxLen = Math.max(mediaItems.length, descriptions.length);

  const currPage = (slideCount % maxLen) + 1;

  const hasSlides = maxLen > 1;

  return (
    <div className="w-full flex gap-2 items-center">
      {hasSlides && (
        <div className="opacity-70 tracking-widest text-sm">{`(${currPage}/${maxLen})`}</div>
      )}
      <div
        key={`${slideCount}-${visibleFeatureId}`}
        className={cx(
          "flex-1 relative h-2 my-3 bg-neutral-300/20 overflow-hidden rounded",
          {
            "opacity-0": !hasSlides,
          },
        )}
      >
        <div
          className="absolute inset-0 origin-left bg-neutral-200/40"
          style={{
            animation: "shrink 20s linear forwards",
          }}
        />
      </div>
    </div>
  );
}
