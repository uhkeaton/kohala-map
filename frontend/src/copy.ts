export const copyRowSuccessMessage =
  "Copied row to clipboard! Paste the new row in Google Sheets.";

export async function copyToClipboard(text: string): Promise<boolean> {
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
