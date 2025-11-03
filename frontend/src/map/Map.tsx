import cx from "classnames";
import { aspect16_9, aspect5_4, mapWidthPercent } from "../constants";
import { Point } from "../point/Point";
import { FeatureList } from "../features/FeatureList";
import { useGlobal } from "../hooks/useGlobal";
import { FeatureDetail } from "../features/FeatureDetail";

export function Map() {
  const { visibleFeature } = useGlobal();
  return (
    <div className="bg-black text-white w-screen h-screen flex items-center">
      <div className={cx(aspect16_9, "w-full flex bg-white/20")}>
        <div className={cx(aspect5_4, mapWidthPercent, "relative")}>
          <img src="5-4-transparent.png" className="opacity-30 grayscale-100" />
          {visibleFeature?.coordinates && (
            <Point coords={visibleFeature?.coordinates} />
          )}
          {/* This div is positioned in the blank space at the bottom left of the map */}
          <div className="w-1/3 h-1/3 absolute bottom-0 left-0">
            <FeatureList />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <FeatureDetail />
        </div>
      </div>
    </div>
  );
}
