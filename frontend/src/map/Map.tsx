import cx from "classnames";
import { aspect16_9, aspect5_4, mapWidthPercent } from "../constants";
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

export function Map() {
  const { visibleFeature, displaySettings } = useGlobal();
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="bg-black text-white w-screen h-screen flex items-center">
        <div
          className={cx(aspect16_9, "w-full flex", {
            " bg-white/20": displaySettings.showMapOutline,
          })}
        >
          <div className={cx(aspect5_4, mapWidthPercent, "relative")}>
            <img
              className={cx("grayscale-100", {
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
          <div className="flex-1 flex flex-col justify-center items-center">
            <FeatureDetail />
          </div>
        </div>
        <MapDrawer />
      </div>
    </ThemeProvider>
  );
}
