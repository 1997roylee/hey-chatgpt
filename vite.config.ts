import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, ManifestV3Export } from '@crxjs/vite-plugin'
import path from "path";
import manifest from './manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({
    manifest: manifest as ManifestV3Export
  })],
  resolve: {
    alias: {
      "ui": path.resolve(__dirname, "./src/ui"),
      "stores": path.resolve(__dirname, "./src/stores"),
      "utils": path.resolve(__dirname, "./src/utils"),
    },
  },
})
