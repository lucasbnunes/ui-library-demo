---
"@lucasbnunes/ui-library-demo": patch
---

Fix "Calling `require` for `react` in an environment that doesn't expose the `require` function" at runtime in browsers. Convert CJS `require("react")` calls from bundled dependencies (e.g. `@base-ui/react` via `use-sync-external-store`) into ESM imports with rolldown's `esmExternalRequirePlugin`.
