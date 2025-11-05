import { useRoomCode } from "./room";
import { JoinRoom } from "./JoinRoom";
import { CreateRoom } from "./CreateRoom";
import { useGlobal } from "../global/useGlobal";
import cx from "classnames";

export function RoomSettings() {
  const { socketConnected } = useGlobal();
  const { roomCode } = useRoomCode();

  return (
    <>
      {roomCode && (
        <div
          className={cx("text-md", {
            "text-lime-500": socketConnected,
            "text-red-500": !socketConnected,
          })}
        >
          <span className="mr-2">{roomCode}</span>
          <span>{socketConnected ? "(connected)" : "(disconnected)"}</span>
        </div>
      )}

      {roomCode && (
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
