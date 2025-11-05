// export const WS_URL = "http://localhost:54410/ws";
export const WS_URL = "https://sockets-api.georgekwilliamson.workers.dev/ws";
// export const WS_URL = "ws://" + import.meta.env.VITE_NETWORK + ":8000/socket";
export const API_URL = "http://" + import.meta.env.VITE_NETWORK + ":8000";

export async function zoomIn() {
  const res = await fetch(`${API_URL}/zoom-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}

export async function zoomOut() {
  const res = await fetch(`${API_URL}/zoom-out`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}
