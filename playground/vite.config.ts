import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// const baseURI = 'https://neweditor.bige.show'
const baseURI = 'https://admin.bige.show'

// https://vite.dev/config/
export default defineConfig(() => {
  const server = {
    host: '0.0.0.0',
    allowedHosts: ['local.bigesj.com'],
    cors: true,
    proxy: {
      '/new': {
        target: `${baseURI}/new`,
        rewrite: (path: string) => path.replace(/^\/new/, ''),
        changeOrigin: true,
      },
    },
  }

  if (process.env.MODE === 'local') {
    return {
      plugins: [
        vue({
          template: {
            compilerOptions: {
              isCustomElement: (tag: string) => tag === 'text-editor',
            },
          },
        }),
        vueDevTools(),
      ],
      server,
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          '@mce/ai': fileURLToPath(new URL('../packages/ai/src/index.ts', import.meta.url)),
          '@mce/animation-presets': fileURLToPath(new URL('../packages/animation-presets/src/index.ts', import.meta.url)),
          '@mce/bigesj': fileURLToPath(new URL('../packages/bigesj/src/index.ts', import.meta.url)),
          '@mce/chart': fileURLToPath(new URL('../packages/chart/src/index.ts', import.meta.url)),
          '@mce/html': fileURLToPath(new URL('../packages/html/src/index.ts', import.meta.url)),
          '@mce/workflow': fileURLToPath(new URL('../packages/workflow/src/index.ts', import.meta.url)),
          '@mce/collaboration': fileURLToPath(new URL('../packages/collaboration/src/index.ts', import.meta.url)),
          '@mce/comments': fileURLToPath(new URL('../packages/comments/src/index.ts', import.meta.url)),
          '@mce/table': fileURLToPath(new URL('../packages/table/src/index.ts', import.meta.url)),
          '@mce/gaoding': fileURLToPath(new URL('../packages/gaoding/src/index.ts', import.meta.url)),
          '@mce/openxml': fileURLToPath(new URL('../packages/openxml/src/index.ts', import.meta.url)),
          '@mce/pdf': fileURLToPath(new URL('../packages/pdf/src/index.ts', import.meta.url)),
          '@mce/svg': fileURLToPath(new URL('../packages/svg/src/index.ts', import.meta.url)),
          '@mce/mp4': fileURLToPath(new URL('../packages/mp4/src/index.ts', import.meta.url)),
          '@mce/gif': fileURLToPath(new URL('../packages/gif/src/index.ts', import.meta.url)),
          '@mce/psd': fileURLToPath(new URL('../packages/psd/src/index.ts', import.meta.url)),
          'mce/styles': fileURLToPath(new URL('../packages/mce/src/index.ts', import.meta.url)),
          'mce': fileURLToPath(new URL('../packages/mce/src/index.ts', import.meta.url)),
          // 硬分叉的 modern-* 生态：本地开发直连 externals/ 源码（指向 src 目录，
          // 子路径导入如 modern-text/deformations 自动落到对应子目录），改库即时 HMR，无需先 build dist。
          // openxml 的 preset* 子路径是仓库内预置的静态 assets（非 src 产物），需显式且排在 bare 之前优先匹配。
          'modern-openxml/presetShapeDefinitions': fileURLToPath(new URL('../externals/modern-openxml/packages/openxml/assets/presetShapeDefinitions.js', import.meta.url)),
          'modern-openxml/presetTextWarpDefinitions': fileURLToPath(new URL('../externals/modern-openxml/packages/openxml/assets/presetTextWarpDefinitions.js', import.meta.url)),
          'modern-openxml': fileURLToPath(new URL('../externals/modern-openxml/packages/openxml/src', import.meta.url)),
          'modern-idoc-svg': fileURLToPath(new URL('../externals/modern-idoc-svg/src', import.meta.url)),
          'modern-idoc': fileURLToPath(new URL('../externals/modern-idoc/src', import.meta.url)),
          'modern-path2d': fileURLToPath(new URL('../externals/modern-path2d/src', import.meta.url)),
          'modern-font': fileURLToPath(new URL('../externals/modern-font/src', import.meta.url)),
          'modern-palette': fileURLToPath(new URL('../externals/modern-palette/src', import.meta.url)),
          'modern-mp4': fileURLToPath(new URL('../externals/modern-mp4/src', import.meta.url)),
          'modern-text': fileURLToPath(new URL('../externals/modern-text/src', import.meta.url)),
          'modern-gif': fileURLToPath(new URL('../externals/modern-gif/src', import.meta.url)),
          'modern-canvas': fileURLToPath(new URL('../externals/modern-canvas/src', import.meta.url)),
          'modern-pdf': fileURLToPath(new URL('../externals/modern-pdf/src', import.meta.url)),
        },
      },
    }
  }

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    server,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
