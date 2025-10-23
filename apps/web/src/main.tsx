import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "@web/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { getQueryClient } from "@web/lib/query-client";
import { routeTree } from "@web/routeTree.gen";
import { ThemeProvider } from "./integrations/theme/provider";

const queryClient = getQueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="ui-theme"
        >
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
