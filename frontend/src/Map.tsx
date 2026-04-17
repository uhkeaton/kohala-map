import cx from "classnames";
import { Point } from "./Point";
import { FeatureList } from "./features/FeatureList";
import { useGlobal } from "./useGlobal";
import { FeatureDetail } from "./features/FeatureDetail";
import { MapDrawer } from "./drawer/Drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Feature } from "./types";

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
  const { features, displaySettings, mapConfig } = useGlobal();
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="relative bg-black text-white w-screen h-screen flex items-center">
        <Aspect ratioX={16} ratioY={9}>
          <div className={cx("w-full h-full flex relative")}>
            {/* Background */}
            {features?.map((item) => {
              return <BackgroundLayer feature={item} />;
            })}
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
                {features?.map((item) => {
                  return <FeatureLayer feature={item} />;
                })}
              </Aspect>
            </div>
            <div className="flex-1 relative">
              {features?.map((feature) => (
                <FeatureDetail feature={feature} />
              ))}
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

function BackgroundLayer({ feature }: { feature: Feature }) {
  const { visibleFeatureId } = useGlobal();
  const filterNegative = feature?.imgLayer?.featureMaskFilterNegative;
  return (
    <div
      className={cx("w-full absolute inset-0", {
        hidden: visibleFeatureId !== feature.id,
      })}
      style={{
        // the negative mask image should also be solid red, so they change together
        background: "red",
        ...(filterNegative && { filter: filterNegative }),
      }}
    />
  );
}

function FeatureLayer({ feature }: { feature: Feature }) {
  const { mapConfig, visibleFeatureId } = useGlobal();

  const filterImg = feature?.imgLayer?.featureImgFilter;
  const filterVideo = feature?.imgLayer?.featureVideoFilter;
  const filterPositive = feature?.imgLayer?.featureMaskFilterPositive;
  const filterNegative = feature?.imgLayer?.featureMaskFilterNegative;

  const videoSrc = feature?.imgLayer?.featureVideoSrc;
  const imgSrc = feature?.imgLayer?.featureImgSrc;
  const point = feature?.point;

  return (
    <div
      className={cx("relative w-full h-full", {
        // only show the visible feature
        hidden: visibleFeatureId !== feature.id,
      })}
    >
      {mapConfig?.mapImgSrc && (
        <img
          className={cx("w-full absolute inset-0")}
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
      {videoSrc && (
        <video
          className={cx("absolute inset-0 w-full h-full object-cover")}
          src={videoSrc}
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
      {imgSrc && (
        <img
          style={{
            ...(filterImg && {
              filter: filterImg,
            }),
          }}
          className={cx("w-full absolute inset-0")}
          src={imgSrc}
        />
      )}
      {point && <Point point={point} />}
    </div>
  );
}
