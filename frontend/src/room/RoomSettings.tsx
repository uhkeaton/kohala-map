import { useRoomCode } from "./room";
import { ShareRoom } from "./ShareRoom";
import { CreateRoom } from "./CreateRoom";
import { ManualJoinRoom } from "./ManualJoinRoom";
import { ConnectedStatus } from "./ConnectedStatus";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

export function RoomSettings() {
  const navigate = useNavigate();
  const { roomCode } = useRoomCode();

  return (
    <>
      <ConnectedStatus />
      {roomCode && (
        <div className="my-4">
          <ShareRoom />
        </div>
      )}
      <div className="my-4">
        <ManualJoinRoom />
      </div>
      <div className="my-4">
        <CreateRoom />
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
