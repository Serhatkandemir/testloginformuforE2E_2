import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '8mye72',
  e2e: {
    baseUrl: "http://localhost:5173",
  },
});