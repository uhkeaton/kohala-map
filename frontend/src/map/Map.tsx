import cx from "classnames";
import { mapRealWidthInches, tableRealWidthInches } from "../constants";
import { Point } from "../point/Point";
import { FeatureList } from "../features/FeatureList";
import { useGlobal } from "../global/useGlobal";
import { FeatureDetail } from "../features/FeatureDetail";
import { MapDrawer } from "../drawer/MapDrawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Aspect_5_4({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full before:block before:content-[''] before:pt-[calc(4/5*100%)]">
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

function Aspect_16_9({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full before:block before:content-[''] before:pt-[calc(9/16*100%)]">
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

export function Map() {
  const { visibleFeature, displaySettings } = useGlobal();
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="bg-black text-white w-screen h-screen flex items-center">
        <Aspect_16_9>
          <div
            className={cx("w-full h-full flex", {
              "bg-white/20": displaySettings.showMapOutline,
            })}
          >
            <div
              // map width is a percentage of the table width
              // this is important for the <Aspect_5_4/> inside to work correctly
              style={{
                width: `${(mapRealWidthInches / tableRealWidthInches) * 100}%`,
              }}
            >
              <Aspect_5_4>
                <div className={cx("relative w-full h-full")}>
                  <img
                    className={cx("w-full grayscale-100", {
                      "opacity-30": displaySettings.showMapOutline,
                      "opacity-0": !displaySettings.showMapOutline,
                    })}
                    src="5-4-transparent.png"
                  />

                  {visibleFeature?.coordinates && (
                    <Point coords={visibleFeature?.coordinates} />
                  )}
                  {/* This div is positioned in the blank space at the bottom left of the map */}
                  <div className="w-1/3 h-1/3 absolute bottom-0 left-0">
                    {displaySettings.showFeatureList && <FeatureList />}
                  </div>
                </div>
              </Aspect_5_4>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center overflow-hidden">
              <FeatureDetail />
            </div>
          </div>
        </Aspect_16_9>

        <MapDrawer />
      </div>
    </ThemeProvider>
  );
}
