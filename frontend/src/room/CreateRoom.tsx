import Dialog from "@mui/material/Dialog";
import { useRoomCode } from "./room";
import { Button, Divider } from "@mui/material";
import { useGlobal } from "../useGlobal";

export function CreateRoom() {
  const { displaySettings, setDisplaySettings } = useGlobal();

  const { createRoomMutation } = useRoomCode();

  function createRoom() {
    setDisplaySettings((s) => ({
      ...s,
      showDialogCreateRoom: false,
      showDialogShareRoom: true,
    }));
    createRoomMutation.mutate();
  }

  const handleClose = () => {
    setDisplaySettings((s) => ({ ...s, showDialogCreateRoom: false }));
  };

  const handleOpen = () => {
    setDisplaySettings((s) => ({ ...s, showDialogCreateRoom: true }));
  };

  return (
    <>
      <Button className="w-full" onClick={handleOpen} variant="outlined">
        Create New Room
      </Button>
      <Dialog
        maxWidth="sm"
        onClose={handleClose}
        open={displaySettings.showDialogCreateRoom}
      >
        <div className="flex flex-col items-center px-4">
          <div>
            <div className="p-4 text-2xl font-bold">New Room</div>
            <Divider sx={{ width: "100%" }} />
            <div className="p-4 pb-8">
              <div className="mb-8 text-lg">
                Are you sure you want to create a new room?
              </div>
              <div className="my-4">
                <Button
                  className="w-full"
                  onClick={createRoom}
                  variant="contained"
                >
                  Create Room
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
