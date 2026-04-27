import Dialog, { DialogProps } from "@mui/material/Dialog";
import { useGlobal } from "./useGlobal";
import { IconEdit, IconGlobe, IconTabletMac } from "./icons";
import { Button, Divider } from "@mui/material";
import { DisplaySettings } from "./types";
import { RoomConnectedStatus } from "./room/RoomConnectedStatus";
import { RoomQrCode } from "./room/RoomShareDialog";
import {
  JoinRoomCodeInput,
  RoomJoinByCodeDialog,
} from "./room/RoomJoinByCodeDialog";
import { useRoomCode } from "./room/room";
import { ButtonCreateNewRoom, RoomCreateDialog } from "./room/RoomCreateDialog";
import { Title } from "./Title";

export function WelcomeDialog() {
  const { displaySettings } = useGlobal();

  const handleClose: DialogProps["onClose"] = (event, reason) => {
    if (reason === "backdropClick") {
      return; // block backdrop close
    }
  };

  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        open={
          displaySettings.view == "welcome" ||
          displaySettings.view == "map-connect" ||
          displaySettings.view == "controller-connect"
        }
      >
        {displaySettings.view == "welcome" && <Home />}
        {displaySettings.view == "map-connect" && <ConnectMap />}
        {displaySettings.view == "controller-connect" && <ConnectController />}
      </Dialog>
    </>
  );
}

function Home() {
  return (
    <div className="p-4">
      <div className="mb-8">
        <Title>Welcome to Kohala Map</Title>
      </div>
      {/* <Divider sx={{ my: 2 }} /> */}
      <div className="">
        <NavLink
          to={"map-connect"}
          title={"Map"}
          icon={<IconGlobe className="w-8" />}
        />
        <NavLink
          to={"controller-connect"}
          title={"Controller"}
          icon={<IconTabletMac className="w-8" />}
        />
        <NavLink
          to={"editor"}
          title={"Editor"}
          icon={<IconEdit className="w-8" />}
        />
      </div>
    </div>
  );
}

function ConnectMap() {
  const { setDisplaySettings } = useGlobal();
  const { roomCode } = useRoomCode();
  if (!roomCode) {
    return (
      <div className="p-4">
        <div className="mb-8">
          <Title>
            Create a room to get started
            <span className="text-lime-500 font-semibold">{roomCode}</span>
          </Title>
        </div>

        <div className="my-4">
          <ButtonCreateNewRoom variant="contained" />
        </div>
        <div className="my-4">
          <RoomJoinByCodeDialog />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <Title>
          Your room code is{" "}
          <span className="text-lime-500 font-semibold">{roomCode}</span>
        </Title>
        <div className="mb-4">
          <RoomConnectedStatus />
        </div>
      </div>
      <div className="my-4">
        To control the map, enter the 4-letter room code{" "}
        <span className="text-lime-500 font-semibold">{roomCode}</span> in the
        controller app on another device, or scan the QR code.
      </div>

      <div>
        <div className="w-48 m-auto">
          <RoomQrCode />
        </div>
      </div>
      <div className="flex w-full">
        <Button
          fullWidth
          disabled={!roomCode}
          variant="contained"
          onClick={() => setDisplaySettings((s) => ({ ...s, view: "map" }))}
        >
          Continue To Map
        </Button>
      </div>
      <Divider sx={{ my: 4 }} />
      <div className="my-4">
        <RoomCreateDialog />
      </div>
      <div className="my-4">
        <RoomJoinByCodeDialog />
      </div>
    </div>
  );
}

function ConnectController() {
  const { setDisplaySettings } = useGlobal();
  const { roomCode } = useRoomCode();
  if (!roomCode) {
    return (
      <div className="p-4">
        <div className="mb-8">
          <Title>
            Enter your 4-letter room code
            <span className="text-lime-500 font-semibold">{roomCode}</span>
          </Title>
        </div>

        <div className="my-4">
          <JoinRoomCodeInput />
        </div>
        <div className="my-4">
          <ButtonCreateNewRoom variant="outlined" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Title>
          Your room code is{" "}
          <span className="text-lime-500 font-semibold">{roomCode}</span>
        </Title>
        <div className="mb-4">
          <RoomConnectedStatus />
        </div>
      </div>
      <div className="my-4 mb-8">
        Make sure the map app is connected to the same room using code{" "}
        <span className="text-lime-500 font-semibold">{roomCode}</span> on
        another device.
      </div>
      <div className="flex w-full">
        <Button
          fullWidth
          disabled={!roomCode}
          variant="contained"
          onClick={() =>
            setDisplaySettings((s) => ({ ...s, view: "controller" }))
          }
        >
          Continue To Controller
        </Button>
      </div>
      <Divider sx={{ my: 4 }} />
      <div className="my-4">
        <RoomJoinByCodeDialog />
      </div>
      <div className="my-4">
        <RoomCreateDialog />
      </div>
    </div>
  );
}

function NavLink({
  title,
  icon,
  to,
}: {
  title: string;
  icon: React.ReactNode;
  to: DisplaySettings["view"];
}) {
  const { setDisplaySettings } = useGlobal();
  return (
    <div
      onClick={() => setDisplaySettings((s) => ({ ...s, view: to }))}
      className={
        "cursor-pointer border hover:bg-neutral-300/20 border-(--line) mb-4 p-4 rounded-lg"
      }
    >
      <div className="w-full flex gap-4">
        {icon}
        <div className="lexend-500 text-3xl ">{title}</div>
      </div>
    </div>
  );
}
