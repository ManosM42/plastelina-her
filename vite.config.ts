import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(), // 1. Resolve paths first so plugins find imports
    tanstackStart(), // 2. Let TanStack Start wrap the dev environment
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }), // 3. Process routes next
    react(),         // 4. Compile React syntax
    tailwindcss(),   // 5. Let Tailwind process classes last
  ],
});