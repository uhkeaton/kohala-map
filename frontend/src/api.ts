import toast from "react-hot-toast";
import { parseSheet } from "./spreadsheet/spreadsheet";

// export const WS_URL = "http://localhost:54410/ws";
export const WS_URL = "https://sockets-api.georgekwilliamson.workers.dev/ws";
// export const WS_URL = "ws://" + import.meta.env.VITE_NETWORK + ":8000/socket";
// export const API_URL = "http://" + import.meta.env.VITE_NETWORK + ":8000";

export async function fetchSpreadsheet(id: string) {
  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/${id}/export?format=tsv&gid=0`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    toast.error("Spreadsheet Not Found");
    throw new Error(`Error: ${res.status}`);
  }

  const { mapConfig, features } = parseSheet(await res.text());

  return {
    mapConfig,
    features,
  };
}
