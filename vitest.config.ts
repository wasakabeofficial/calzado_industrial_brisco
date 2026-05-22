import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "import.meta.env.VITE_N8N_BASE_URL": JSON.stringify(
      "https://cesar.n8n-wsk.com/webhook",
    ),
    "import.meta.env.VITE_N8N_CONTACTOS_PATH":
      JSON.stringify("getContactosBrisco"),
    "import.meta.env.VITE_N8N_WEBHOOK_PATH": JSON.stringify("web_google_drive"),
    "import.meta.env.VITE_N8N_AUDIO_WEBHOOK_PATH": JSON.stringify(
      "web_google_drive_audio",
    ),
    "import.meta.env.VITE_GOOGLE_DRIVE_BASE_URL": JSON.stringify(
      "https://drive.google.com/file/d/",
    ),
    "import.meta.env.VITE_N8N_AUTHORIZATION_HEADER":
      JSON.stringify("Authorization"),
    "import.meta.env.VITE_N8N_AUTHORIZATION_TOKEN":
      JSON.stringify("Bearer BriscoNeuropoint.ai"),
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    include: ["src/test/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "dist"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
      reportsDirectory: "coverage",
    },
  },
});
