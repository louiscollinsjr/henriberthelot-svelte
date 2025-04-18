import { readdirSync } from 'fs';
import { join } from 'path';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // List all books in /src/routes/book (ignore .DS_Store and [book] dynamic folder)
  const booksDir = 'src/routes/book';
  let books: string[] = [];
  try {
    books = readdirSync(booksDir)
      .filter((name) => !name.startsWith('.') && name !== '[book]')
      .filter((name) => {
        // Only include directories
        try {
          return readdirSync(join(booksDir, name));
        } catch {
          return false;
        }
      });
  } catch (e) {
    // No books found
  }
  return { books };
};
