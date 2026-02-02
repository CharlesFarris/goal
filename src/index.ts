import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("/", serveStatic({ path: "./public/index.html" }));

app.get("/api/ping", (c) => {
  return c.json({ message: "pong" });
});

export default app;
