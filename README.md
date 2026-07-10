<h1 align="center">modern-idoc</h1>

<p align="center">
  <a href="https://unpkg.com/modern-idoc">
    <img src="https://img.shields.io/bundlephobia/minzip/modern-idoc" alt="Minzip">
  </a>
  <a href="https://www.npmjs.com/package/modern-idoc">
    <img src="https://img.shields.io/npm/v/modern-idoc.svg" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/modern-idoc">
    <img src="https://img.shields.io/npm/dm/modern-idoc" alt="Downloads">
  </a>
  <a href="https://github.com/qq15725/modern-idoc/issues">
    <img src="https://img.shields.io/github/issues/qq15725/modern-idoc" alt="Issues">
  </a>
  <a href="https://github.com/qq15725/modern-idoc/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/modern-idoc.svg" alt="License">
  </a>
</p>

## 📦 Install

```
npm i modern-idoc
```

## 🦄 Usage

```ts
import type { Document } from 'modern-idoc'

const pdf: Document = {
  children: [
    {
      style: { width: 300, height: 600 },
      children: [
        {
          style: {
            rotate: 60,
            width: 50,
            height: 50,
          },
          background: '/example.png',
        },
        {
          style: {
            rotate: 40,
            left: 100,
            top: 100,
            fontSize: 20,
            color: '#FF00FF',
          },
          text: 'test',
        },
        {
          style: {
            left: 200,
            top: 100,
            width: 100,
            height: 200,
            fontSize: 22,
          },
          text: [
            {
              letterSpacing: 3,
              fragments: [
                {
                  content: 'He',
                  color: '#00FF00',
                  fontSize: 12,
                },
                { content: 'llo', color: '#000000' },
              ],
            },
            { content: ', ', color: '#FF0000' },
            { content: 'World!', color: '#0000FF' },
          ],
        },
      ],
    },
  ],
}
```

## Types

[view d.ts type file](https://unpkg.com/modern-idoc/dist/index.d.ts)

## Refer to these packages for usage

- [modern-text](https://github.com/qq15725/modern-text) text renderer
- [modern-pdf](https://github.com/qq15725/modern-pdf) PDF codec
- [modern-openxml](https://github.com/qq15725/modern-openxml) PPTX、etc... codec
- [modern-canvas](https://github.com/qq15725/modern-canvas) IDoc to WebGL renderer
- [modern-idoc-svg](https://github.com/qq15725/modern-idoc-svg) IDoc to SVG renderer
