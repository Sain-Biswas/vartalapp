import { homeGreeting } from "@repo/validators";
import { createTRPCRouter, publicProcedure } from "@server/trpc/index.trpc";

export const homeRouter = createTRPCRouter({
  greeting: publicProcedure.input(homeGreeting).query(({ input }) => {
    return {
      greeting: `Hello ${input.name}`
    };
  }),

  isWorking: publicProcedure.query(() => {
    return {
      message: "The server is working."
    };
  })
});
