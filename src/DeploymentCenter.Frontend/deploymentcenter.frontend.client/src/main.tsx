import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {NamespaceProvider } from "./shared/contexts/NamespaceContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NamespaceProvider>
        <App />
      </NamespaceProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
