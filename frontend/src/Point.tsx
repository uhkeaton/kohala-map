import "./point.css";
import { Feature, type Coordinates } from "./types";
import { toCssFilterString } from "./filter";
import { WorldConfig } from "./data/spreadsheet";
import { useGlobal } from "./useGlobal";

/**
 * @param lat real latitude of point
 * @param long real longitude of point
 * @returns the percent offset of the point from the left and top of the map
 */
function toPercent(
  [long, lat]: Coordinates,
  worldConfig: WorldConfig,
): [number, number] {
  const { minLon, maxLon, minLat, maxLat } = worldConfig;
  const [minX, maxX] = [minLon, maxLon];
  const [minY, maxY] = [minLat, maxLat];

  const rangeY = maxY - minY;
  const rangeX = maxX - minX;

  // measuring percent from top, not from the bottom, hence the (1 -) at the begining
  const percentY = 1 - (lat - minY) / rangeY;

  // measuring percent from left
  const percentX = (long - minX) / rangeX;

  return [percentY, percentX];
}

export function Point({ point }: { point: Feature }) {
  const [long, lat] = [point.pointLon, point.pointLat];
  const filter = toCssFilterString(point.pointFilter);
  const { worldConfig } = useGlobal();
  const [percentY, percentX] = toPercent([long, lat], worldConfig);
  if (!long || !lat) return <></>;
  return (
    <div
      style={{
        transform: "translate(-50%, -50%)",
        position: "absolute",
        top: `${percentY * 100}%`,
        left: `${percentX * 100}%`,
        ...(filter && { filter: filter }),
      }}
    >
      <div className="point" />
    </div>
  );
}
