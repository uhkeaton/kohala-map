import cx from "classnames";
import { featuresByGroup } from "./feature";
import { useGlobal } from "./useGlobal";
import { useEffect, useRef, useState } from "react";
import { Feature } from "./types";
import { MediaCard } from "./MediaCard";
import { toMediaItems } from "./media";
import { Aspect } from "./Aspect";
import { FeatureVisibleBackground } from "./FeatureVisibleBackground";

export function VisitorFeatureSelect({
  onChange,
}: {
  onChange: (id: string) => void;
}) {
  const { features } = useGlobal();
  const data = featuresByGroup(features);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      const candidates: { id: string; distance: number }[] = [];

      itemRefs.current.forEach((el) => {
        if (!el) return;

        const id = el.dataset.id;
        if (!id) return;

        const rect = el.getBoundingClientRect();

        candidates.push({
          id,
          distance: Math.abs(centerY - (rect.top + rect.height / 2)),
        });
      });

      const closestItem = candidates.sort((a, b) => a.distance - b.distance)[0];

      if (!closestItem) return;
      if (closestItem.id === activeId) return;
      setActiveId(closestItem.id);
      onChange(closestItem.id);
    };

    onScroll(); // initial selection
    container.addEventListener("scroll", onScroll, { passive: true });

    return () => container.removeEventListener("scroll", onScroll);
  }, [onChange, activeId]);

  let flatIndex = 0;

  return (
    <div
      ref={containerRef}
      className="p-4 bg-white space-y-6 h-dvh overflow-y-auto scroll-smooth"
    >
      {/* Must pad the bottom and top, so the top and bottom items can be reached */}
      <div className="h-[50dvh]" />
      {data.map(([groupTitle, items]) => (
        <div key={groupTitle}>
          <h2 className="text-2xl text-neutral-500/70 font-semibold tracking-wide mb-2">
            {groupTitle}
          </h2>

          <ul className="space-y-1 list-none p-0 m-0">
            {items.map((item, i) => {
              const id = item.id ?? `${groupTitle}-${i}`;
              const index = flatIndex++;

              return (
                <li
                  onClick={() =>
                    itemRefs.current[index]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  }
                  key={id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  data-id={id}
                >
                  {/* <SimpleCard feature={item} active={activeId === id} /> */}
                  <RichCard feature={item} active={activeId === id} />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      {/* Must pad the bottom and top, so the top and bottom items can be reached */}
      <div className="h-[50dvh]" />
    </div>
  );
}

function SimpleCard({
  feature,
  active,
}: {
  feature: Feature;
  active: boolean;
}) {
  return (
    <div
      className={cx(
        "cursor-pointer lexend-500 text-4xl px-3 py-2 rounded-lg transition w-full max-w-full truncate",
        {
          "bg-blue-700/70 text-white scale-[101%]": active,
          "opacity-[87%]": !active,
        },
      )}
    >
      {feature.infoTitle}
    </div>
  );
}

function AbsoluteColorCard({
  feature,
  active,
}: {
  feature: Feature;
  active: boolean;
}) {
  return (
    <>
      <div
        className={cx("z-10 transition-opacity duration-600", {
          "opacity-25": !active,
        })}
      >
        <FeatureVisibleBackground feature={feature} />
      </div>
      <div className={cx("z-10 absolute w-full h-full inset-0 p-0.5")}>
        <div
          className={cx(
            "z-10 w-full h-full transition-opacity duration-600 bg-white rounded-md",
            {
              "opacity-0": active,
              "opacity-50": !active,
            },
          )}
        ></div>
      </div>
    </>
  );
}
function RichCard({ feature, active }: { feature: Feature; active: boolean }) {
  const { slideCount } = useGlobal();
  const mediaItems = toMediaItems(feature);
  const mediaIdxToShow = slideCount % mediaItems.length;
  return (
    <div
      className={cx(
        "relative cursor-pointer lexend-500 py-2 rounded-lg overflow-hidden transition w-full",
        {
          "text-white scale-[101%]": active,
        },
      )}
    >
      <div className="flex gap-2 w-full overflow-hidden pr-2 py-1">
        <div className="relative basis-2/3 shrink-0 w-full rounded-lg overflow-hidden">
          <AbsoluteColorCard feature={feature} active={active} />
          <div className="flex">
            <div className="z-20 p-2 px-3 md:text-4xl sm:text-3xl xs:text-2xl text-2xl">
              {feature.infoTitle}
            </div>
          </div>
        </div>
        <div className="basis-1/3 shrink-0">
          <div className="w-full">
            <Aspect ratioX={5} ratioY={4}>
              {mediaItems.map((item, i) => {
                return (
                  <MediaCard
                    key={`${i}-${item.src}`}
                    item={item}
                    visible={i == mediaIdxToShow}
                  />
                );
              })}
            </Aspect>
          </div>
        </div>
      </div>
    </div>
  );
}
