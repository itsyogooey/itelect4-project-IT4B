
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1 }, // retry failed requests once
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/* ✅ NEW */}
      <BrowserRouter>
        <App />
        <ReactQueryDevtools initialIsOpen={false} /> {/* ✅ NEW */}
      </BrowserRouter>
    </QueryClientProvider> {/* ✅ NEW */}
  </StrictMode>
);