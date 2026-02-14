import { describe, test, expect } from "bun:test";
import { app } from "./index.ts";

describe("GET /api", async () => {
  test("/ping", async () => {
    const response = await app.request("/api/ping");
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      message: "pong",
    });
  });
});
