import cx from "classnames";
import { FeatureSelectDevelopment } from "./FeatureSelectDevelopment";
import { useGlobal } from "./useGlobal";
import { FeatureSlideInfo } from "./FeatureSlideInfo";
import { MapDrawer } from "./Drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SidebarLayout } from "./Sidebar";
import { FeatureSlideMap } from "./FeatureSlideMap";
import { FeatureSlideBackground } from "./FeatureSlideBackground";

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
  const { features, displaySettings, mapConfig, editedFeature } = useGlobal();

  const withEditedFeature = [
    ...features,
    ...(editedFeature != null ? [editedFeature] : []),
  ];
  return (
    <ThemeProvider theme={darkTheme}>
      <SidebarLayout>
        <div className="relative bg-black text-white w-full h-full flex items-center">
          <Aspect ratioX={16} ratioY={9}>
            <div className={cx("w-full h-full flex relative")}>
              {/* Background */}
              {withEditedFeature.map((item) => {
                return <FeatureSlideBackground feature={item} />;
              })}
              <div
                // map width is a percentage of the table width
                // this is important for the <Aspect/> to work correctly
                style={{
                  width: `${mapConfig.mapWidthPercent * 100}%`,
                  // transform: `${mapConfig.mapTransform}`,
                  height: "fit-content",
                }}
              >
                <Aspect
                  ratioX={mapConfig.mapAspectRatioX}
                  ratioY={mapConfig.mapAspectRatioY}
                >
                  {withEditedFeature.map((item) => {
                    return <FeatureSlideMap feature={item} />;
                  })}
                </Aspect>
              </div>
              <div className="flex-1 relative">
                {withEditedFeature.map((feature) => (
                  <FeatureSlideInfo feature={feature} />
                ))}
              </div>
            </div>
          </Aspect>

          {/* Positioned Top Left */}
          <div className="w-64 absolute top-0 left-0 mt-4 ml-2 bg-black/40 rounded-md">
            {displaySettings.showFeatureList && <FeatureSelectDevelopment />}
          </div>
          <MapDrawer />
        </div>
      </SidebarLayout>
    </ThemeProvider>
  );
}
