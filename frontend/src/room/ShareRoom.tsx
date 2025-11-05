import Dialog from "@mui/material/Dialog";
import { useRoomCode } from "./room";
import QRCode from "react-qr-code";
import { Button, Divider } from "@mui/material";
import { useGlobal } from "../global/useGlobal";

export function ShareRoom() {
  const { displaySettings, setDisplaySettings, socketConnected } = useGlobal();
  const { roomCode } = useRoomCode();

  const handleClose = () => {
    setDisplaySettings((s) => ({ ...s, showShareRoomDialog: false }));
  };

  const handleOpen = () => {
    setDisplaySettings((s) => ({ ...s, showShareRoomDialog: true }));
  };

  //   const qrCode = window.location.origin + `/controller?code=${data}`;
  const qrCode = "https://kohala.pages.dev" + `/controller?code=${roomCode}`;

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
        open={displaySettings.showShareRoomDialog}
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
                <QRCode className="w-full" value={qrCode} />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
