import { useGlobal } from "../global/useGlobal";
import type { Feature } from "../types";
import cx from "classnames";
import { features } from "./features";
import { renderFeatureTitle } from "./feature";

function FeatureItem({ feature }: { feature: Feature }) {
  const { visibleFeature, setVisibleFeature, displaySettings } = useGlobal();
  return (
    <>
      <div
        className={cx("cursor-pointer", {
          "bg-sky-500/20": visibleFeature?.id === feature.id,
          "hover:bg-sky-500/10": visibleFeature?.id !== feature.id,
        })}
        onClick={() => {
          setVisibleFeature(feature);
        }}
      >
        <div className="p-1">
          {renderFeatureTitle(feature, displaySettings)}
        </div>
        <hr className="opacity-10" />
      </div>
    </>
  );
}

export function FeatureList() {
  const Features = features.map((item) => {
    return <FeatureItem feature={item} />;
  });
  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full rounded-lg bg-gray-500/20 text-white overflow-scroll">
        {Features}
      </div>
    </div>
  );
}
