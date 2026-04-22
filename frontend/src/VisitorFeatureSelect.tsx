import cx from "classnames";
import { featuresByGroup } from "./feature";
import { useGlobal } from "./useGlobal";
import { useEffect, useRef, useState } from "react";

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
  }, [onChange]);

  let flatIndex = 0;

  return (
    <div
      ref={containerRef}
      className="p-8 bg-white space-y-6 h-dvh overflow-y-auto scroll-smooth"
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
                  className={cx(
                    "cursor-pointer lexend-500 text-4xl px-3 py-2 rounded-md transition w-full max-w-full truncate",
                    {
                      "bg-blue-700/70 text-white scale-[101%]": activeId === id,
                      "opacity-[87%]": activeId !== id,
                    },
                  )}
                >
                  {item.infoTitle || ""}
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
