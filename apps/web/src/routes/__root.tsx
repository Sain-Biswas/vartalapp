import type { QueryClient } from "@tanstack/react-query";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

interface IRouteRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<IRouteRouterContext>()({
  component: () => (
    <>
      <Outlet />
      {import.meta.env.DEV && (
        <TanStackDevtools
          config={{
            position: "bottom-right"
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />
            },
            {
              name: "Tanstack Query",
              render: <ReactQueryDevtoolsPanel />
            }
          ]}
        />
      )}
    </>
  )
});
