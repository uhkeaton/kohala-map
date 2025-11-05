import { WS_URL } from "./api";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export type GenericSocketMessage = {
  room_code: string;
  action: "selectFeature";
  payload: { id: string };
}; // | {} ... add more

// export async function pushGenericSocketMessage(data: GenericSocketMessage) {
//   const res = await fetch(`${API_URL}/push`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) {
//     throw new Error(`Error: ${res.status}`);
//   }

//   return res.json();
// }

// export function useSocketMutation() {
//   return useMutation({
//     mutationFn: pushGenericSocketMessage,
//   });
// }

export function useWebSocketConnection(
  roomId: string | null | undefined,
  onMessage?: (msg: GenericSocketMessage) => void
) {
  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId) return;
    socketRef.current = new WebSocket(WS_URL + `?code=${roomId}`);
    const ws = socketRef.current;

    const init = () => {
      ws.onopen = () => {
        setSocketConnected(true);

        ws?.send(
          JSON.stringify({
            action: "join",
            room_code: roomId,
          })
        );
      };

      ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data) as GenericSocketMessage;
          onMessage?.(msg);
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

  return {
    socketConnected,
    send: (e: GenericSocketMessage) => {
      socketRef.current?.send(JSON.stringify(e));
    },
  };
}
