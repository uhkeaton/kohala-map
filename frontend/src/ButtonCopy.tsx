import { IconButton } from "@mui/material";
import type { MouseEventHandler } from "react";
import { IconContentCopy } from "./icons";

export function ButtonCopy({
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
      <IconContentCopy className="w-8" />
    </IconButton>
  );
}
