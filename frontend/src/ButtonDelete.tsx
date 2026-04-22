import { IconButton } from "@mui/material";
import { MouseEventHandler } from "react";
import { IconDelete } from "./icons";

export function ButtonDelete({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <IconButton
      className="group"
      onClick={onClick}
      aria-label="Delete"
      size="small" // small | medium | large
    >
      <IconDelete className="w-6" />
    </IconButton>
  );
}
