import { useMutation } from "@tanstack/react-query";
import { API_URL, WS_URL } from "./api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type GenericSocketMessage = {
  room_code: string;
  action: "selectFeature";
  payload: { id: string };
}; // | {} ... add more

export async function pushGenericSocketMessage(data: GenericSocketMessage) {
  const res = await fetch(`${API_URL}/push`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}

export function useSocketMutation() {
  return useMutation({
    mutationFn: pushGenericSocketMessage,
  });
}

export function useSocketConnection(
  roomId: string | null | undefined,
  onMessage: (msg: GenericSocketMessage) => void
) {
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    let ws: WebSocket | null = null;

    const init = () => {
      //   ws = new WebSocket("ws://:8000/socket");
      ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        // toast.success(`Connected! (${roomId})`);

        setSocketConnected(true);

        ws?.send(
          JSON.stringify({
            action: "join",
            room_code: roomId,
          })
        );
      };

      ws.onmessage = (e) => {
        console.log("Hi");
        try {
          const msg = JSON.parse(e.data) as GenericSocketMessage;
          onMessage(msg);
        } catch (err) {
          console.error("Failed to parse message:", err);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        setSocketConnected(false);
      };

      ws.onerror = (err) => {
        console.error("WebSocket error", err);
      };
    };

    try {
      init();
    } catch {
      toast.error("Socket connection failed.");
    }

    return () => {
      if (ws) ws.close();
    };
  }, [roomId, onMessage]);

  return { socketConnected };
}
