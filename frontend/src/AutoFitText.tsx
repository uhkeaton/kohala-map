import { useLayoutEffect, useRef, useState } from "react";

type AutoFitTextProps = {
  children: React.ReactNode;
  min?: number;
  max?: number;
  className?: string;
};

export function AutoFitText({
  children,
  min = 8,
  max = 24,
  className,
}: AutoFitTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [fontSize, setFontSize] = useState(max);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const el = textRef.current;
    if (!container || !el) return;

    const fits = (size: number) => {
      el.style.fontSize = `${size}px`;

      return (
        el.scrollWidth <= container.clientWidth &&
        el.scrollHeight <= container.clientHeight
      );
    };

    const compute = () => {
      let low = min;
      let high = max;
      let best = min;

      while (low <= high) {
        const mid = (low + high) >> 1;
        if (fits(mid)) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      setFontSize(best);
    };

    compute();

    const ro = new ResizeObserver(compute);
    ro.observe(container);

    return () => ro.disconnect();
  }, [children, min, max]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className ?? ""}`}>
      <div
        ref={textRef}
        style={{
          fontSize,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
