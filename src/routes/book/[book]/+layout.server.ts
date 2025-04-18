import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

export const load = async ({ params, fetch }) => {
  const book = params.book;
  const baseDir = `src/routes/book/${book}`;
  
  console.log(`Loading book: ${book}`);
  
  // Get front matter
  let frontMatter = [];
  try {
    const frontMatterDir = join(baseDir, 'frontmatter');
    if (existsSync(frontMatterDir)) {
      frontMatter = readdirSync(frontMatterDir)
        .filter(file => file.endsWith('.mdx'))
        .map(file => ({
          title: file.replace('.mdx', '').replace(/-/g, ' '),
          slug: file.replace('.mdx', '')
        }));
      console.log(`Found ${frontMatter.length} frontmatter items:`, frontMatter);
    } else {
      console.log('Front matter directory does not exist');
    }
  } catch (err) {
    console.error('Error loading frontmatter:', err);
  }
  
  // Get chapters
  let chapters = [];
  try {
    const chaptersDir = join(baseDir, 'chapters');
    if (existsSync(chaptersDir)) {
      chapters = readdirSync(chaptersDir)
        .filter(file => file.endsWith('.mdx'))
        .map(file => ({
          title: file.replace('.mdx', '').replace(/-/g, ' '),
          slug: file.replace('.mdx', '')
        }));
      console.log(`Found ${chapters.length} chapters:`, chapters);
    } else {
      console.log('Chapters directory does not exist');
    }
  } catch (err) {
    console.error('Error loading chapters:', err);
  }

  // Load books list from main layout
  const { books = [] } = await fetch('/')
    .then(r => r.json())
    .catch(() => ({ books: [] }));

  return {
    book,
    frontMatter,
    chapters,
    books
  };
};
