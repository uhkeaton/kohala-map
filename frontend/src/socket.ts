import { WS_URL } from "./api";
import { useCallback, useEffect, useRef, useState } from "react";

export type GenericSocketMessage =
  | {
      // room_code: string;
      action: "selectFeature";
      payload: { id: string };
    }
  | {
      action: "selectSpreadsheetId";
      payload: { id: string };
    };
// | {} ... add more

export function useWebSocketConnection(
  roomId: string | null | undefined,
  onMessage?: (msg: GenericSocketMessage) => void
) {
  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connect = useCallback(() => {
    if (!roomId) return;

    // Clear any pending reconnect attempts
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }

    const ws = new WebSocket(WS_URL + `?code=${roomId}`);
    socketRef.current = ws;

    ws.onopen = () => {
      setSocketConnected(true);
      ws.send(JSON.stringify({}));
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

      // 🔁 Automatically try to reconnect after delay
      reconnectTimeout.current = setTimeout(() => {
        console.log("Attempting to reconnect...");
        connect();
      }, 3000);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
      ws.close(); // will trigger onclose + reconnect
    };
  }, [roomId, onMessage]);

  useEffect(() => {
    if (roomId) connect();
    return () => {
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      socketRef.current?.close();
    };
  }, [roomId, connect]);

  const reconnect = useCallback(() => {
    socketRef.current?.close(); // will trigger the reconnect logic
  }, []);

  const send = useCallback((msg: GenericSocketMessage) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      console.warn("Cannot send: socket not open");
    }
  }, []);

  return {
    socketConnected,
    send,
    reconnect, // optional manual trigger
  };
}
