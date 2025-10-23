import type { Env, ExecutionContext } from "hono";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { env } from "@server/constant/env.constant";
import { auth } from "@server/lib/config.auth";
import { engine } from "@server/lib/server.socket";
import { createTRPCContext } from "@server/trpc/index.trpc";
import { appRouter } from "@server/trpc/router.trpc";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

if (env.NODE_ENV === "development") {
  app.use(logger());
  app.use(
    "*",
    cors({
      origin: "http://localhost:5173",
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true
    })
  );
}

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.use("/api/trpc/*", (ctx) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: ctx.req.raw,
    router: appRouter,
    createContext: () => createTRPCContext(ctx)
  });
});

app.use("/favicon.ico", serveStatic({ path: "./public/logo.svg" }));
app.use("*", serveStatic({ root: "./public" }));
app.use("*", serveStatic({ path: "./public/index.html" }));

const { websocket } = engine.handler();

export default {
  port: env.PORT,
  idleTimeout: 30,
  fetch: (req: Request, server: Env, ctx: ExecutionContext) => {
    const url = new URL(req.url);

    if (url.pathname === "/socket.io/") {
      return engine.handleRequest(req, server);
    } else {
      return app.fetch(req, server, ctx);
    }
  },
  websocket
};
