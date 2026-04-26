/** @jsxImportSource hono/jsx */
import { describe, expect, test } from "bun:test";
import { DATASTAR_SCRIPT_PATH, Layout } from "./layout.tsx";

describe("Layout", () => {
  test("renders title, children, and Datastar script", () => {
    const element = Layout({ title: "Test Page", children: <p>Hello</p> });
    const html = element.toString();

    expect(html).toContain('lang="en"');
    expect(html).toContain('<meta charset="utf-8"/>');
    expect(html).toContain('content="width=device-width, initial-scale=1"');
    expect(html).toContain("<title>Test Page</title>");
    expect(html).toContain(DATASTAR_SCRIPT_PATH);
    expect(html).toContain("<p>Hello</p>");
  });
});
