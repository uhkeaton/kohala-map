import { Divider, Drawer } from "@mui/material";
import { DrawerDisplaySettings } from "./DrawerDisplaySettings";
import { RoomSettings } from "./room/RoomSettings";
import { DrawerDataSourceSelect } from "./DrawerDataSourceSelect";
import { IconMenu } from "./icons";
import { ButtonCreateFeature } from "./FeatureEditSidebar";
import { useGlobal } from "./useGlobal";

export function MapDrawer() {
  const { displaySettings, setDisplaySettings } = useGlobal();

  return (
    <>
      <div className="absolute top-0 right-0">
        <div
          onClick={() =>
            setDisplaySettings((s) => ({ ...s, showMainDrawer: true }))
          }
          className="cursor-pointer bg-black/20 m-2 p-1 rounded-lg opacity-50 hover:opacity-100"
        >
          <IconMenu className="w-8" />
        </div>
      </div>
      <Drawer
        anchor={"right"}
        open={displaySettings.showMainDrawer}
        onClose={() =>
          setDisplaySettings((s) => ({ ...s, showMainDrawer: false }))
        }
      >
        <div className="m-4 mt-8">
          <div className="text-xl mb-4">Create</div>
          <ButtonCreateFeature />
          <Divider sx={{ my: 4 }} />
          <div className="text-xl mb-4">Data Source</div>
          <DrawerDataSourceSelect />
          <Divider sx={{ my: 4 }} />
          <div className="text-xl mb-4">Display</div>
          <DrawerDisplaySettings />
          <Divider sx={{ my: 4 }} />
          <div className="text-xl mb-4">Room</div>
          <RoomSettings />
        </div>
      </Drawer>
    </>
  );
}
