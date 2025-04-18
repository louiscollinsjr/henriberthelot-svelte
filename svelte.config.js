import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.mdx'],
  
  kit: {
    adapter: adapter()
  },

  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.mdx']
    })
  ],

  compilerOptions: {
    runes: true
  }
};

export default config;