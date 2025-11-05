import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import localforage from "localforage";
import { toast } from "react-hot-toast";

export function generateRandomFourLetterCode() {
  const code = Array.from({ length: 4 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
  return code;
}

async function fetchRoomCode() {
  const code = await localforage.getItem("kohalaRoomCode");
  if (code && typeof code === "string") return code;
  return null;
}

async function createRoomCode() {
  const code = generateRandomFourLetterCode();
  await localforage.setItem("kohalaRoomCode", code);
  return code;
}

async function joinRoomCode(code: string) {
  await localforage.setItem("kohalaRoomCode", code);
  return code;
}

export function useRoomCode() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["roomCode"],
    queryFn: fetchRoomCode,
  });

  const createRoomMutation = useMutation({
    mutationFn: createRoomCode,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["roomCode"] });
    },
  });

  const joinRoomMutation = useMutation({
    mutationFn: joinRoomCode,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["roomCode"] });
    },
    onSuccess: () => {
      toast.success("Room Joined!");
    },
  });

  return {
    query: query,
    roomCode: query.data,
    createRoomMutation: createRoomMutation,
    joinRoomMutation: joinRoomMutation,
  };
}
