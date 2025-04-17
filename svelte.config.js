import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  extensions: ['.svelte', '.svx', '.md'],
  
  kit: {
    adapter: adapter()
  },
  
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.svx', '.md'],
      // MDsveX doesn't support globalComponents, so we'll handle components in the page component
      remarkPlugins: [],
      rehypePlugins: []
    })
  ]
};