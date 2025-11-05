import { useRoomCode } from "./room";
import { ShareRoom } from "./ShareRoom";
import { CreateRoom } from "./CreateRoom";
import { ManualJoinRoom } from "./ManualJoinRoom";
import { ConnectedStatus } from "./ConnectedStatus";

export function RoomSettings() {
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
    </>
  );
}
