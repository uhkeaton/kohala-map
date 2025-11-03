import { useRoomCode } from "./room";
import { JoinRoom } from "./JoinRoom";
import { CreateRoom } from "./CreateRoom";

export function RoomSettings() {
  const { data } = useRoomCode();

  return (
    <>
      {data && (
        <div className="my-4">
          <JoinRoom />
        </div>
      )}
      <div className="my-4">
        <CreateRoom />
      </div>
    </>
  );
}
