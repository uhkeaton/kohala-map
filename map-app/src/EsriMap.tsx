import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-legend";
import "@arcgis/map-components/dist/components/arcgis-search";

export function EsriMap() {
  return (
    <arcgis-map
      style={{ width: "100%", height: "100%" }}
      basemap="hybrid"
      // Kohala Coordinates
      center={[-155.6, 20.05]}
      zoom={11}
      onarcgisViewReadyChange={(event) => {
        console.log("MapView ready", event);
      }}
    >
      <arcgis-search position="top-right"></arcgis-search>
      <arcgis-legend position="bottom-left"></arcgis-legend>
    </arcgis-map>
  );
}
