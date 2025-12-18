import Dialog from "@mui/material/Dialog";
import { Button, Divider, TextField } from "@mui/material";
import { useGlobal } from "../global/useGlobal";
import { useState } from "react";
import { useRoomCode } from "./room";

export function ManualJoinRoom() {
  const { displaySettings, setDisplaySettings } = useGlobal();
  const [code, setCode] = useState("");

  const { joinRoomMutation } = useRoomCode();
  const { mutate } = joinRoomMutation;

  const handleClose = () => {
    setDisplaySettings((s) => ({ ...s, showDialogManualJoinRoom: false }));
  };

  const handleOpen = () => {
    setDisplaySettings((s) => ({ ...s, showDialogManualJoinRoom: true }));
  };

  return (
    <>
      <Button className="w-full" onClick={handleOpen} variant="outlined">
        Join A Room
      </Button>
      <Dialog
        maxWidth="sm"
        onClose={handleClose}
        open={displaySettings.showDialogManualJoinRoom}
      >
        <div className="flex flex-col items-center px-4">
          <div>
            <div className="p-4 text-2xl font-bold">Join Room</div>
            <Divider sx={{ width: "100%" }} />
            <div className="p-4 pb-8">
              <div className="mb-8 text-lg">Enter the 4-letter code</div>
              <div>
                <TextField
                  id="outlined-controlled"
                  label="4-letter Code"
                  value={code}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCode(event.target.value.toUpperCase().slice(0, 4));
                  }}
                />
              </div>
              <div className="my-4">
                <Button
                  disabled={code.length != 4}
                  className="w-full"
                  onClick={() => {
                    mutate(code);
                    handleClose();
                  }}
                  variant="contained"
                >
                  Join
                </Button>
              </div>
              <div className="my-4">
                <Button
                  className="w-full"
                  onClick={handleClose}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
