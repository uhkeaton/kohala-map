import { Divider, Drawer } from "@mui/material";
import { DrawerDisplaySettings } from "./DisplaySettings";
import { RoomSettings } from "./room/RoomSettings";
import { DataSourceSelect } from "./data/DataSourceSelect";
import { IconMenu } from "./icons";
import { useGlobal } from "./useGlobal";
import { FeatureCreateButton } from "./FeatureCreateButton";
import { DataSourceCreateDialog } from "./data/DataSourceCreateDialog";

export function AppDrawer() {
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
          <div className="text-xl mb-4">Data Sources</div>
          <DataSourceSelect />
          <DataSourceCreateDialog />
          <Divider sx={{ my: 4 }} />
          <div className="text-xl mb-4">Edit Data</div>
          <FeatureCreateButton />
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
