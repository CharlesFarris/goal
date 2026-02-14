import { Hono } from "hono";

export const home = new Hono();

home.get("/home", (c) => {
  return c.html(
    <html>
      <head>
        <title>Goal</title>
      </head>
      <body>
        <h1>Home</h1>
      </body>
    </html>,
  );
});
