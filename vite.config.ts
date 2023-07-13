/// <reference types="vitest" />
import analog from '@analogjs/platform';
import { defineConfig } from 'vite';
import { getBlogPosts } from './vite-prerender.utils';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    publicDir: 'src/assets',
    build: {
      target: ['es2020'],
    },
    plugins: [
      analog({
        static: true,
        prerender: {
          routes: async () => ['/', '/blog', '/cv', '/test', ...getBlogPosts()],
        },
      }),
    ],
  };
});
