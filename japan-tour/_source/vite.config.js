import { defineConfig } from 'vite';
// Relative base so the build works on GitHub Pages and any static host.
export default defineConfig({ base: './', build: { chunkSizeWarningLimit: 1200, target: 'es2022', rollupOptions: { output: { manualChunks: { three: ['three'] } } } } });
