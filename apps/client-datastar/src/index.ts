import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { home } from "./home.tsx";
import { ping } from "./ping.ts";

export const app = new Hono();

const portEnv = "PORT";
const port = Bun.env[portEnv] ? Bun.env[portEnv] : 3000;

app.use("/scripts/*", serveStatic({ root: "./public" }));
app.route("/api", ping);
app.route("/", home);
app.get("/", (c) => c.redirect("/home"));

export default {
  port,
  fetch: app.fetch,
};
