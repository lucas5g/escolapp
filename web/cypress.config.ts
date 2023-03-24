import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'http://localhost:5173',
    viewportHeight:700,
    viewportWidth:1100,
    video:false
  },

});
