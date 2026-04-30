import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(async () => {
  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 1758,
    },
  };
});
