import { useRoomCode } from "./room";
import { RoomShareDialog } from "./RoomShareDialog";
import { RoomCreateDialog } from "./RoomCreateDialog";
import { RoomJoinByCodeDialog } from "./RoomJoinByCodeDialog";
import { RoomConnectedStatus } from "./RoomConnectedStatus";
import { useSearchParams } from "react-router";
import { controllerLink } from "../url";

export function RoomSettings() {
  const [searchParams] = useSearchParams();
  const { roomCode } = useRoomCode();

  const href = controllerLink({ roomCode, searchParams });
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
      <div className="py-4">
        <div>Go to controller view:</div>
        <div className="max-w-48">
          <a
            className="block max-w-full break-all cursor-pointer text-blue-300 underline hover:text-blue-400"
            target="_blank"
            href={href}
          >
            {href}
          </a>
        </div>
        {/* <Button
          className="w-full"
          onClick={() => {
            navigate("/controller");
          }}
          variant="text"
        >
          Controller View
        </Button> */}
      </div>
    </>
  );
}
