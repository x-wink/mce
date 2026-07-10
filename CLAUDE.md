# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**modern-idoc** is a TypeScript library that defines an intermediate document format (IDoc) for modern codec libraries. It provides a structured type system and normalization utilities for representing documents with rich styling, text, backgrounds, shapes, effects, and media (video/audio).

The library is published as an npm package with multiple export formats (ESM, CJS, UMD) and is designed to be consumed by downstream codec libraries like modern-pdf, modern-openxml, modern-canvas, and modern-idoc-svg.

## Downstream Consumers (IMPORTANT)

The following consumer repos live locally as siblings under `../` and **must be adapted whenever this project's types/structure change** (e.g. adding new fields to `Element`/`Style`/`Fill`):

- `../modern-canvas` — canvas/WebGL renderer
- `../modern-openxml` — OOXML (PPTX/DOCX) codec
- `../modern-pdf` — PDF codec
- `../modern-idoc-svg` — SVG renderer
- `../modern-text` — text layout/rendering (sync whenever text-related types change)

Note: these repos consume the **published** `modern-idoc` (via node_modules / pnpm, not a workspace symlink). So new types added here are not visible to them until `modern-idoc` is rebuilt and their dependency is updated. When making a structural change, implement the corresponding parse/stringify/render support in each consumer.

## Build & Development Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev              # Start docs site (Vite dev server)
pnpm start            # Run src/index.ts directly with esno

# Build
pnpm build            # Build library (Vite UMD + unbuild for CJS/ESM)
pnpm build:schema     # Generate JSON schema from NormalizedDocument type

# Testing & Quality
pnpm test             # Run vitest (watch mode by default)
pnpm test --run       # Run tests once
pnpm lint             # Run ESLint on src/
pnpm typecheck        # Run TypeScript type checking

# Release
pnpm version          # Bump version and update CHANGELOG
pnpm release          # Publish release (bumpp + git push + tag)
```

## Architecture

### Core Concepts

The library is built around a **normalization pattern**: user-facing types are flexible and optional, while normalized types enforce required fields and consistent structure. This separation allows consumers to provide partial data that gets normalized before use.

**Key types:**
- `Element<T>` / `NormalizedElement<T>` — Base unit representing a document node with optional style, text, background, shape, foreground, video, audio, and effects
- `Document` / `NormalizedDocument` — Root element that extends Element with optional fonts
- `Style` / `NormalizedStyle` — Composite style system combining element, layout, text, transform, and other style types

### Module Organization

The `src/` directory is organized by feature domain, each with its own normalization logic:

- **style/** — Comprehensive styling system (element, layout, text, transform, highlight, list styles)
- **fill/** — Fill types (solid color, gradient, image, preset patterns)
- **text/** — Text content and formatting
- **background/** — Background styling and normalization
- **shape/** — Shape definitions and normalization
- **foreground/** — Foreground styling
- **shadow/** — Shadow effects
- **outline/** — Outline styling
- **effect/** — Visual effects (opacity, blend modes, etc.)
- **audio/** — Audio element support
- **video/** — Video element support
- **color/** — Color utilities
- **decorators/** — TypeScript decorators
- **utils/** — Shared utilities including EventEmitter, Observable, Reactivable, and object helpers

### Normalization Pattern

Each feature module exports:
1. User-facing type (e.g., `Background`)
2. Normalized type (e.g., `NormalizedBackground`)
3. `normalize*` function that converts user type to normalized type

Example from `element.ts`:
```typescript
export function normalizeElement<T = Meta>(element: Element<T>): NormalizedElement<T> {
  return clearUndef({
    id: element.id ?? idGenerator(),
    style: isNone(element.style) ? undefined : normalizeStyle(element.style),
    // ... normalize other properties
    children: element.children?.map(child => normalizeElement(child)),
  })
}
```

The `normalizeDocument()` function is the entry point that normalizes the entire document tree.

### Type System Patterns

- `WithNone<T>` — Type union allowing `T | undefined | null | 'none'` for optional properties
- `WithStyleNone<T>` — Type union allowing `T | 'none'` for style properties
- `Toggleable` — Interface with `enabled: boolean` for optional features
- `Meta` — Generic type parameter for custom metadata on elements

### Build Output

- **Vite** builds UMD format for browser consumption
- **unbuild** generates ESM and CJS formats for Node.js
- **TypeScript** generates `.d.ts` files for type definitions
- **JSON Schema** is generated from `NormalizedDocument` type for validation

## Testing

Tests are in `test/` using Vitest. Currently minimal (placeholder test), but the pattern is established for adding comprehensive tests.

## Linting & Formatting

Uses `@antfu/eslint-config` with custom rule overrides in `eslint.config.js`. The config is set to library mode with specific rules disabled for this codebase (consistent-list-newline, unsafe-declaration-merging, etc.).

Pre-commit hooks via `simple-git-hooks` run `lint-staged` to lint staged files.

## Documentation Site

The `docs/` directory contains a Vite-based documentation site with examples for different use cases (doc.ts, pdf.ts, pptx.ts, text.ts, reactive.ts). Run `pnpm dev` to view it locally.

## Key Dependencies

- **colord** — Color manipulation
- **nanoid** — ID generation for elements
- **unbuild** — Build tool for generating multiple formats
- **vitest** — Test runner
- **@antfu/eslint-config** — ESLint configuration preset
