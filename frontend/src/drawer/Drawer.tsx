import { Divider, Drawer } from "@mui/material";
import { useState } from "react";
import { DisplaySettings } from "./DisplaySettings";
import { RoomSettings } from "../room/RoomSettings";
import { DataSourceSelect } from "../spreadsheet/DataSettings";
import { IconMenu } from "../icons";

export function MapDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="absolute top-0 right-0">
        <div
          onClick={() => setOpen(true)}
          className="cursor-pointer bg-black/20 m-2 p-1 rounded-lg opacity-50 hover:opacity-100"
        >
          <IconMenu className="w-8" />
        </div>
      </div>
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        <div className="m-4 mt-8">
          <div className="text-xl mb-4">Data</div>
          <DataSourceSelect />
          <Divider sx={{ my: 4 }} />
          <div className="text-xl mb-4">Display</div>
          <DisplaySettings />
          <Divider sx={{ my: 4 }} />
          <div className="text-xl mb-4">Room</div>
          <RoomSettings />
        </div>
      </Drawer>
    </>
  );
}
