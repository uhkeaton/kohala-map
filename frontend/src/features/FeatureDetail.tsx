import { AutoScale } from "../ui/AutoScale";
import { FadeIn } from "../ui/FadeIn";
import { useGlobal } from "../useGlobal";

export function FeatureDetail() {
  const { visibleFeature } = useGlobal();
  return (
    <AutoScale>
      {(scale) => {
        return (
          <FadeIn id={String(visibleFeature?.id)}>
            <div
              style={{
                padding: 16 * scale,
                gap: 16 * scale,
              }}
              className="w-full h-full flex flex-col justify-center"
            >
              <div>
                <div
                  style={{
                    fontSize: 36 * scale,
                  }}
                  className="mb-2 font-bold"
                >
                  {visibleFeature && visibleFeature.title}
                </div>
                <div
                  style={{
                    fontSize: 16 * scale,
                  }}
                >
                  {visibleFeature && visibleFeature.description}
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
