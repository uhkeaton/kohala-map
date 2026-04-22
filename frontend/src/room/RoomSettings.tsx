import { useRoomCode } from "./room";
import { RoomShareDialog } from "./RoomShareDialog";
import { RoomCreateDialog } from "./RoomCreateDialog";
import { RoomJoinByCodeDialog } from "./RoomJoinByCodeDialog";
import { RoomConnectedStatus } from "./RoomConnectedStatus";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

export function RoomSettings() {
  const navigate = useNavigate();
  const { roomCode } = useRoomCode();

  return (
    <>
      <RoomConnectedStatus />
      {roomCode && (
        <div className="my-4">
          <RoomShareDialog />
        </div>
      )}
      <div className="my-4">
        <RoomJoinByCodeDialog />
      </div>
      <div className="my-4">
        <RoomCreateDialog />
      </div>
      <div>
        <Button
          className="w-full"
          onClick={() => {
            navigate("/controller");
          }}
          variant="text"
        >
          Controller View
        </Button>
      </div>
    </>
  );
}
