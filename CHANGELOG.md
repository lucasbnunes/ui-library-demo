# @lucasbnunes/ui-library-demo

## 0.2.1

### Patch Changes

- 2a390cb: Fix "Calling `require` for `react` in an environment that doesn't expose the `require` function" at runtime in browsers. Convert CJS `require("react")` calls from bundled dependencies (e.g. `@base-ui/react` via `use-sync-external-store`) into ESM imports with rolldown's `esmExternalRequirePlugin`.

## 0.2.0

### Minor Changes

- b4b54c1: Select component

## 0.1.0

### Minor Changes

- f5553a9: Input component
