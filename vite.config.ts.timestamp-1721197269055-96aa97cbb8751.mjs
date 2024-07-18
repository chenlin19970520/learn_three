// vite.config.ts
import { defineConfig } from "file:///E:/myProjects/learn_three/node_modules/.pnpm/vite@4.5.3_@types+node@20.14.2/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/myProjects/learn_three/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@4.5.3+vue@3.4.27/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///E:/myProjects/learn_three/node_modules/.pnpm/unplugin-auto-import@0.17.6/node_modules/unplugin-auto-import/dist/vite.js";
import { join } from "path";
var __vite_injected_original_dirname = "E:\\myProjects\\learn_three";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/,
        // .vue
        /\.md$/
        // .md
      ],
      imports: ["vue"],
      dts: "auto-imports.d.ts"
    })
  ],
  server: {
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "/@": join(__vite_injected_original_dirname, "/src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxteVByb2plY3RzXFxcXGxlYXJuX3RocmVlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxteVByb2plY3RzXFxcXGxlYXJuX3RocmVlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9teVByb2plY3RzL2xlYXJuX3RocmVlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIlxuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpLFxuICBBdXRvSW1wb3J0KHtcbiAgICBpbmNsdWRlOiBbXG4gICAgICAvXFwuW3RqXXN4PyQvLCAvLyAudHMsIC50c3gsIC5qcywgLmpzeFxuICAgICAgL1xcLnZ1ZSQvLFxuICAgICAgL1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcbiAgICAgIC9cXC5tZCQvLCAvLyAubWRcbiAgICBdLFxuICAgIGltcG9ydHM6IFsndnVlJ10sXG4gICAgZHRzOiAnYXV0by1pbXBvcnRzLmQudHMnXG4gIH0pLFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCIvQFwiOiBqb2luKF9fZGlybmFtZSwgXCIvc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtUSxTQUFTLG9CQUFvQjtBQUNoUyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxZQUFZO0FBSHJCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUFDLElBQUk7QUFBQSxJQUNkLFdBQVc7QUFBQSxNQUNULFNBQVM7QUFBQSxRQUNQO0FBQUE7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBO0FBQUEsUUFDQTtBQUFBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUyxDQUFDLEtBQUs7QUFBQSxNQUNmLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxFQUNEO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxLQUFLLGtDQUFXLE1BQU07QUFBQSxJQUM5QjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
