import { IconContentCopy } from "./icons";
import { IconButton } from "@mui/material";
import { MouseEventHandler } from "react";

export function ButtonCopyEditedFeatureRow({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="p-2">
      <button
        className="flex gap-2 items-center bg-black/35 hover:bg-white/10 py-2 px-4 rounded-3xl cursor-pointer"
        onClick={onClick}
        aria-label="Close"
      >
        <span className="font-semibold">Copy Result</span>
        <IconContentCopy className="w-5" />
      </button>
    </div>
  );
}

export function ButtonCopyValue({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <IconButton
      onClick={onClick}
      aria-label="Close"
      size="small" // small | medium | large
    >
      <IconContentCopy className="w-6" />
    </IconButton>
  );
}
