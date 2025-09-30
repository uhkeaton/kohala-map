import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ControllerApp } from "./ControllerApp.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ControllerApp />
    </QueryClientProvider>
  </StrictMode>
);
