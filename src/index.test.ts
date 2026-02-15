import { describe, test, expect } from "bun:test";
import { app } from "./index.ts";

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

  test("/home returns HTML page", async () => {
    const response = await app.request("/home");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
  });
});
