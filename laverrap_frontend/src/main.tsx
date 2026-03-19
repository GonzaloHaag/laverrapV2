import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router.tsx";
import { axiosInterceptor } from "@/interceptors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
axiosInterceptor();
const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 60 * 1000 } } }); /** 1 hora */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
