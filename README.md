<p align="center">
  <img alt="sesamy" src=".github/assets/contentfultree.png"/>
</p>

# @foomo/contentfultree

A React component that displays a navigable tree of Contentful entries and their references inside a [Contentful App](https://www.contentful.com/developers/docs/extensibility/app-framework/).

## Features

- Recursively loads and displays entry hierarchies from Contentful
- Expand/collapse child nodes on demand
- Click-to-edit opens entries in a slide-in panel
- Publishing status indicators (draft, changed, published)
- Configurable icon registry with built-in SVG icons
- Multi-locale support

## Installation

```bash
pnpm add @foomo/contentfultree
```

### Peer dependencies

| Package | Version |
|---------|---------|
| `react` | >= 18 |
| `@contentful/app-sdk` | >= 4 |
| `contentful-management` | >= 12 |

### Tailwind CSS setup

This library uses [Tailwind CSS](https://tailwindcss.com/) utility classes for styling. It does **not** ship its own CSS — the consumer's Tailwind build generates the styles.

Add the `@source` directive to your CSS entry point so Tailwind scans the library's output:

```css
@import "tailwindcss";
@source "../node_modules/@foomo/contentfultree/dist";
```

## Usage

```tsx
import { ContentTree } from '@foomo/contentfultree'

const ContentTreePage = ({ sdkInstance, cma }) => (
  <ContentTree
    sdkInstance={sdkInstance}
    cma={cma}
    rootType="siteRoot"
    nodeContentTypes={['nodes', 'homepages']}
    titleFields={['name', 'title']}
    locales={['de', 'fr', 'en']}
    iconRegistry={{
      siteRoot: 'WORLD',
      contentPage: 'PAGE',
      frontendApp: 'APP',
      shopCategory: 'CART',
      folder: 'FOLDER',
      shortcut: 'SHORTCUT',
      shopBrands: 'LOVE',
    }}
  />
)
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sdkInstance` | `PageAppSDK` | Yes | Contentful App SDK instance |
| `cma` | `PlainClientAPI` | Yes | Contentful Management API client |
| `rootType` | `string` | Yes | Content type ID of the root entries |
| `nodeContentTypes` | `string[]` | Yes | Field names that contain child references |
| `titleFields` | `string[]` | Yes | Field names to use as the display title (first match wins) |
| `locales` | `string[]` | Yes | Locale codes to support (first is the default) |
| `indentation` | `number` | No | Base indentation depth in `em` (default: `1`) |
| `iconRegistry` | `Record<string, IconId>` | No | Maps content type IDs to icon identifiers |

### Available icons

`WORLD` `PAGE` `APP` `CART` `FOLDER` `LOVE` `SHORTCUT`

Entries with content types not in the registry display a default circle icon.

## Development

```bash
pnpm install
pnpm build       # compile with tsc
pnpm dev         # watch mode
pnpm lint        # biome check
pnpm rebuild     # clean + build
```

## License

Distributed under MIT License, please see license file within the code for more details.

_Made with ♥ [foomo](https://www.foomo.org) by [bestbytes](https://www.bestbytes.com)_
