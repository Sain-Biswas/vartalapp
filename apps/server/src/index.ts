import type { Env, ExecutionContext } from "hono";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { env } from "@server/constant/env.constant";
import { auth } from "@server/lib/config.auth";

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

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }
  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default {
  port: env.PORT,
  idleTimeout: 30,
  fetch: (req: Request, server: Env, ctx: ExecutionContext) => {
    // const url = new URL(req.url);

    return app.fetch(req, server, ctx);
  }
};
