import { useEffect } from "react";
import { EsriMap } from "./EsriMap";

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

  return (
    <div className="text-blue-700">
      <div>Map App</div>
      <div className="h-screen">
        <EsriMap />
      </div>
    </div>
  );
}
