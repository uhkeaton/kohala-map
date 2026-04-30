import Dialog, { DialogProps } from "@mui/material/Dialog";
import { useGlobal } from "./useGlobal";
import {
  IconArrowBack,
  IconArrowForward,
  IconEdit,
  IconGlobe,
  IconTabletMac,
} from "./icons";
import { Button, Divider } from "@mui/material";
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
import { Hero } from "./Hero";
import { Aspect } from "./Aspect";

export function PageWelcome() {
  const handleClose: DialogProps["onClose"] = (_, reason) => {
    if (reason === "backdropClick") {
      return; // block backdrop close
    }
  };

  return (
    <Hero imageSrc="/kohala-aerial.jpg">
      <Dialog
        hideBackdrop
        maxWidth="sm"
        scroll="body"
        fullWidth
        onClose={handleClose}
        open={true}
      >
        <Outlet />
      </Dialog>
    </Hero>
  );
}

export function PageWelcomeNavigate() {
  return (
    <div className="p-4">
      <div className="mb-8">
        <Title>{viteWelcomeTitle}</Title>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NavLink
          to={"map-connect"}
          title={"Map"}
          subtitle={"Go to map view"}
          icon={<IconGlobe className="w-6" />}
          imageSrc={"/kohala-aerial.jpg"}
        />
        <NavLink
          to={"controller-connect"}
          title={"Controller"}
          subtitle={"Go to controller view"}
          icon={<IconTabletMac className="w-6" />}
          imageSrc={"/controller.jpg"}
        />
        <NavLink
          to={"editor"}
          title={"Editor"}
          subtitle={"Go to editor"}
          icon={<IconEdit className="w-6" />}
          imageSrc={"/pencils.jpg"}
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

        <div className="my-3">
          <ButtonCreateNewRoom variant="contained" />
        </div>
        <div className="my-3">
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
          className="flex gap-2"
        >
          <IconGlobe className="w-8" />
          Continue To Map
        </Button>
      </div>
      <Divider sx={{ mb: 3 }} />
      <div className="my-3">
        <RoomCreateDialog />
      </div>
      <div className="my-3">
        <RoomJoinByCodeDialog />
      </div>
      <div className="my-3">
        <Button
          className="w-full flex gap-2"
          onClick={() => goTo("welcome")}
          variant="outlined"
        >
          <IconArrowBack className="w-6" />
          Go Back
        </Button>
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

        <div className="my-3">
          <JoinRoomCodeInput />
        </div>
        <div className="my-3">
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
      <div className="my-3 mb-8">
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
          className="flex gap-2"
        >
          <IconTabletMac className="w-8" />
          Continue To Controller
        </Button>
      </div>
      <Divider sx={{ my: 4 }} />
      <div className="my-3">
        <RoomJoinByCodeDialog />
      </div>
      <div className="my-3">
        <RoomCreateDialog />
      </div>
      <div className="my-3">
        <Button
          className="w-full flex gap-2"
          onClick={() => goTo("welcome")}
          variant="outlined"
        >
          <IconArrowBack className="w-6" />
          Go Back
        </Button>
      </div>
    </div>
  );
}

function NavLink({
  title,
  subtitle,
  icon,
  to,
  imageSrc,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  to: View;
  imageSrc: string;
}) {
  const { goTo } = useGlobal();
  return (
    <div
      className={
        "group w-full bg-white mb-4 relative border border-(--line) drop-shadow-md rounded-lg overflow-hidden"
      }
    >
      <button
        className="w-full text-black/80 relative cursor-pointer p-4"
        onClick={() => {
          goTo(to);
        }}
      >
        <div className="flex w-full justify-between mb-4">
          <div className="text-left">
            <div className="lexend-500 text-2xl group-hover:underline group-hover:text-blue-500">
              {title}
            </div>
            <div className="flex gap-1 text-neutral-500">
              <span>{subtitle}</span>
              <IconArrowForward className="w-5" />
            </div>
          </div>
          <div className="text-neutral-500 group-hover:text-blue-500">
            {icon}
          </div>
        </div>
        <div className="relative rounded-lg overflow-hidden">
          <Aspect ratioX={2} ratioY={1}>
            <Hero imageSrc={imageSrc}>
              <></>
            </Hero>
          </Aspect>
        </div>
      </button>
    </div>
  );
}
