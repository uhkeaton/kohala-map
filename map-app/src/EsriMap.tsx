import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-legend";
import "@arcgis/map-components/dist/components/arcgis-search";
import { useEffect, useRef } from "react";

// get the VITE_API_BASE_URL from .env, default to localhost
const API_URL =
  (import.meta.env.VITE_API_BASE_URL as string) ?? "http://127.0.0.1:8000";

export function EsriMap() {
  const mapRef = useRef(null);
  const viewRef = useRef<__esri.MapView>(null);

  useEffect(() => {
    const ws = new WebSocket(`${API_URL.replace("http://", "ws://")}/map-ws`);
    ws.onopen = () => console.log("Connected!");
    ws.onmessage = (e) => {
      if (e.data === "zoom-in") {
        if (viewRef.current) {
          viewRef.current.zoom++;
        }
      } else if (e.data === "zoom-out") {
        if (viewRef.current) {
          viewRef.current.zoom--;
        }
      } else {
        console.log("Received:", e.data);
      }
    };
    return () => {
      ws.close();
      console.log("WebSocket closed");
    };
  }, []);

  return (
    <>
      <arcgis-map
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        basemap="hybrid"
        // Kohala Coordinates
        center={[-155.6, 20.05]}
        zoom={11}
        onarcgisViewReadyChange={(event) => {
          viewRef.current = event.target.view;
        }}
      >
        <arcgis-search position="top-right"></arcgis-search>
        <arcgis-legend position="bottom-left"></arcgis-legend>
      </arcgis-map>
    </>
  );
}
