import toast from "react-hot-toast";
import { IconContentCopy } from "./icons";
import { IconButton } from "@mui/material";
import { useGlobal } from "./useGlobal";
import { featureToRow } from "./data/spreadsheet";

export function ButtonCopyEditedFeatureRow() {
  const { editedFeature, headers } = useGlobal();

  const handleClick = () => {
    const row = featureToRow(editedFeature, headers);
    copyToClipboard(row);
    toast.success(
      "Copied row to clipboard! Paste the new row in Google Sheets.",
    );
  };

  return (
    <div className="p-2">
      <button
        className="flex gap-2 items-center bg-black/35 hover:bg-white/10 py-2 px-4 rounded-3xl cursor-pointer"
        onClick={handleClick}
        aria-label="Close"
      >
        <span className="font-semibold">Copy Row</span>
        <IconContentCopy className="w-5" />
      </button>
    </div>
  );
}

export function ButtonCopyValue({ value }: { value: string }) {
  return (
    <IconButton
      onClick={() => {
        copyToClipboard(value);
        toast.success(`Copied value to clipboard: ${value}`);
      }}
      aria-label="Close"
      size="small" // small | medium | large
    >
      <IconContentCopy className="w-6" />
    </IconButton>
  );
}

async function copyToClipboard(text: string): Promise<boolean> {
  // Modern API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to fallback
    }
  }

  // Fallback using a hidden textarea
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;

    // Prevent scrolling to bottom
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textarea);

    return success;
  } catch {
    return false;
  }
}
