import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { readFileSync, writeFileSync } from "fs";

// 处理manifest.json
const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8")
);
const manifest = JSON.parse(
  readFileSync(new URL("./manifest.json", import.meta.url), "utf8")
);
manifest.version = pkg.version;
writeFileSync("./public/manifest.json", JSON.stringify(manifest));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()]
});
