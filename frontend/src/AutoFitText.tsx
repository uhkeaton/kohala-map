import { useEffect, useRef, useState } from "react";
import cx from "classnames";

export function AutoFitText({ text }: { text: string }) {
  const min = 1;
  const max = 20;

  const sizes = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fontSize, setFontSize] = useState(max);

  function computeBestSize() {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];

    let bestSize = min;

    for (const el of children) {
      const fits = el.scrollHeight <= container.clientHeight;

      if (fits) {
        const size = Number(el.dataset.size);
        bestSize = Math.max(bestSize, size);
      }
    }

    setFontSize(bestSize);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    const ro = new ResizeObserver(() => {
      computeBestSize();
    });

    ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={"relative w-full h-full overflow-hidden"}
    >
      {sizes?.map((size) => {
        return (
          <div
            key={size}
            data-size={size}
            className={cx("absolute inset-0 pointer-events-none", {
              "opacity-0 ": fontSize != size,
            })}
            style={{ fontSize: size }}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
}
