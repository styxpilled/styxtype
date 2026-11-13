# styxtype

A collection of open source and free fonts, with template previews.

## Requirements

- Node.js and pnpm
- uv (font pipeline, Python 3.13)

## Setup

```sh
pnpm install
pnpm fonts
pnpm dev
```

The font files in `fonts/` are not in git. Restore them from the backup before you run `pnpm fonts`.

## Add a font

1. Put the font files (TTF or OTF) in `fonts/<slug>/`.
2. Add `catalog/<slug>.toml`. See `catalog/README.md` for the fields.
3. Run `pnpm fonts`.

## Font pipeline

`pnpm fonts` reads the catalog and the font files. It writes:

- `src/lib/generated/index.json`: the font list, bundled into the app.
- `static/fonts/`: web fonts, subsets, metadata, glyph data, filters and name previews.

Both are not in git. Run the pipeline again when a font or a catalog file changes.

## Deploy

```sh
pnpm run deploy
```

This builds the site and uploads `build/` to Cloudflare Pages with wrangler. Cloudflare does not
build. Log in first with `pnpm exec wrangler login`.
