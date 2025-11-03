import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { internalIpV4 } from "internal-ip"; // <-- named import

export default defineConfig(async () => {
  // Get your LAN IP
  const ip = await internalIpV4();

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      host: true, // allows LAN access
    },
    define: {
      "import.meta.env.VITE_NETWORK": JSON.stringify(ip),
    },
  };
});
