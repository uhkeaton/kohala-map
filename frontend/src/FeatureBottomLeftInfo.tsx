import { AutoFitText } from "./AutoFitText";
import { Feature } from "./types";

export function FeatureBottomLeftInfo({ feature }: { feature: Feature }) {
  return (
    <div className="w-1/3 h-1/3 overflow-hidden absolute bottom-0 left-0 flex items-center p-4">
      <AutoFitText text={feature.mapDescriptionBottomLeft} />
    </div>
  );
}
