import { useRoomCode } from "./room";
import { useGlobal } from "../global/useGlobal";
import cx from "classnames";

export function ConnectedStatus() {
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
    </>
  );
}
