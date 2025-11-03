import { AutoScale } from "../ui/AutoScale";
import { FadeIn } from "../ui/FadeIn";
import { useGlobal } from "../hooks/useGlobal";

export function FeatureDetail() {
  const { visibleFeature } = useGlobal();
  return (
    <AutoScale>
      {(scale) => {
        return (
          <FadeIn id={visibleFeature?.id}>
            <div
              style={{
                padding: 16 * scale,
              }}
              className="w-full h-full flex flex-col justify-around"
            >
              <div>
                <div
                  style={{
                    fontSize: 36 * scale,
                  }}
                  className="mb-2 font-bold"
                >
                  {visibleFeature?.titleEnglish}
                </div>
                <div
                  style={{
                    fontSize: 16 * scale,
                  }}
                >
                  {visibleFeature?.descriptionEnglish}
                </div>
              </div>

              {visibleFeature?.imgSrc && (
                <img
                  style={{
                    marginTop: 16 * scale,
                    marginBottom: 16 * scale,
                  }}
                  className="w-full"
                  src={visibleFeature?.imgSrc}
                />
              )}
            </div>
          </FadeIn>
        );
      }}
    </AutoScale>
  );
}
