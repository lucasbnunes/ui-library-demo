# AGENTS.md

## Project overview

React component library (publishable npm package) + demo app. Not a monorepo.

- `lib/` — publishable library (`lib/main.ts` entry, built via Vite library mode)
- `src/` — demo app, unit tests, Storybook stories

## Key commands

```bash
npm run dev              # Vite dev server (demo app)
npm run build            # tsc -b ./tsconfig.lib.json && vite build (library)
npm run lint             # eslint (all ts/tsx)
npm run format           # prettier --write
npm run test:unit        # vitest unit tests (jsdom)
npm run test:storybook   # vitest Storybook tests (Playwright browser)
npm run test:related     # vitest related (for staged files)
npm run storybook        # Storybook dev on :6006
npm run build-storybook  # Storybook static build
```

## Verification order (lefthook enforces this)

1. `npm run format` (prettier)
2. `npm run lint -- --fix` (eslint with auto-fix)
3. `tsc --noEmit -p ./tsconfig.lib.json && tsc --noEmit -p tsconfig.node.json`
4. `npm run test:related` (only tests related to changed files)
5. `npm run build` (pre-push gate)

## TypeScript

Three tsconfig files, all referenced from root `tsconfig.json`:

- `tsconfig.app.json` — `src/` (demo app), targets ES2023, JSX react-jsx, noEmit
- `tsconfig.lib.json` — `lib/` (publishable library), extends app config
- `tsconfig.node.json` — `vite.config.ts` only

Path alias: `@lib/*` → `./lib/*` (configured in both vite and tsconfig).

## Styling

Tailwind CSS v4. Design tokens are CSS custom properties in `lib/index.css` (oklch colors). Theme uses `@theme inline` directive. Dark mode via `.dark` class (`@custom-variant dark`).

Use `cn()` from `lib/utils/cn.ts` (clsx + tailwind-merge) for class merging.

## Components

- `lib/components/` — library components (currently empty, building new ones here)
- `src/stories/Card.tsx` — example component with Storybook stories
- Dependencies: `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`

## ESLint rules

- `@typescript-eslint/consistent-type-imports` enforced with `inline-type-imports` style
- Import type syntax: `import { type Foo } from "..."` (not `import type { Foo }`)

## Commits

Conventional commits enforced via commitlint + lefthook commit-msg hook. Format: `type(scope): description`.
