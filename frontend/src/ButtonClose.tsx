import { IconButton } from "@mui/material";
import type { MouseEventHandler } from "react";
import { IconClose } from "./icons";

export function ButtonClose({
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
      <IconClose className="w-8" />
    </IconButton>
  );
}
