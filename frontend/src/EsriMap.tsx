import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-search";
import { useRef } from "react";

export function EsriMap() {
  const mapRef = useRef(null);
  const viewRef = useRef<__esri.MapView>(null);

  // useEffect(() => {
  //   const ws = new WebSocket(WS_URL);
  //   // ws.onopen = () => console.log("Connected!");

  //   ws.onmessage = (e) => {
  //     console.log(JSON.stringify(e));

  //     if (e.data === "zoom-in") {
  //       if (viewRef.current) {
  //         viewRef.current.zoom = viewRef.current.zoom + 1;
  //       }
  //     } else if (e.data === "zoom-out") {
  //       if (viewRef.current) {
  //         viewRef.current.zoom = viewRef.current.zoom - 1;
  //       }
  //     } else {
  //       console.log("Received:", e.data);
  //     }
  //   };
  //   return () => {
  //     ws.close();
  //     console.log("WebSocket closed");
  //   };
  // }, []);

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
