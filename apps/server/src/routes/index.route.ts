import { publicProcedure, router } from "@/trpc/root.trpc";

export const homeRouter = router({
  healthCheck: publicProcedure.query(() => {
    return {
      message: "The server is up and running.",
      success: true,
    };
  }),
});
