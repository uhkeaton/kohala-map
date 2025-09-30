import { useEffect } from "react";
import "./App.css";

export function MapApp() {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/map-ws");
    ws.onopen = () => console.log("Connected!");
    ws.onmessage = (e) => console.log("Received:", e.data);
    return () => {
      ws.close();
      console.log("WebSocket closed");
    };
  }, []);

  return <div>Map App</div>;
}
