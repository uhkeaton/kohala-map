import { useRoomCode } from "./room";
import { JoinRoom } from "./JoinRoom";
import { CreateRoom } from "./CreateRoom";
import { useGlobal } from "../global/useGlobal";
import cx from "classnames";

export function RoomSettings() {
  const { socketConnected } = useGlobal();
  const { data } = useRoomCode();

  return (
    <>
      <span
        className={cx("text-md", {
          "text-lime-500": socketConnected,
          "text-red-500": !socketConnected,
        })}
      >
        {socketConnected ? "(connected)" : "(disconnected)"}
      </span>
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
