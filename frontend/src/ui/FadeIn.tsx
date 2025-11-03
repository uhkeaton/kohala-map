import React, { useEffect, useState } from "react";

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
      className={`${
        fade ? "transition-opacity duration-1000 opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
