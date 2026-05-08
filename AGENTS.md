# Repository Instructions

## Overview

- This is a Bun-based TypeScript workspace with apps under `apps/*`.
- The current application is `apps/client-datastar`, built with Hono.
- Shared TypeScript settings live in `tsconfig.base.json`.

## Setup

```sh
bun install
```

## Common Commands

Run these from the repository root unless a command says otherwise.

```sh
bun run biome:check
bun run biome:fix
bun run typecheck
bun run test:all
```

To start the current app:

```sh
cd apps/client-datastar
bun run dev
```

## Code Style

- Use TypeScript and keep local Bun imports explicit, including `.ts` and `.tsx` extensions.
- Follow the strict shared TypeScript rules in `tsconfig.base.json`.
- Use 2-space indentation, UTF-8, LF line endings, and a final newline.
- Let Prettier handle formatting and ESLint handle linting.
- Keep Markdown trailing whitespace untouched only when it is intentional.

## Project Notes

- `node_modules/` is generated output and should not be committed.
