import { Feature } from "../types";
import { AutoScale } from "../ui/AutoScale";
import { useGlobal } from "../useGlobal";
import cx from "classnames";

export function FeatureDetail({ feature }: { feature: Feature }) {
  const { visibleFeatureId } = useGlobal();
  return (
    <div className="w-full absolute inset-0 flex flex-col justify-center items-center overflow-hidden">
      <AutoScale>
        {(scale) => {
          return (
            <div
              style={{
                padding: 16 * scale,
                gap: 16 * scale,
              }}
              className={cx("w-full h-full flex flex-col justify-center", {
                "opacity-0": visibleFeatureId !== feature.id,
              })}
            >
              <div>
                <div
                  style={{
                    fontSize: 36 * scale,
                  }}
                  className="mb-2 font-bold"
                >
                  {feature && feature.title}
                </div>
                <div
                  style={{
                    fontSize: 16 * scale,
                  }}
                >
                  {feature && feature.description}
                </div>
              </div>

              {feature?.imgSrc && (
                <img
                  style={{
                    marginTop: 16 * scale,
                    marginBottom: 16 * scale,
                  }}
                  className="w-full"
                  src={feature?.imgSrc}
                />
              )}
            </div>
          );
        }}
      </AutoScale>
    </div>
  );
}
