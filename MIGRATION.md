# TypeScript migration

The editor is now authored as TypeScript modules and bundled from `src/index.html`
with Bun's standalone HTML bundler. The production artifact is
`out/index.html`; scripts, styles, modal markup, and audio are embedded in that
single file.

## Current boundary

- `build.ts`, `watch.ts`, and runtime configuration parsing are strict
  TypeScript and checked by `bun run typecheck`.
- Converted legacy editor modules are compiled as TypeScript, but semantic
  checking is temporarily disabled in `tsconfig.json`. This preserves the
  existing dynamic custom-element model while migration work proceeds.
- Browser smoke tests cover startup, element creation, serialization,
  undo/redo, modal embedding, and exam-mode configuration.

## Follow-up sequence

1. Introduce shared algorithm JSON types and validation at import boundaries.
2. Type the graphical-element base classes and event history, then enable strict
   checking for `PartieEditeur/EvenementEdition`.
3. Type the workspace and serializable node hierarchy.
4. Replace dynamically decorated DOM nodes with custom interfaces in the
   library and dictionary components.
5. Migrate anomaly detectors, then remove `noCheck` from `tsconfig.json`.

Run `bun run check` before merging. Use `bun run build:watch` for local editor
development. Backend development mode also starts this watcher.
