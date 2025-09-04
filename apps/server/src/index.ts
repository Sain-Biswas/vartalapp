import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { envServer } from "./constant/env.constant";
import { auth } from "./lib/auth.lib";

const app = new Hono();

if (envServer.NODE_ENV === "development") app.use(cors());

/**
 * mount the better-auth request handler to handle auth requests
 */
app.use("/api/auth/**", (context) => auth.handler(context.req.raw));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

/**
 * routes to serve static files output from frontend vite application
 */
app.use("*", serveStatic({ root: "./public" }));
app.use("*", serveStatic({ path: "./public/index.html" }));

export default app;
