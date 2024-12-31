/// <reference types="vitest" />
import analog from '@analogjs/platform';
import {defineConfig} from 'vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';
import {getBlogPosts} from './vite-prerender.utils';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    root: __dirname,
    publicDir: 'src/assets',
    build: {
      outDir: 'dist/client',
      reportCompressedSize: true,
      target: ['es2020'],
    },
    resolve: {
      mainFields: ['module'],
    },
    plugins: [
      analog({
        static: true,
        prerender: {
          discover: true,
          routes: async () => ['/', '/blog', '/cv', '/test', '/api/rss.xml', ...getBlogPosts()],
        },
      }),
      viteStaticCopy({
        structured: true,
        targets: [
          {
            src: ['src/content/**/*.png', 'src/content/**/*.jpg'],
            dest: '',
          },
        ],
      }),
    ],
  };
});
