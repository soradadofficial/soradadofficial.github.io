import { defineConfig } from 'vite';
// Relative base so the build works on GitHub Pages and any static host.
export default defineConfig({ base: './', build: { chunkSizeWarningLimit: 1200, target: 'es2022', rollupOptions: { input: ['index.html', 'materials.html', 'bkk.html', 'stay-tokyo.html'], output: { manualChunks: { three: ['three'] } } } } });
