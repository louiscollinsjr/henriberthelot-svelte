import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  const booksDir = 'src/routes/book';
  let books: string[] = [];
  try {
    books = readdirSync(booksDir)
      .filter((name) => !name.startsWith('.') && name !== '[book]')
      .filter((name) => {
        try {
          return statSync(join(booksDir, name)).isDirectory();
        } catch {
          return false;
        }
      });
  } catch {
    // No books found
  }
  return { books };
};
