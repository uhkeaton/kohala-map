import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRoomCode } from "./room";

export function RoomJoinRedirect() {
  const { roomCode } = useParams();
  const { joinRoomMutation } = useRoomCode();
  const navigate = useNavigate();

  useEffect(() => {
    if (roomCode) {
      joinRoomMutation.mutate(roomCode);
    }

    // redirect
    navigate("/controller");
  }, [roomCode, navigate, joinRoomMutation]);

  return null;
}
