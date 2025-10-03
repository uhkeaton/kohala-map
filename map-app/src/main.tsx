import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MapApp } from "./MapApp.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Home } from "./Home.tsx";
import { Controller } from "./Controller.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/map" element={<MapApp />} />
          <Route path="/controller" element={<Controller />} />
          {/* Redirect all others to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
