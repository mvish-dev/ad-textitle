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
      // react-simple-maps' main field points at a UMD build whose factory
      // wrapper calls `require("prop-types")` inline as part of its
      // CJS/AMD/global detection ternary. Rolldown's dep optimizer doesn't
      // discover that nested require as a bundleable entry (it's not a
      // static ES import), so it leaves a literal `require(...)` in the
      // output — which throws in the browser. Aliasing to the real ESM
      // build (a plain `import PropTypes from 'prop-types'`) sidesteps the
      // UMD wrapper entirely.
      'react-simple-maps': path.resolve(__dirname, 'node_modules/react-simple-maps/dist/index.es.js'),
    },
  },
  optimizeDeps: {
    // The ESM build above does a plain `import PropTypes from 'prop-types'`,
    // but nothing in our own source imports prop-types directly, so Vite's
    // dependency scanner never discovers it as a root entry to pre-bundle —
    // it only shows up once react-simple-maps.js is already being served,
    // by which point it's too late and the import 404s. Listing it
    // explicitly forces it into the same pre-bundling pass.
    include: ['prop-types'],
  },
})
