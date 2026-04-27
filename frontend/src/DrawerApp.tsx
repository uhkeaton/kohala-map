import { Divider, Drawer } from "@mui/material";
import { RoomSettings } from "./room/RoomSettings";
import { DataSourceSelect } from "./data/DataSourceSelect";
import { IconMenu } from "./icons";
import { useGlobal } from "./useGlobal";
import { FeatureCreateButton } from "./FeatureCreateButton";
import { DataSourceCreateDialog } from "./data/DataSourceCreateDialog";
import { useRoomCode } from "./room/room";
import { ButtonHome } from "./ButtonHome";
import { DrawerMode } from "./types";
import { RoomShare } from "./room/RoomShare";
import { MessageController } from "./PageWelcome";

export function DrawerApp({ mode }: { mode: DrawerMode }) {
  const { displaySettings, setDisplaySettings } = useGlobal();
  const { roomCode } = useRoomCode();

  return (
    <>
      <div className="absolute top-0 right-0">
        <div
          onClick={() =>
            setDisplaySettings((s) => ({ ...s, showMainDrawer: true }))
          }
          className="cursor-pointer m-2 p-1 rounded-lg opacity-40 hover:opacity-100"
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
          <ButtonHome />
          <Divider sx={{ my: 4 }} />
          {mode === "editor" && (
            <>
              <div className="text-xl mb-4">Edit Data</div>
              <FeatureCreateButton />
              <Divider sx={{ my: 4 }} />
              <div className="text-xl mb-4">Data Sources</div>
              <DataSourceSelect />
              <DataSourceCreateDialog />
              <Divider sx={{ my: 4 }} />
            </>
          )}
          <div className="text-xl mb-4">
            {roomCode && (
              <div className="flex justify-between">
                <span>Room Code</span>
                <span className="font-semibold text-lime-500">{roomCode}</span>
              </div>
            )}
            {!roomCode && <span>Room</span>}
          </div>
          <RoomSettings />
          {mode != "controller" && (
            <>
              <div className="max-w-52 p-2">
                <MessageController />
              </div>
              <RoomShare />
            </>
          )}
        </div>
      </Drawer>
    </>
  );
}
