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

  const filterImg = visibleFeature?.imgLayer?.featureImgFilter;
  const filterVideo = visibleFeature?.imgLayer?.featureVideoFilter;
  const filterPositive = visibleFeature?.imgLayer?.featureMaskFilterPositive;
  const filterNegative = visibleFeature?.imgLayer?.featureMaskFilterNegative;

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="relative bg-black text-white w-screen h-screen flex items-center">
        <Aspect ratioX={16} ratioY={9}>
          <div className={cx("w-full h-full flex relative")}>
            {/* Background */}
            <div
              className="w-full absolute inset-0"
              style={{
                // the negative mask image should also be solid red, so they change together
                background: "red",
                ...(filterNegative && { filter: filterNegative }),
              }}
            />
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
                      className={cx("w-full absolute inset-0", {
                        hidden: mapConfig?.mapImgSrc !== lastLoadedImgUrl,
                      })}
                      onLoad={() => {
                        setLastLoadedImgUrl(mapConfig?.mapImgSrc);
                      }}
                      src={mapConfig?.mapImgSrc}
                    />
                  )}

                  {mapConfig?.mapRedMaskPositiveSrc && (
                    <img
                      className={cx("w-full absolute inset-0")}
                      src={mapConfig?.mapRedMaskPositiveSrc}
                      style={{
                        ...(filterPositive && { filter: filterPositive }),
                      }}
                    />
                  )}
                  {/* https://videos.pexels.com/video-files/34971834/14814314_1440_2560_30fps.mp4 */}

                  {visibleFeature?.imgLayer?.featureVideoSrc && (
                    <video
                      className={cx(
                        "absolute inset-0 w-full h-full object-cover",
                      )}
                      src={visibleFeature?.imgLayer?.featureVideoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        ...(filterVideo && { filter: filterVideo }),
                      }}
                    />
                  )}
                  {mapConfig?.mapRedMaskNegativeSrc && (
                    <img
                      className={cx("w-full absolute inset-0")}
                      src={mapConfig?.mapRedMaskNegativeSrc}
                      style={{
                        ...(filterNegative && { filter: filterNegative }),
                      }}
                    />
                  )}
                  {visibleFeature?.imgLayer?.featureImgSrc && (
                    <img
                      style={{
                        ...(filterImg && {
                          filter: filterImg,
                        }),
                      }}
                      className={cx("w-full absolute inset-0")}
                      src={visibleFeature?.imgLayer?.featureImgSrc}
                    />
                  )}
                  {visibleFeature?.point && (
                    <Point point={visibleFeature?.point} />
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
