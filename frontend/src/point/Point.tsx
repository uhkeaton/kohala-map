import "./point.css";
import type { Coordinates } from "../types";
import { mapMaxX, mapMaxY, mapMinX, mapMinY } from "../constants";

/**
 * @param lat real latitude of point
 * @param long real longitude of point
 * @returns the percent offset of the point from the left and top of the map
 */
function toPercent([long, lat]: Coordinates): [number, number] {
  const rangeY = mapMaxY - mapMinY;
  const rangeX = mapMaxX - mapMinX;

  // measuring percent from top, not from the bottom, hence the (1 -) at the begining
  const percentY = 1 - (long - mapMinY) / rangeY;

  // measuring percent from left
  const percentX = (lat - mapMinX) / rangeX;

  // because the map is flipped upside down
  // with North Kohala facing the viewer,
  // we must rotate the coords 180 degrees.
  const flippedX = 1 - percentX;
  const flippedY = 1 - percentY;

  return [flippedY, flippedX];
}

export function Point({ coords }: { coords: Coordinates }) {
  const [long, lat] = coords;
  const [percentY, percentX] = toPercent([long, lat]);
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
