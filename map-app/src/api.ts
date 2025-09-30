export async function getLayers() {
    const res = await fetch("http://127.0.0.1:8000/layers");
    return res.json();
  }
  