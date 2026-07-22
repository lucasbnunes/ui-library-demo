# @lucasbnunes/ui-library-demo

A publishable React component library — built as a sandbox for learning modern frontend tooling.

## About This Project

This is a personal learning project built to practice building a publishable React component library, modern frontend tooling with Vite + TypeScript and automated npm publishing with Github Actions and Changesets. It's part of my portfolio to demonstrate familiarity with these tools/concepts.

**⚠️ Please note:**

- Not intended for production use
- Not intended as a boilerplate/template
- No guarantees of maintenance or security review
- Use only as reference/inspiration

---

## What's inside

| Path                 | Purpose                                                        |
| -------------------- | -------------------------------------------------------------- |
| `lib/`               | Publishable npm package — components, design tokens, utilities |
| `src/`               | Unit tests, Storybook stories                                  |
| `.storybook/`        | Storybook configuration                                        |
| `.github/workflows/` | CI, lint/format checks, and automated npm releases             |

## Stack

- **React 19** + **TypeScript 6**
- **Vite 8** in library mode for the package, dev server for the demo app
- **Tailwind CSS v4** — `@theme inline` with oklch color tokens and `.dark` class variant
- **Storybook 10** — autodocs, a11y, MCP addon, Playwright-based interaction tests
- **Vitest** — unit tests (jsdom) + Storybook tests (Playwright browser)
- **@base-ui/react** — headless UI primitives
- **CVA** + **clsx** + **tailwind-merge** — variant-driven styling

## Components

| Component | Variants                        | States                         |
| --------- | ------------------------------- | ------------------------------ |
| `Button`  | 3 colors × 3 variants × 3 sizes | loading, disabled, loadingText |
| `Input`   | startIcon, endIcon              | disabled                       |

## Quick start

```bash
npm install
npm run dev          # Demo app at localhost:5173
npm run storybook    # Storybook at localhost:6006
```

## Scripts

| Command                   | What it does                                 |
| ------------------------- | -------------------------------------------- |
| `npm run dev`             | Vite dev server (demo app)                   |
| `npm run build`           | Type-check + build library to `dist/`        |
| `npm run lint`            | ESLint all TS/TSX                            |
| `npm run format`          | Prettier —write                              |
| `npm run test:unit`       | Vitest unit tests (jsdom)                    |
| `npm run test:storybook`  | Vitest Storybook tests (Playwright)          |
| `npm run test:related`    | Vitest related — runs tests for staged files |
| `npm run storybook`       | Storybook dev on :6006                       |
| `npm run build-storybook` | Static Storybook build                       |

## Git hooks (lefthook)

Pre-commit pipeline: format → lint → type-check → related tests.  
Commit messages must follow conventional commits (`type(scope): description`).  
Pre-push: run full build.

## Publishing

Versioning and publishing are managed by Changesets:

```bash
npx changeset        # Create a changeset (select bump type, write summary)
git add .changeset/  # Commit the changeset file with your feature
```

Pushing to `main` triggers CI; on merge of the auto-generated "Version Packages" PR, the package is published to npm.
