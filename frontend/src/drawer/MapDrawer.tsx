import { Divider, Drawer } from "@mui/material";
import { useState } from "react";
import { IconMenu } from "../icons/menu";
import { DisplaySettings } from "./DisplaySettings";
import { LanguageSelect } from "./LanguageSelect";
import { RoomSettings } from "../room/RoomSettings";
import { DataSettings } from "../spreadsheet/DataSettings";
import { EditMode } from "./EditMode";
import { EditMapConfig } from "./EditMapConfig";

interface MapDrawerProps {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

export function MapDrawer({ editMode, setEditMode } : MapDrawerProps) {
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
          <DataSettings />
          <Divider sx={{ my: 4 }} />
          <div className="text-xl mb-4">Display</div>
          <DisplaySettings />
          <Divider sx={{ my: 4 }} />
          <div className="text-xl mb-4">Language</div>
          <LanguageSelect />
          <Divider sx={{ my: 4 }} />
          <div className="text-xl mb-4">Room</div>
          <RoomSettings />
          {/* Adding edit mode to display*/}
          <div className="text-xl mb-4">Edit Mode</div>
          <EditMode editMode={editMode} setEditMode={setEditMode} />
          <Divider sx={{ my: 4 }} />
          {/* margin */}
          <div className="text-xl mb-4">Something Edit</div>
          <EditMapConfig />
          <div className="my-12"/>

        </div>
      </Drawer>
    </>
  );
}
