import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { envServer } from "./constant/env.constant";
import { auth } from "./lib/auth.lib";
import { appRouter } from "./routes/register.route";
import { createTRPCContext } from "./trpc/context.trpc";

const app = new Hono();

/**
 * if in development use the logger and cors middlewares for testing and debugging
 */
if (envServer.NODE_ENV === "development") {
  app.use(logger());
  app.use("/*", cors({
    origin: "http://localhost:5173", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }));
};

/**
 * mount the better-auth request handler to handle auth requests
 */
app.use("/api/auth/*", (context) => auth.handler(context.req.raw));

/**
 * mount the trpc procedure call handler to respond to trpc calls
 */
app.use("/api/trpc/*",
  trpcServer({
    router: appRouter,
    endpoint: "/api/trpc",
    createContext(_opts, c) {
      return createTRPCContext({ context: c });
    },
  }),
);

/**
 * routes to serve static files output from frontend vite application
 */
app.use("*", serveStatic({ root: "./public" }));
app.use("*", serveStatic({ path: "./public/index.html" }));

export default app;
