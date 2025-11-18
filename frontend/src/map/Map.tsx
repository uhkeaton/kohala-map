import cx from "classnames";
import { Point } from "../point/Point";
import { FeatureList } from "../features/FeatureList";
import { useGlobal } from "../global/useGlobal";
import { FeatureDetail } from "../features/FeatureDetail";
import { MapDrawer } from "../drawer/MapDrawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSpreadsheet } from "../spreadsheet/spreadsheet";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Aspect({
  children,
  ratioX,
  ratioY,
}: {
  children: React.ReactNode;
  ratioX: number;
  ratioY: number;
}) {
  return (
    <div
      className="relative w-full before:block before:content-[''] before:pt-[var(--aspect-pt)]"
      style={
        { "--aspect-pt": `${(ratioY / ratioX) * 100}%` } as React.CSSProperties
      }
      // className={`relative w-full before:block before:content-[''] before:pt-[calc(5/4*100%)]`}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

export function Map() {
  const { displaySettings } = useGlobal();
  const { visibleFeature, mapConfig } = useSpreadsheet();
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="bg-black text-white w-screen h-screen flex items-center">
        <Aspect ratioX={16} ratioY={9}>
          <div
            className={cx("w-full h-full flex", {
              "bg-white/20": displaySettings.showMapOutline,
            })}
            style={{
              ...(displaySettings.showMapAlignmentMask && {
                background: "blue",
              }),
            }}
          >
            <div
              // map width is a percentage of the table width
              // this is important for the <Aspect_5_4/> inside to work correctly
              style={{
                width: `${mapConfig.mapWidthPercent * 100}%`,
              }}
            >
              <Aspect
                ratioX={mapConfig.mapAspectRatioX}
                ratioY={mapConfig.mapAspectRatioY}
              >
                <div className={cx("relative w-full h-full")}>
                  <img
                    className={cx("w-full", {
                      "opacity-100": displaySettings.showMapOutline,
                      "opacity-0": !displaySettings.showMapOutline,
                    })}
                    // className={cx("w-full grayscale-100", {
                    //   "opacity-30": displaySettings.showMapOutline,
                    //   "opacity-0": !displaySettings.showMapOutline,
                    // })}
                    src="5-4-transparent.png"
                    style={{
                      ...(displaySettings.showMapAlignmentMask && {
                        opacity: 1,
                        filter:
                          "grayscale(100%) sepia(100%) saturate(1000%) hue-rotate(50deg) contrast(2)",
                      }),
                    }}
                  />

                  {visibleFeature?.layers &&
                    visibleFeature?.layers.map((item) => {
                      const { filter, imgSrc } = item;
                      return (
                        <img
                          style={{
                            ...(filter && { filter: filter }),
                          }}
                          className={cx("w-full absolute inset-0")}
                          src={imgSrc}
                        />
                      );
                    })}
                  {visibleFeature?.points &&
                    visibleFeature?.points.map((item) => {
                      return <Point coords={item?.coordinates} />;
                    })}
                  {/* This div is positioned in the blank space at the bottom left of the map */}
                  <div className="w-1/3 h-1/3 absolute bottom-0 left-0">
                    {displaySettings.showFeatureList && <FeatureList />}
                  </div>
                </div>
              </Aspect>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center overflow-hidden">
              <FeatureDetail />
            </div>
          </div>
        </Aspect>

        <MapDrawer />
      </div>
    </ThemeProvider>
  );
}
