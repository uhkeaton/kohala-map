import Dialog from "@mui/material/Dialog";
import { useRoomCode } from "./room";
import QRCode from "react-qr-code";
import { Button, Divider } from "@mui/material";
import { useGlobal } from "../global/useGlobal";

export function JoinRoom() {
  const { displaySettings, setDisplaySettings } = useGlobal();
  const { data } = useRoomCode();

  const handleClose = () => {
    setDisplaySettings((s) => ({ ...s, showJoinRoomDialog: false }));
  };

  const handleOpen = () => {
    setDisplaySettings((s) => ({ ...s, showJoinRoomDialog: true }));
  };

  const qrCode = window.location.origin + `/controller?code=${data}`;

  return (
    <>
      <Button className="w-full" onClick={handleOpen} variant="contained">
        Join This Room
      </Button>
      <Dialog
        maxWidth="sm"
        onClose={handleClose}
        open={displaySettings.showJoinRoomDialog}
      >
        <div className="flex flex-col items-center px-4">
          <div>
            <div className="p-4 text-2xl font-bold">Join Room</div>
            <Divider sx={{ width: "100%" }} />
            <div className="p-4 pb-8">
              <div className="text-xl mb-4">
                <span>Room Code: </span>
                <span>{data}</span>
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
