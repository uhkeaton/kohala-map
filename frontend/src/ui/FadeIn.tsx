import React, { useEffect, useState } from "react";
import cx from "classnames";

interface FadeInProps {
  id: string | null | undefined; // the changing value
  children: React.ReactNode;
}

export function FadeIn({ id, children }: FadeInProps) {
  const [fadedId, setFadedId] = useState<string | null | undefined>(id);

  useEffect(() => {
    setFadedId(id);
  }, [id]);

  const fade = id === fadedId;

  return (
    <div
      className={cx("w-full h-full", {
        "transition-opacity duration-1000 opacity-100": fade,
        "opacity-0": !fade,
      })}
    >
      {children}
    </div>
  );
}
