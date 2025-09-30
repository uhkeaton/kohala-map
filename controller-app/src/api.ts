type MapState = {
  layers: string[];
};

export async function controlMap(state: MapState) {
  const res = await fetch("http://127.0.0.1:8000/control", {
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
  const res = await fetch("http://127.0.0.1:8000/zoom-in", {
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
  const res = await fetch("http://127.0.0.1:8000/zoom-out", {
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
