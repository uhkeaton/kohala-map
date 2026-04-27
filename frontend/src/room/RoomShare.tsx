import { useRoomCode } from "./room";
import QRCode from "react-qr-code";
import { controllerLink } from "../url";
import { useSearchParams } from "react-router";

export function RoomQrCode() {
  const { roomCode } = useRoomCode();
  const [searchParams] = useSearchParams();
  const qrCode = controllerLink({ searchParams, roomCode });

  return (
    <>
      <QRCode className="w-full h-full" value={qrCode} />
    </>
  );
}

export function RoomShare() {
  const [searchParams] = useSearchParams();
  const { roomCode } = useRoomCode();

  const href = controllerLink({ roomCode, searchParams });
  return (
    <>
      <div className="max-w-52">
        {roomCode && (
          <div className="w-full p-2">
            <div className="m-auto">
              <RoomQrCode />
            </div>
          </div>
        )}
        <div className="p-2">
          <a
            className="block max-w-full break-all cursor-pointer text-blue-300 underline hover:text-blue-400"
            target="_blank"
            href={href}
          >
            {href}
          </a>
        </div>
      </div>
    </>
  );
}
