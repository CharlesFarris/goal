import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { env } from "./env.ts";
import { home } from "./home.tsx";
import { logger } from "./logger.ts";
import { ping } from "./ping.ts";

export const app = new Hono();

app.use("/scripts/*", serveStatic({ root: "./public" }));
app.route("/api", ping);
app.route("/", home);
app.get("/", (c) => c.redirect("/home"));

logger.info("🔷 Application starting");

export default {
  port: env.PORT,
  fetch: app.fetch,
};
