import { createTRPCRouter, protectedProcedure } from "@server/trpc/index.trpc";

export const authRouter = createTRPCRouter({
  getSession: protectedProcedure.query(({ ctx }) => ({
    session: ctx.session,
    user: ctx.user
  }))
});
