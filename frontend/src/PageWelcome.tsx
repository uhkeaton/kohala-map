import Dialog, { DialogProps } from "@mui/material/Dialog";
import { useGlobal } from "./useGlobal";
import { IconEdit, IconGlobe, IconTabletMac } from "./icons";
import { Button, Divider, ThemeProvider } from "@mui/material";
import { View } from "./types";
import { RoomConnectedStatus } from "./room/RoomConnectedStatus";
import { RoomQrCode } from "./room/RoomShare";
import { Outlet } from "react-router-dom";
import {
  JoinRoomCodeInput,
  RoomJoinByCodeDialog,
} from "./room/RoomJoinByCodeDialog";
import { useRoomCode } from "./room/room";
import { ButtonCreateNewRoom, RoomCreateDialog } from "./room/RoomCreateDialog";
import { Title } from "./Title";
import { viteWelcomeTitle } from "./env";
import { darkTheme } from "./theme";
import { Hero } from "./Hero";

export function PageWelcome() {
  const handleClose: DialogProps["onClose"] = (_, reason) => {
    if (reason === "backdropClick") {
      return; // block backdrop close
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Hero>
        <Dialog
          hideBackdrop
          maxWidth="sm"
          fullWidth
          onClose={handleClose}
          open={true}
        >
          <Outlet />
        </Dialog>
      </Hero>
    </ThemeProvider>
  );
}

export function PageWelcomeNavigate() {
  return (
    <div className="p-4">
      <div className="mb-8">
        <Title>{viteWelcomeTitle}</Title>
      </div>
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

export function MessageController() {
  const { roomCode } = useRoomCode();
  return (
    <>
      To control the map, enter the 4-letter room code{" "}
      <span className="text-lime-500 font-semibold">{roomCode}</span> in the
      controller app on another device, or scan the QR code.
    </>
  );
}

export function PageWelcomeConnectMap() {
  const { goTo } = useGlobal();
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
      <div className="flex mb-6 gap-6">
        <div className="flex-1">
          <MessageController />
        </div>
        <div className="w-1/2 max-w-40 ml-auto">
          <RoomQrCode />
        </div>
      </div>
      <div className="flex w-full mb-6">
        <Button
          fullWidth
          disabled={!roomCode}
          variant="contained"
          onClick={() => goTo("map")}
        >
          Continue To Map
        </Button>
      </div>
      <Divider sx={{ mb: 3 }} />
      <div className="my-4">
        <RoomCreateDialog />
      </div>
      <div className="my-4">
        <RoomJoinByCodeDialog />
      </div>
    </div>
  );
}

export function PageWelcomeConnectController() {
  const { goTo } = useGlobal();
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
          onClick={() => goTo("controller")}
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
  to: View;
}) {
  const { goTo } = useGlobal();
  return (
    <div className={"mb-4"}>
      <button
        className="w-full h-full cursor-pointer p-4 border hover:bg-neutral-300/20 border-(--line) rounded-lg"
        onClick={() => {
          goTo(to);
        }}
      >
        <div className="w-full flex gap-4">
          {icon}
          <div className="lexend-500 text-3xl ">{title}</div>
        </div>
      </button>
    </div>
  );
}
