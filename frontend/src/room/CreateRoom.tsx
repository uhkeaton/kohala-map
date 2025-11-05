import Dialog from "@mui/material/Dialog";
import { useRoomCode } from "./room";
import { Button, Divider } from "@mui/material";
import { useGlobal } from "../global/useGlobal";

export function CreateRoom() {
  const { displaySettings, setDisplaySettings } = useGlobal();

  const { createRoomMutation } = useRoomCode();

  function createRoom() {
    setDisplaySettings((s) => ({
      ...s,
      showCreateRoomDialog: false,
      showShareRoomDialog: true,
    }));
    createRoomMutation.mutate();
  }

  const handleClose = () => {
    setDisplaySettings((s) => ({ ...s, showCreateRoomDialog: false }));
  };

  const handleOpen = () => {
    setDisplaySettings((s) => ({ ...s, showCreateRoomDialog: true }));
  };

  return (
    <>
      <Button className="w-full" onClick={handleOpen} variant="outlined">
        Create New Room
      </Button>
      <Dialog
        maxWidth="sm"
        onClose={handleClose}
        open={displaySettings.showCreateRoomDialog}
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
