import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Use Vite's import.meta.glob to get all book directories
  const bookDirs = import.meta.glob('/src/routes/book/*/', { as: 'raw' });
  const books = Object.keys(bookDirs)
    .map(path => path.split('/').slice(-2, -1)[0])
    .filter(name => name !== '[book]');

  return { books };
};
