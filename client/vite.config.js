import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $components: path.resolve(path.dirname(""), "./src/components"),
      $lib: path.resolve(path.dirname(""), "./src/lib"),
      $containers: path.resolve(path.dirname(""), "./src/containers"),
      $styles: path.resolve(path.dirname(""), "./src/styles"),
      $lib: path.resolve(path.dirname(""), "./src/lib"),
      $assets: path.resolve(path.dirname(""), "./src/assets"),
    },
  },
});
