import cx from "classnames";
import { Point } from "./Point";
import { FeatureList } from "./features/FeatureList";
import { useGlobal } from "./useGlobal";
import { FeatureDetail } from "./features/FeatureDetail";
import { MapDrawer } from "./drawer/Drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";

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
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

export function Map() {
  const { displaySettings, visibleFeature, mapConfig } = useGlobal();
  const [lastLoadedImgUrl, setLastLoadedImgUrl] = useState("");

  return (
    <ThemeProvider theme={darkTheme}>
      <div className=" relative bg-black text-white w-screen h-screen flex items-center">
        <Aspect ratioX={16} ratioY={9}>
          <div className={cx("w-full h-full flex bg-blue-500/30")}>
            <div
              // map width is a percentage of the table width
              // this is important for the <Aspect/> to work correctly
              style={{
                width: `${mapConfig.mapWidthPercent * 100}%`,
                transform: `${mapConfig.mapTransform}`,
                height: "fit-content",
              }}
            >
              <Aspect
                ratioX={mapConfig.mapAspectRatioX}
                ratioY={mapConfig.mapAspectRatioY}
              >
                <div className={cx("relative w-full h-full")}>
                  {mapConfig?.mapImgSrc && (
                    <img
                      className={cx("w-full", {
                        "opacity-100": displaySettings,
                        hidden: mapConfig?.mapImgSrc !== lastLoadedImgUrl,
                      })}
                      onLoad={() => {
                        setLastLoadedImgUrl(mapConfig?.mapImgSrc);
                      }}
                      src={mapConfig?.mapImgSrc}
                    />
                  )}
                  {visibleFeature?.imgLayer?.imgSrc && (
                    <img
                      style={{
                        ...(visibleFeature?.imgLayer?.filter && {
                          filter: visibleFeature?.imgLayer?.filter,
                        }),
                      }}
                      className={cx("w-full absolute inset-0")}
                      src={visibleFeature?.imgLayer?.imgSrc}
                    />
                  )}
                  {visibleFeature?.point && (
                    <Point coords={visibleFeature?.point?.coordinates} />
                  )}
                </div>
              </Aspect>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center overflow-hidden">
              <FeatureDetail />
            </div>
          </div>
        </Aspect>

        {/* Positioned Top Left */}
        <div className="w-64 absolute top-0 left-0 mt-4 ml-2 bg-black/40 rounded-md">
          {displaySettings.showFeatureList && <FeatureList />}
        </div>
        <MapDrawer />
      </div>
    </ThemeProvider>
  );
}
