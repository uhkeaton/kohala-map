import Dialog from "@mui/material/Dialog";
import { useRoomCode } from "./room";
import QRCode from "react-qr-code";
import { Button, Divider } from "@mui/material";
import { useGlobal } from "../useGlobal";
import { useSearchParams } from "react-router";
import { controllerLink } from "../url";

export function RoomQrCode() {
  const { roomCode } = useRoomCode();
  const [searchParams] = useSearchParams();
  const qrCode = controllerLink({ searchParams, roomCode });

  return (
    <>
      <QRCode className="w-full" value={qrCode} />
    </>
  );
}

export function RoomShareDialog() {
  const { displaySettings, setDisplaySettings, socketConnected } = useGlobal();
  const { roomCode } = useRoomCode();

  const handleClose = () => {
    setDisplaySettings((s) => ({ ...s, showDialogShareRoom: false }));
  };

  const handleOpen = () => {
    setDisplaySettings((s) => ({ ...s, showDialogShareRoom: true }));
  };

  return (
    <>
      <Button
        disabled={!socketConnected}
        className="w-full"
        onClick={handleOpen}
        variant="contained"
      >
        Share This Room
      </Button>
      <Dialog
        maxWidth="sm"
        onClose={handleClose}
        open={displaySettings.showDialogShareRoom}
      >
        <div className="flex flex-col items-center px-4">
          <div>
            <div className="p-4 text-2xl font-bold">Share Room</div>
            <Divider sx={{ width: "100%" }} />
            <div className="p-4 pb-8">
              <div className="text-xl mb-4">
                <span>Room Code: </span>
                <span>{roomCode}</span>
              </div>
              <div className="w-full">
                <RoomQrCode />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
