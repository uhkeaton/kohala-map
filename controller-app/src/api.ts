type MapState = {
  layers: string[];
};

// get the VITE_API_BASE_URL from .env, default to localhost
const API_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function controlMap(state: MapState) {
  const res = await fetch(`${API_URL}/control`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}

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
