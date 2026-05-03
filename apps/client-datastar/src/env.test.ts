import { describe, expect, test } from "bun:test";
import { envSchema } from "./env.ts";

describe("envSchema", () => {
  describe("PORT", () => {
    test("defaults to 3000 when not provided", () => {
      const result = envSchema.parse({});
      expect(result.PORT).toBe(3000);
    });

    test("coerces a string to a number", () => {
      const result = envSchema.parse({ PORT: "8080" });
      expect(result.PORT).toBe(8080);
    });

    test("accepts a number directly", () => {
      const result = envSchema.parse({ PORT: 4000 });
      expect(result.PORT).toBe(4000);
    });

    test("rejects a non-numeric string", () => {
      expect(() => envSchema.parse({ PORT: "not-a-port" })).toThrow();
    });
  });

  describe("SEQ_API_KEY", () => {
    test("is omitted when not provided", () => {
      const result = envSchema.parse({});
      expect(result.SEQ_API_KEY).toBeUndefined();
    });

    test("accepts a string value", () => {
      const result = envSchema.parse({ SEQ_API_KEY: "my-api-key" });
      expect(result.SEQ_API_KEY).toBe("my-api-key");
    });
  });

  describe("SEQ_SERVER_URL", () => {
    test("is omitted when not provided", () => {
      const result = envSchema.parse({});
      expect(result.SEQ_SERVER_URL).toBeUndefined();
    });

    test("accepts a valid URL", () => {
      const result = envSchema.parse({
        SEQ_SERVER_URL: "https://seq.example.com",
      });
      expect(result.SEQ_SERVER_URL).toBe("https://seq.example.com");
    });

    test("rejects an invalid URL", () => {
      expect(() => envSchema.parse({ SEQ_SERVER_URL: "not-a-url" })).toThrow();
    });
  });

  describe("readonly", () => {
    test("parsed result is frozen", () => {
      const result = envSchema.parse({});
      expect(Object.isFrozen(result)).toBe(true);
    });
  });
});
