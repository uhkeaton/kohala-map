import React, { useEffect, useRef, useState } from "react";

interface AutoScaleProps {
  children: (scale: number) => React.ReactNode;
}

export function AutoScale({ children }: AutoScaleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const container = containerRef.current;
    const measureEl = measureRef.current;
    if (!container || !measureEl) return;

    const resizeObserver = new ResizeObserver(() => {
      const scaleFactor = Math.min(
        container.offsetWidth / measureEl.offsetWidth,
        container.offsetHeight / measureEl.offsetHeight
      );
      setScale(scaleFactor);
    });

    resizeObserver.observe(container);
    resizeObserver.observe(measureEl);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      {/* Invisible copy for measurement */}
      <div
        ref={measureRef}
        style={{ visibility: "hidden", position: "absolute", top: 0, left: 0 }}
      >
        {children(1)} {/* render at normal scale for measurement */}
      </div>

      {/* Visible scaled copy */}
      <div style={{ width: "100%", height: "100%" }}>
        {children(scale)} {/* render with actual scale */}
      </div>
    </div>
  );
}
