import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { authRouter } from "@server/routes/auth.route";
import { homeRouter } from "@server/routes/home.route";
import { createTRPCRouter } from "./index.trpc";

/**
 * APP ROUTER
 *
 * This is the primary tRPC router indexing all other routes.
 */
export const appRouter = createTRPCRouter({
  home: homeRouter,
  auth: authRouter
});

/**
 * TYPE APP ROUTER
 *
 * Types of the entire tRPC backend API.
 */
export type TAppRouter = typeof appRouter;

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type TRouterInputs = inferRouterInputs<TAppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type TRouterOutputs = inferRouterOutputs<TAppRouter>;
