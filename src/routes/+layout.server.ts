import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  // Use Vite's import.meta.glob to get all book directories
  const bookDirs = import.meta.glob('/src/content/books/*/', { query: '?raw', import: 'default' });
  const books = Object.keys(bookDirs)
    .map(path => path.split('/').slice(-2, -1)[0])
    .filter(name => name !== '[book]');

  return { books };
};
