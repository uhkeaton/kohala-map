import "./point.css";
import type { Coordinates } from "../types/types";
import { MapConfig, useSpreadsheet } from "../spreadsheet/spreadsheet";

/**
 * @param lat real latitude of point
 * @param long real longitude of point
 * @returns the percent offset of the point from the left and top of the map
 */
function toPercent(
  [long, lat]: Coordinates,
  mapConfig: MapConfig
): [number, number] {
  const { minLon, maxLon, minLat, maxLat } = mapConfig;
  const [minX, maxX] = [minLon, maxLon];
  const [minY, maxY] = [minLat, maxLat];

  const rangeY = maxY - minY;
  const rangeX = maxX - minX;

  // measuring percent from top, not from the bottom, hence the (1 -) at the begining
  const percentY = 1 - (long - minY) / rangeY;

  // measuring percent from left
  const percentX = (lat - minX) / rangeX;

  // because the map is flipped upside down
  // with North Kohala facing the viewer,
  // we must rotate the coords 180 degrees.
  const flippedX = 1 - percentX;
  const flippedY = 1 - percentY;

  return [flippedY, flippedX];
}

export function Point({ coords }: { coords: Coordinates }) {
  const [long, lat] = coords;
  const { mapConfig } = useSpreadsheet();
  const [percentY, percentX] = toPercent([long, lat], mapConfig);
  return (
    <div
      style={{
        transform: "translate(-50%, -50%)",
        position: "absolute",
        top: `${percentY * 100}%`,
        left: `${percentX * 100}%`,
      }}
    >
      <div className="point" />
    </div>
  );
}
