import { describe, expect, test } from "bun:test";
import { app } from "./index.ts";
import { DATASTAR_SCRIPT_PATH } from "./layout.tsx";

describe("GET /api", () => {
  test("/ping", async () => {
    const response = await app.request("/api/ping");
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      message: "pong",
    });
  });
});

describe("Home route", () => {
  test("/ redirects to /home", async () => {
    const response = await app.request("/");
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe("/home");
  });

  test("/home returns HTML page with Datastar wiring", async () => {
    const response = await app.request("/home");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");

    const html = await response.text();
    expect(html).toContain(DATASTAR_SCRIPT_PATH);
    expect(html).toContain('data-on:click="@get(&#39;/home/hal&#39;)"');
    expect(html).toContain('<div id="hal">Waiting for an order...</div>');
  });

  test("/home/hal returns patchable HAL fragment", async () => {
    const response = await app.request("/home/hal");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");

    const html = await response.text();
    expect(html).toContain('<div id="hal">');
    expect(html).toContain(
      "I&#39;m sorry, Dave. I&#39;m afraid I can&#39;t do that.",
    );
  });
});
