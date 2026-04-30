import { RoomCreateDialog } from "./RoomCreateDialog";
import { RoomJoinByCodeDialog } from "./RoomJoinByCodeDialog";
import { RoomConnectedStatus } from "./RoomConnectedStatus";

export function RoomSettings() {
  return (
    <>
      <div className="flex justify-end">
        <RoomConnectedStatus />
      </div>
      <div className="my-4">
        <RoomJoinByCodeDialog />
      </div>
      <div className="my-4">
        <RoomCreateDialog />
      </div>
    </>
  );
}
