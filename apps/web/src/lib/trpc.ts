import type {
  TAppRouter,
  TRouterInputs,
  TRouterOutputs
} from "@server/types/trpc.type";
import {
  createTRPCClient,
  httpBatchStreamLink,
  loggerLink
} from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import superJSON from "superjson";
import { getQueryClient } from "./query-client";

const queryClient = getQueryClient();

const trpcClient = createTRPCClient<TAppRouter>({
  links: [
    httpBatchStreamLink({
      transformer: superJSON,
      url: "/api/trpc",
      headers: () => {
        const headers = new Headers();
        headers.set("x-trpc-source", "react-client");
        return headers;
      }
    }),
    loggerLink({
      enabled: (op) =>
        import.meta.env.DEV ||
        (op.direction === "down" && op.result instanceof Error)
    })
  ]
});

export const trpc = createTRPCOptionsProxy<TAppRouter>({
  client: trpcClient,
  queryClient
});

export type { TRouterInputs, TRouterOutputs };
