import type { Context } from "hono";
import { initTRPC, TRPCError } from "@trpc/server";
import superJSON from "superjson";
import { ZodError } from "zod";
import { env } from "@server/constant/env.constant";
import { prisma } from "@server/lib/client.prisma";
import { auth } from "@server/lib/config.auth";

/**
 * CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow us to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context.
 */
export const createTRPCContext = async (context: Context) => {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers
  });

  return {
    prisma,
    session,
    headers: context.req.raw.headers
  };
};

/**
 * INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer.We also parse ZodErrors so that we can get type safety on the frontend if your procedure fails due to validation errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    };
  }
});

/**
 * ROUTER
 *
 * tRPC function to create new routers and sub-routers in the API.
 */
export const createTRPCRouter = t.router;

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * It helps in simulating network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  /**
   * Artificial delay in development environments.
   */
  if (env.NODE_ENV === "development") {
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();

  console.log(`[TRPC] ${path} took ${end - start}ms for execution.`);

  return result;
});

/**
 * PUBLIC PROCEDURE
 *
 * This is the base piece you use to build new quires and mutations on tRPC API. It does not guarantee that a user querying is authorized, but can still access user session data if they are logged in.
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

/**
 * PROTECTED PROCEDURE
 *
 * Use when a query or a mutation is ONLY available/ accessible to logged in users. It verifies if the session is valid and guarantees 'ctx.session.user' is not null.
 */
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "" });
    }

    return next({
      ctx: {
        session: ctx.session.session,
        user: ctx.session.user
      }
    });
  });
