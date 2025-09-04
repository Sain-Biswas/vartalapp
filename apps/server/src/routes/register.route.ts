import { router } from "@/trpc/root.trpc";
import { homeRouter } from "./index.route";

export const appRouter = router({
  home: homeRouter,
});

export type TRPCAppRouter = typeof appRouter;
