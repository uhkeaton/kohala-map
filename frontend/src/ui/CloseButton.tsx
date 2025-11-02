import { IconButton } from "@mui/material";
import type { MouseEventHandler } from "react";

export function CloseButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <IconButton
      onClick={onClick}
      aria-label="Close"
      size="large" // small | medium | large
    >
      <span className="material-symbols-outlined">close</span>
    </IconButton>
  );
}
