import { homeRouter } from "@server/routes/home.route";
import { createTRPCRouter } from "./index.trpc";

/**
 * APP ROUTER
 *
 * This is the primary tRPC router indexing all other routes.
 */
export const appRouter = createTRPCRouter({
  home: homeRouter
});

/**
 * TYPE APP ROUTER
 *
 * Types of the entire tRPC backend API.
 */
export type TAppRouter = typeof appRouter;
