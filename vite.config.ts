import { defineConfig } from 'vite';
import { qrcode } from 'vite-plugin-qrcode';
import react from '@vitejs/plugin-react';
import rune from 'vite-plugin-rune';
import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '',
  plugins: [
    tsconfigPaths(),
    qrcode(),
    react(),
    rune({ logicPath: path.resolve('./src/logic.ts') }),
  ],
})
