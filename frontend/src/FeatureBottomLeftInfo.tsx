import { AutoScale } from "./AutoScale";
import { Feature } from "./types";

export function FeatureBottomLeftInfo({ feature }: { feature: Feature }) {
  return (
    <div className="w-1/3 h-1/3 overflow-hidden absolute bottom-0 left-0 flex items-center">
      <AutoScale>
        {(scale) => {
          return (
            <div
              style={{
                padding: 16 * scale,
                gap: 16 * scale,
              }}
              className={"w-full h-full"}
            >
              <div
                style={{
                  fontSize: 16 * scale,
                }}
              >
                {feature && feature.mapDescriptionBottomLeft}
              </div>
            </div>
          );
        }}
      </AutoScale>
    </div>
  );
}
