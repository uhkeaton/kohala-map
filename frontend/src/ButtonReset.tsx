import { IconButton } from "@mui/material";
import { MouseEventHandler } from "react";
import { IconSettingsBackupRestore } from "./icons";

export function ButtonReset({
  onClick,
  disabled,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
}) {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      aria-label="Close"
      size="small" // small | medium | large
    >
      <IconSettingsBackupRestore className="w-6" />
    </IconButton>
  );
}
