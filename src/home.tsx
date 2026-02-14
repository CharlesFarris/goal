import { Hono } from "hono";

export const home = new Hono();

home.get("/home", (c) => {
  return c.json({ message: "home" });
});
