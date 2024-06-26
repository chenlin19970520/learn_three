import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite"
import { join } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
    imports: ['vue'],
    dts: 'auto-imports.d.ts'
  }),
  ],
  resolve: {
    alias: {
      "/@": join(__dirname, "/src"),
    },
  },
})
