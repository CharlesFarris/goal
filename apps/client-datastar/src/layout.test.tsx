import { describe, expect, test } from "bun:test";
import { DATASTAR_CDN_URL, Layout } from "./layout.tsx";

describe("Layout", () => {
  test("renders title, children, and Datastar script", () => {
    const element = Layout({ title: "Test Page", children: <p>Hello</p> });
    const html = element.toString();

    expect(html).toContain("<title>Test Page</title>");
    expect(html).toContain(DATASTAR_CDN_URL);
    expect(html).toContain("<p>Hello</p>");
    expect(html).toContain('lang="en"');
  });
});
