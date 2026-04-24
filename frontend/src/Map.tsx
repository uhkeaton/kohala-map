import cx from "classnames";
import { FeatureSelectDev } from "./FeatureSelectDev";
import { useGlobal } from "./useGlobal";
import { FeatureVisibleInfo } from "./FeatureVisibleInfo";
import { AppDrawer } from "./Drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SidebarLayout } from "./Sidebar";
import { FeatureVisibleMap } from "./FeatureVisibleMap";
import { FeatureVisibleBackground } from "./FeatureVisibleBackground";
import { Aspect } from "./Aspect";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function Map() {
  const {
    features,
    displaySettings,
    worldConfig,
    visibleFeatureId,
    editedFeature,
    isEditingRow,
  } = useGlobal();

  return (
    <ThemeProvider theme={darkTheme}>
      <SidebarLayout>
        <div className="relative bg-black text-white w-full h-full flex items-center">
          <Aspect ratioX={16} ratioY={9}>
            <div className={cx("w-full h-full flex relative")}>
              {/* Background */}
              {features.map((item, i) => {
                return (
                  <FeatureVisibleBackground
                    key={`${item.id}-${i}`}
                    feature={item}
                    visible={!isEditingRow && item.id == visibleFeatureId}
                  />
                );
              })}
              <FeatureVisibleBackground
                feature={editedFeature}
                visible={isEditingRow}
              />
              <div
                // map width is a percentage of the table width
                // this is important for the <Aspect/> to work correctly
                style={{
                  width: `${worldConfig.mapWidthPercent * 100}%`,
                  // transform: `${worldConfig.mapFlip}`,
                  height: "fit-content",
                }}
              >
                <Aspect
                  ratioX={worldConfig.mapAspectRatioX}
                  ratioY={worldConfig.mapAspectRatioY}
                >
                  {features.map((item) => {
                    return (
                      <FeatureVisibleMap
                        key={item.id}
                        feature={item}
                        visible={!isEditingRow && item.id == visibleFeatureId}
                      />
                    );
                  })}
                  <FeatureVisibleMap
                    feature={editedFeature}
                    visible={isEditingRow}
                  />
                </Aspect>
              </div>
              <div className="h-full flex-1 relative">
                {features.map((item, i) => (
                  <FeatureVisibleInfo
                    key={`${item.id}-${i}`}
                    feature={item}
                    visible={!isEditingRow && item.id == visibleFeatureId}
                  />
                ))}
                <FeatureVisibleInfo
                  key={`${editedFeature.id}-${isEditingRow}`}
                  feature={editedFeature}
                  visible={isEditingRow}
                />
              </div>
            </div>
          </Aspect>

          {/* Positioned Top Left */}
          <div className="w-64 absolute top-0 left-0 mt-4 ml-2 bg-black/40 rounded-md">
            {displaySettings.showFeatureList && <FeatureSelectDev />}
          </div>
          <AppDrawer />
        </div>
      </SidebarLayout>
    </ThemeProvider>
  );
}
