import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { GlobalProvider } from "./useGlobalProvider.tsx";
import { Toaster } from "react-hot-toast";
import {
  PageWelcome,
  PageWelcomeConnectController,
  PageWelcomeConnectMap,
  PageWelcomeNavigate,
} from "./PageWelcome.tsx";
import { PageMap } from "./PageMap.tsx";
import { PageController } from "./PageController.tsx";

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
    />
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <Routes>
            <Route path="/welcome" element={<PageWelcome />}>
              <Route index element={<PageWelcomeNavigate />} />
              <Route path="/welcome/map" element={<PageWelcomeConnectMap />} />
              <Route
                path="/welcome/controller"
                element={<PageWelcomeConnectController />}
              />
            </Route>
            <Route path="/map" element={<PageMap mode={"map"} />} />
            <Route path="/editor" element={<PageMap mode={"editor"} />} />
            <Route path="/controller" element={<PageController />} />
            {/* Fallback to welcome page */}
            <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
        </GlobalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
