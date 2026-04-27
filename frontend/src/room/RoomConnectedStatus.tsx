import { useRoomCode } from "./room";
import { useGlobal } from "../useGlobal";
import cx from "classnames";

export function RoomConnectedStatus() {
  const { socketConnected } = useGlobal();
  const { roomCode } = useRoomCode();

  return (
    <>
      {roomCode && (
        <div
          className={cx("text-md", {
            "text-lime-500": socketConnected,
            "text-neutral-400": !socketConnected,
          })}
        >
          {/* <span className="mr-2">{roomCode}</span> */}
          {socketConnected && <span>{"(connected)"}</span>}
          {!socketConnected && (
            <div className="flex gap-2">
              <img
                className="visible-dark h-6 w-6 m-auto"
                src="/loader-dark.gif"
              />
              <span>{"connecting…"}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
