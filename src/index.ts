import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { home } from "./home.tsx";
import { ping } from "./ping.ts";

export const app = new Hono();

app.use("/", serveStatic({ path: "./public/index.html" }));

app.route("/api", ping);
app.route("/", home);

export default {
  port: 3000,
  fetch: app.fetch,
};
