import cx from "classnames";
import { FeatureSelectDev } from "./FeatureSelectDev";
import { useGlobal } from "./useGlobal";
import { FeatureVisibleInfo } from "./FeatureVisibleInfo";
import { DrawerApp } from "./DrawerApp";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SidebarLayout } from "./Sidebar";
import { FeatureVisibleMap } from "./FeatureVisibleMap";
import { FeatureVisibleBackground } from "./FeatureVisibleBackground";
import { Aspect } from "./Aspect";
import { Feature, MapMode } from "./types";
import { findZIndex } from "./fade";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function PageMap({ mode }: { mode: MapMode }) {
  const { features, visibleFeatureState, isEditingRow, editedFeature } =
    useGlobal();

  return (
    <ThemeProvider theme={darkTheme}>
      <SidebarLayout>
        <div className="relative bg-black text-white w-full h-full flex items-center">
          <Aspect ratioX={16} ratioY={9}>
            <div className={cx("w-full h-full relative")}>
              {isEditingRow ? (
                <>
                  <FeatureItem feature={editedFeature} />
                </>
              ) : (
                features.map((feature) => {
                  const z = findZIndex(feature.id, visibleFeatureState.queue);

                  return (
                    <div
                      key={visibleFeatureState.animationKeys[feature.id]}
                      id={feature.id}
                      style={{
                        zIndex: z,
                      }}
                      className={cx("fade-in absolute inset-0")}
                    >
                      <FeatureItem feature={feature} key={feature.id} />
                    </div>
                  );
                })
              )}
            </div>
          </Aspect>

          {/* Positioned Top Left */}
          <div className="w-64 absolute top-0 left-0 mt-4 ml-2 bg-black/40 rounded-md">
            {mode === "editor" && <FeatureSelectDev />}
          </div>
          <DrawerApp mode={mode} />
        </div>
      </SidebarLayout>
    </ThemeProvider>
  );
}

function FeatureItem({ feature }: { feature: Feature }) {
  const { worldConfig } = useGlobal();
  return (
    <div className="relative w-full h-full flex">
      {/* Background */}
      {/* {(isRecent || isEditingRow) && ( */}
      <FeatureVisibleBackground
        key={`background-${feature.id}`}
        feature={feature}
      />
      {/* )} */}

      <div
        // map width is a percentage of the table width
        // this is important for the <Aspect/> to work correctly
        style={{
          width: `${worldConfig.mapWidthPercent * 100}%`,
          height: "fit-content",
        }}
      >
        <Aspect
          ratioX={worldConfig.mapAspectRatioX}
          ratioY={worldConfig.mapAspectRatioY}
        >
          <FeatureVisibleMap key={feature.id} feature={feature} />
        </Aspect>
      </div>
      <div className="h-full flex-1 relative">
        <FeatureVisibleInfo key={`${feature.id}`} feature={feature} />
      </div>
    </div>
  );
}
