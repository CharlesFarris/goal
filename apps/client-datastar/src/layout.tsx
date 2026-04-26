import type { Child } from "hono/jsx";

/** Props for the {@link Layout} component. */
export type LayoutProps = Readonly<{
  /** The text content of the page `<title>` element. */
  title: string;
  /** Page body content rendered inside `<body>`. */
  children?: Child;
}>;

/** Local path for the Datastar script. */
export const DATASTAR_SCRIPT_PATH: string = "/scripts/datastar.js";

/**
 * Root HTML shell component.
 *
 * Renders an `<html>` document shell with a `<head>` containing the UTF-8
 * charset declaration, a viewport meta tag, the page title, the Datastar
 * script, and a `<body>` containing the provided children.
 */
export function Layout(props: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{props.title}</title>
        <script type="module" src={DATASTAR_SCRIPT_PATH} />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
