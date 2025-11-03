import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Controller } from "./controller/Controller.tsx";
import { GlobalProvider } from "./global/useGlobalProvider.tsx";
import { Toaster } from "react-hot-toast";
import { Map } from "./map/Map.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster
      toastOptions={{
        className: "",
        style: {
          // dark mode
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }}
      // position="bottom-center"
    />
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <Routes>
            <Route index path="/" element={<Map />} />
            <Route path="/controller" element={<Controller />} />
            {/* <Route path="/map" element={<MapApp />} /> */}
            {/* <Route path="/scan" element={<Scan />} /> */}
            {/* Redirect all others to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </GlobalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
