import cx from "classnames";
import type { Coordinates } from "./types";
import { aspect16_9, aspect5_4, mapWidthPercent } from "./constants";
import { Point } from "./point/Point";
import { AutoScale } from "./ui/AutoScale";
import { FeatureList } from "./FeatureList";
import { useGlobal } from "./hooks/useGlobal";

const coords: Coordinates[] = [
  [20.120687, -155.594712],
  [20.116891, -155.725791],
];

export function MapImage() {
  const { visibleFeature } = useGlobal();
  return (
    <div className="bg-black w-screen h-screen flex items-center">
      <div className={cx(aspect16_9, "w-full bg-[#8281ab] flex")}>
        <div className={cx(aspect5_4, mapWidthPercent, "relative")}>
          <img
            src="5-4.jpeg"
            className="border border-black/20"
            // className="w-[50%]"
            // className="w-[calc(28.5/42.666*100%)]"
          />
          {visibleFeature?.coordinates && (
            <Point coords={visibleFeature?.coordinates} />
          )}
          {/* This div is positioned in the blank space at the bottom left of the map */}
          <div className="w-1/3 h-1/3 border-2 absolute bottom-0 left-0">
            <FeatureList />
          </div>
        </div>
        <div className="flex-1 p-2 flex flex-col justify-center items-center">
          <AutoScale>
            {(scale) => {
              return (
                <>
                  <div className="w-full h-full flex flex-col justify-center p-8">
                    <div
                      style={{
                        fontSize: 36 * scale,
                      }}
                      className="mb-2 font-bold"
                    >
                      {visibleFeature?.titleEnglish}
                    </div>
                    <div
                      style={{
                        fontSize: 16 * scale,
                      }}
                    >
                      {visibleFeature?.descriptionEnglish}
                    </div>
                  </div>
                </>
              );
            }}
          </AutoScale>
        </div>
      </div>
    </div>
  );
}
