import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env:{
      web: 'http://localhost:3002',
      server: 'https://jisa.up.railway.app/',
      api: 'http://localhost:8000'
    },
    viewportWidth: 1200,
    // baseUrl:'http://localhost:5173'
  
  },
});
