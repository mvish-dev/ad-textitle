import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // lottie-react ships main/browser fields pointing at a UMD build whose
      // factory already returns `{ default, useLottie, ... }`. Vite's default
      // mainFields order picks that UMD build over the ESM one, and wrapping
      // it again for ESM interop produces a double-nested default export
      // (`{ default: { default: Lottie, ... } }`) — which breaks
      // `React.lazy(() => import('lottie-react'))` with "Element type is
      // invalid". Aliasing straight to the real ESM build sidesteps the
      // interop entirely.
      'lottie-react': path.resolve(__dirname, 'node_modules/lottie-react/build/index.es.js'),
    },
  },
})
