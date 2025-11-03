import cx from "classnames";
import type { Coordinates } from "./types";
import { aspect16_9, aspect5_4, mapWidthPercent } from "./constants";
import { Point } from "./point/Point";
import { AutoScale } from "./ui/AutoScale";

const coords: Coordinates[] = [
  [20.120687, -155.594712],
  [20.116891, -155.725791],
];

export function MapImage() {
  const Points = coords.map((coords) => {
    return <Point coords={coords} />;
  });
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
          {Points}
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
                      Hello World
                    </div>
                    <div
                      style={{
                        fontSize: 16 * scale,
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus laoreet at magna eget tempor. In hac habitasse
                      platea dictumst. Duis mollis neque ut turpis aliquet
                      malesuada. Phasellus imperdiet ligula turpis, id lobortis
                      enim elementum. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Phasellus laoreet at magna eget tempor.
                      In hac habitasse platea dictumst. Duis mollis neque ut
                      turpis aliquet malesuada. Phasellus imperdiet ligula
                      turpis, id lobortis enim elementum.
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
