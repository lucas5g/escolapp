import { resolve } from "path";
// import { defineConfig } from "vitest/dist/config";

// export default defineConfig({
//   plugins: [
//     // vue(),
//     // vueJsx()
//   ],
//   resolve: {
//     // alias: {
//       // "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
//       // "@": fileURLToPath(new URL("./src", import.meta.url))
//       alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
//     // }
//   },
//   base: "/"
// });
// vitest.config.ts
export default {
  test: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]

  }
}