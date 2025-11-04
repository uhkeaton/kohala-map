import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { internalIpV4 } from "internal-ip";

export default defineConfig(async ({ command }) => {
  const isDev = command === "serve"; // "serve" = npm run dev, "build" = npm run build
  const ip = isDev ? await internalIpV4() : null;

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      host: true, // allows LAN access
    },
    define: {
      "import.meta.env.VITE_NETWORK": JSON.stringify(isDev ? ip : ""),
    },
  };
});
